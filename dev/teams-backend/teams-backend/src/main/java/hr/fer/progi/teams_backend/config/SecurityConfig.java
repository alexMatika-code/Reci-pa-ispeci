package hr.fer.progi.teams_backend.config;

import hr.fer.progi.teams_backend.constants.Roles;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.dao.RoleRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;

import java.io.IOException;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PersonRepository personRepository;

    @Value("${frontend.url}")
    private String frontendUrl;


    @Bean
    public SecurityFilterChain oauthFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/").permitAll();
                    registry.requestMatchers("/recipes/public").permitAll();
                    registry.requestMatchers("/people/profile/{username}").permitAll();
                    registry.requestMatchers("/login").permitAll();
                    registry.requestMatchers("/oauth2/authorization/google").permitAll();
                    registry.requestMatchers("/api/oauth2/authorization/google").permitAll();
                    registry.anyRequest().hasRole("USER");
                })
                .oauth2Login(oauth2 -> {
                    oauth2
                            .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
                            .successHandler(new CustomAuthenticationSuccessHandler());
                })
                .exceptionHandling(handling -> handling.authenticationEntryPoint(new Http403ForbiddenEntryPoint()))
                .build();
    }

    private GrantedAuthoritiesMapper authorityMapper() {
        final SimpleAuthorityMapper authorityMapper = new SimpleAuthorityMapper();

        authorityMapper.setDefaultAuthority("ROLE_USER");

        return authorityMapper;
    }

    private class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String email = oauth2User.getAttribute("email");

            System.out.println(oauth2User);

            if (!personRepository.existsByEmail(email)) {
                Person newUser = new Person();
                newUser.setEmail(email);
                newUser.setFirstName(oauth2User.getAttribute("given_name"));
                newUser.setLastName(oauth2User.getAttribute("family_name"));
                newUser.setImage(oauth2User.getAttribute("picture"));

                Role role = roleRepository.findByName(Roles.USER);
                if (role == null) {
                    role = new Role();
                    role.setName(Roles.USER);
                    roleRepository.save(role);
                }
                newUser.setRole(role);
                personRepository.save(newUser);
            }

            String sessionId = request.getSession().getId();
            response.addHeader("Set-Cookie", "JSESSIONID=" + sessionId + "; Path=/; HttpOnly; Secure; SameSite=None");

            response.sendRedirect(frontendUrl);
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(frontendUrl));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}


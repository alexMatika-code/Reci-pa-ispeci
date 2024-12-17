package hr.fer.progi.teams_backend.config;

import hr.fer.progi.teams_backend.constants.Roles;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.dao.RoleRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.io.IOException;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    WebConfig customCorsConfiguration;

    @Autowired
    private PersonRepository personRepository;
    private final String frontendUrl = "https://reci-pa-ispeci.onrender.com";


    @Bean
    public SecurityFilterChain oauthFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults());
        http.requiresChannel(channel -> channel
                .anyRequest().requiresSecure()
        );

        return http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/").permitAll();
                    registry.requestMatchers("/recipes/public").permitAll();
                    registry.requestMatchers("/people/profile/{username}").permitAll();
                    registry.requestMatchers("/login").permitAll();
                    registry.requestMatchers("/oauth2/authorization/google").permitAll();
                    registry.requestMatchers("/oauth2/authorization/google").permitAll();
                    registry.anyRequest().authenticated();
                })
                .oauth2Login(oauth2 -> {
                    oauth2.userInfoEndpoint(
                                    userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
                            .successHandler(
                                    (request, response, authentication) -> {
                                        response.sendRedirect(frontendUrl);
                                    });
                })
                .exceptionHandling(handling -> handling.authenticationEntryPoint(new Http403ForbiddenEntryPoint()))
                .build();
    }

    private class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String email = oauth2User.getAttribute("email");

            if (!personRepository.existsByEmail(email)) {
                Person newUser = new Person();
                newUser.setEmail(email);
                newUser.setFirstName(oauth2User.getAttribute("given_name"));
                newUser.setLastName(oauth2User.getAttribute("family_name"));
                newUser.setImage(oauth2User.getAttribute("picture"));

                String firstName = oauth2User.getAttribute("given_name");
                String lastName = oauth2User.getAttribute("family_name");

                String username = email.contains("@") ? email.substring(0, email.indexOf("@")) : email;
                newUser.setUsername(username);

                Role role = roleRepository.findByName(Roles.USER);
                if (role == null) {
                    role = new Role();
                    role.setName(Roles.USER);
                    roleRepository.save(role);
                }
                newUser.setRole(role);
                personRepository.save(newUser);
            }

            response.sendRedirect(frontendUrl);
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("https://reci-pa-ispeci.onrender.com"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public GrantedAuthoritiesMapper authorityMapper() {
        return authorities -> {
            if (authorities instanceof List) {
                for (Object authority : authorities) {
                    if (authority instanceof DefaultOidcUser oidcUser) {
                        handleNewUser(oidcUser); // Create user if they don't exist
                    }
                }
            }
            return authorities;
        };
    }

    private void handleNewUser(OidcUser oidcUser) {
        String email = oidcUser.getAttribute("email");
        if (!personRepository.existsByEmail(email)) {
            Person newUser = new Person();
            newUser.setEmail(email);
            newUser.setFirstName(oidcUser.getAttribute("given_name"));
            newUser.setLastName(oidcUser.getAttribute("family_name"));
            newUser.setImage(oidcUser.getAttribute("picture"));

            String username = email.contains("@") ? email.substring(0, email.indexOf("@")) : email;
            newUser.setUsername(username);

            Role role = roleRepository.findByName(Roles.USER);
            if (role == null) {
                role = new Role();
                role.setName(Roles.USER);
                roleRepository.save(role);
            }
            newUser.setRole(role);
            personRepository.save(newUser);
        }
    }
}
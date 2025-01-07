package hr.fer.progi.teams_backend.config;

import hr.fer.progi.teams_backend.constants.Roles;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.dao.RoleRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Role;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.MediaTypeRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = false)
public class WebSecurityBasic {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PersonRepository personRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    @Profile("basic-security")
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize.anyRequest().authenticated());
        http.formLogin(withDefaults());
        http.httpBasic(withDefaults());
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    @Profile("oauth-security")
    public SecurityFilterChain oauthFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/recipes/public", "/").permitAll();
                    auth.anyRequest().authenticated();
                })
                .oauth2Login(oauth2 -> {
                    oauth2
                            .userInfoEndpoint(
                                    userInfoEndpoint -> userInfoEndpoint.userAuthoritiesMapper(this.authorityMapper()))
                            .successHandler(
                                    (request, response, authentication) -> {
                                        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                                        String email = oauth2User.getAttribute("email");


                                        if (!personRepository.existsByEmail(email)) {
                                            Person newUser = new Person();
                                            newUser.setEmail(email);
                                            newUser.setFirstName(oauth2User.getAttribute("given_name"));
                                            newUser.setLastName(oauth2User.getAttribute("family_name"));
                                            newUser.setImage(oauth2User.getAttribute("picture"));

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
                                    });
                })
                .exceptionHandling(handling -> handling.authenticationEntryPoint(new Http403ForbiddenEntryPoint()))
                .build();
    }

    @Bean
    @Profile("form-security")
    public SecurityFilterChain spaFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
                .requestMatchers(new AntPathRequestMatcher("/login")).permitAll()
                .anyRequest().authenticated());
        http.formLogin(configurer -> {
                    configurer.successHandler((request, response, authentication) ->
                                    response.setStatus(HttpStatus.NO_CONTENT.value())
                            )
                            .failureHandler(new SimpleUrlAuthenticationFailureHandler());
                }
        );
        http.exceptionHandling(configurer -> {
            final RequestMatcher matcher = new NegatedRequestMatcher(
                    new MediaTypeRequestMatcher(MediaType.TEXT_HTML));
            configurer
                    .defaultAuthenticationEntryPointFor((request, response, authException) -> {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    }, matcher);
        });
        http.logout(configurer -> configurer
                .logoutUrl("/logout")
                .logoutSuccessHandler((request, response, authentication) ->
                        response.setStatus(HttpStatus.NO_CONTENT.value())));
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    private GrantedAuthoritiesMapper authorityMapper() {
        final SimpleAuthorityMapper authorityMapper = new SimpleAuthorityMapper();

        authorityMapper.setDefaultAuthority("ROLE_ADMIN");

        return authorityMapper;
    }

}

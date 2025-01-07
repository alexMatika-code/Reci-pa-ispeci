package hr.fer.progi.teams_backend.config;

import hr.fer.progi.teams_backend.constants.Roles;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.dao.RoleRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebSecurity
@Slf4j
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
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/recipes/public", "/").permitAll();
                    auth.anyRequest().authenticated();
                })
                .oauth2Login(oauth2 -> {
                    oauth2
                            .successHandler(new CustomAuthenticationSuccessHandler());
                })
                .exceptionHandling(handling ->
                {
                    log.error("I have error" + handling.toString());
                    handling.authenticationEntryPoint(new Http403ForbiddenEntryPoint());
                })
                .build();
    }

    private class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String email = oauth2User.getAttribute("email");

            log.info("Authentication succes for email: {}", email);
            log.info("OAuth2 User details: {}", oauth2User.getAttributes());

            if (!personRepository.existsByEmail(email)) {
                log.info("Email not found in database. Creating new user with email: {}", email);
                Person newUser = new Person();
                newUser.setEmail(email);
                newUser.setFirstName(oauth2User.getAttribute("given_name"));
                newUser.setLastName(oauth2User.getAttribute("family_name"));
                newUser.setImage(oauth2User.getAttribute("picture"));

                String username = email.contains("@") ? email.substring(0, email.indexOf("@")) : email;
                newUser.setUsername(username);

                log.info("Generated username for new user : {}", username);

                Role role = roleRepository.findByName(Roles.USER);
                if (role == null) {
                    log.warn("Role '{}' not found in databsae. Creating new role.", Roles.USER);
                    role = new Role();
                    role.setName(Roles.USER);
                    roleRepository.save(role);
                    log.info("New role '{}' saved to database", Roles.USER);
                }
                newUser.setRole(role);
                log.info("Saving new user to database: {}", newUser);
                personRepository.save(newUser);
            }

            log.info("Redirecting to frontend URL: {}", frontendUrl);
            response.sendRedirect(frontendUrl);
        }
    }
}
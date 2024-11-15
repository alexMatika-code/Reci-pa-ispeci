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
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import java.io.IOException;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PersonRepository personRepository;
    private final String frontendUrl = "https://reci-pa-ispeci-1.onrender.com/";

    @Bean
    public SecurityFilterChain oauthFilterChain(HttpSecurity http) throws Exception {
        return http.cors(Customizer.withDefaults())
                    .csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/").permitAll();
                    registry.requestMatchers("/recipes/public").permitAll();
                    registry.requestMatchers("/people/profile/{username}").permitAll();
                    registry.anyRequest().authenticated();
                })
                .oauth2Login(oauth2 -> {
                    oauth2
                            .loginPage("/oauth2/authorization/google")
                            .successHandler(new CustomAuthenticationSuccessHandler());
                })
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
}
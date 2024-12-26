package hr.fer.progi.teams_backend.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public FilterRegistrationBean customCorsFilter() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("https://reci-pa-ispeci.onrender.com"));
        configuration.setAllowedOrigins(List.of("https://accounts.google.com"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Access-Control-Allow-Headers", "X-Requested-With," +
                        " WWW-Authenticate, Authorization, Origin, Content-Type, Version","Authorization",
                "Content-Type", "X-Requested-With", "Accept", "Origin","Access-Control-Allow-Headers",
                "x-requested-with, authorization"));
        configuration.setExposedHeaders(List.of("Authorization", "Access-Control-Expose-Headers",
                "X-Requested-With, WWW-Authenticate, Authorization, Origin, Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}

package hr.fer.progi.teams_backend;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class TeamsBackendApplication {

	public static void main(String[] args) {

		new SpringApplicationBuilder()
				.sources(TeamsBackendApplication.class)
				.run(args);

		        Environment environment = context.getEnvironment();

        // Example: Log specific environment variables
        System.out.println("Environment Variables:");
        System.out.println("GOOGLE_CLIENT_SECRET: " + environment.getProperty("GOOGLE_CLIENT_SECRET"));
	}
}

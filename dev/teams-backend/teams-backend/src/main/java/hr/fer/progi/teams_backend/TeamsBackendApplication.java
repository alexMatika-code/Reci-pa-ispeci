package hr.fer.progi.teams_backend;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class TeamsBackendApplication {

	public static void main(String[] args) {

		new SpringApplicationBuilder()
				.sources(TeamsBackendApplication.class)
				.run(args);
	}
}

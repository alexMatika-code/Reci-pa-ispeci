package hr.fer.progi.teams_backend.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class TestController {

    @GetMapping("/login")
    public RedirectView redirectToGoogleLogin() {
        return new RedirectView("/oauth2/authorization/google");
    }

    @GetMapping("/home")
    public String home() {
        return "<!DOCTYPE html>" +
                "<html lang=\"en\">" +
                "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "<title>Home Page</title>" +
                "</head>" +
                "<body>" +
                "<h1>Welcome to the Home Page!</h1>" +
                "<p>You are successfully logged in.</p>" +
                "<form action=\"/logout\" method=\"post\">" +
                "<button type=\"submit\">Logout</button>" +
                "</form>" +
                "</body>" +
                "</html>";
    }
}
package hr.fer.progi.teams_backend.rest;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.security.Principal;

@RestController
public class TestController {

    @GetMapping("/login")
    public RedirectView redirectToGoogleLogin() {
        return new RedirectView("/oauth2/authorization/google");
    }

    @GetMapping("/home")
    public String home() {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                    "<meta charset=UTF-8>" +
                    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                    "<title>Favorite Ingredient</title>" +
                "</head>" +
                "<body>" +
                "<h1>Select Your Favorite Ingredient</h1>" +
                "<form id=\"ingredientForm\" method=\"POST\" action=\"http://localhost:8080/people/favoriteIngredient/1\">"+
                    "<button type=\"submit\">Submit</button>" +
                "</form>" +
                "</body>" +
                "</html>";
    }
}
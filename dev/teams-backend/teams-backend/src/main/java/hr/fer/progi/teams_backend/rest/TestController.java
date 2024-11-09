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

    @GetMapping("/user")
    public Principal user(Principal user) {
        return user;
    }
}
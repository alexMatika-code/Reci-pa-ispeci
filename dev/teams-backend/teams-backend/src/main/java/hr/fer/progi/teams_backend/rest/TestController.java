package hr.fer.progi.teams_backend.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
public class TestController {

    @PostMapping("/api/login")
    public ResponseEntity<String> handleLoginRequest() {
        // Respond with the URL for Google OAuth2
        String googleLoginUrl = "/oauth2/authorization/google";
        return ResponseEntity.ok(googleLoginUrl);
    }
}
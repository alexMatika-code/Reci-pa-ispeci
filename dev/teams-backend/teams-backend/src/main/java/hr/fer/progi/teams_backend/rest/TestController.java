package hr.fer.progi.teams_backend.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
public class TestController {

    @GetMapping("/login")
    public RedirectView redirectToGoogleLogin() {
        log.info("Login started, redirect to google login");
        return new RedirectView("/api/oauth2/authorization/google");
    }
}
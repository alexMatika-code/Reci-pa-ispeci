package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.service.ChefService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/chef")
public class ChefController {
    private final ChefService chefService;

    @PutMapping("/approve/{recipeId}")
    public ResponseEntity<String> approveRecipe(@PathVariable Long recipeId) {
        boolean success = chefService.approveRecipe(recipeId);
        if (success) {
            return ResponseEntity.ok("Recipe approved successfully.");
        } else {
            return ResponseEntity.badRequest().body("Recipe approval failed.");
        }
    }
}

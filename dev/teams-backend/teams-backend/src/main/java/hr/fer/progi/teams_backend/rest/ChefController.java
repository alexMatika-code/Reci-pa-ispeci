package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.service.ChefService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/chef")
public class ChefController {
    private final ChefService chefService;

    @PreAuthorize("hasAnyRole('ADMIN', 'CHEF')")

    @PutMapping("/approve/{recipeId}")
    public ResponseEntity<String> approveRecipe(@PathVariable Long recipeId) {
        boolean success = chefService.approveRecipe(recipeId);
        if (success) {
            return ResponseEntity.ok("Recipe approved successfully.");
        } else {
            return ResponseEntity.badRequest().body("Recipe approval failed.");
        }
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'CHEF')")

    @DeleteMapping("/reject/{recipeId}")
    public ResponseEntity<String> rejectRecipe(@PathVariable Long recipeId) {
        boolean success = chefService.rejectRecipe(recipeId);
        if (success) {
            return ResponseEntity.ok("Recipe rejected (and deleted) successfully.");
        } else {
            return ResponseEntity.badRequest().body("Recipe rejection failed (not found or not awaiting approval).");
        }
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'CHEF')")

    @GetMapping("/waitingApproval")
    public ResponseEntity<List<RecipeDTO>> getAllWaitingRecipes() {
        List<RecipeDTO> waitingRecipes = chefService.getAllWaitingRecipes();
        return ResponseEntity.ok(waitingRecipes);
    }
}

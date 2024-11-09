package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("")
    public List<RecipeDTO> listRecipes() {
        return recipeService.listAll();
    }

    @GetMapping("/{id}")
    public RecipeDTO getRecipe(@PathVariable Long id) {
        return recipeService.fetchRecipe(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe);
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @PostMapping("/{recipeId}/addIngredient/{ingredientId}")
    public ResponseEntity<?> addIngredientToRecipe(@PathVariable Long recipeId, @PathVariable Long ingredientId) {
        recipeService.addIngredientToRecipe(recipeId, ingredientId);
        return ResponseEntity.ok("Ingredient added to recipe.");
    }

    @DeleteMapping("/{recipeId}/removeIngredient/{ingredientId}")
    public ResponseEntity<?> removeIngredientFromRecipe(@PathVariable Long recipeId, @PathVariable Long ingredientId) {
        recipeService.removeIngredientFromRecipe(recipeId, ingredientId);
        return ResponseEntity.ok("Ingredient removed from recipe.");
    }
}

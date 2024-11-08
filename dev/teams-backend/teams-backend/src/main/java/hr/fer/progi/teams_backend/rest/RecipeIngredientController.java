package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.dto.RecipeIngredientDTO;
import hr.fer.progi.teams_backend.service.RecipeIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipeIngredients")
public class RecipeIngredientController {
    @Autowired
    private RecipeIngredientService recipeIngredientService;

    @PostMapping("/addIngredient")
    public RecipeIngredientDTO addIngredientToRecipe(
            @RequestParam Long recipeId,
            @RequestParam Long ingredientId) {
        return recipeIngredientService.addIngredientToRecipe(recipeId, ingredientId);
    }

    @GetMapping("/recipe/{recipeId}")
    public List<RecipeIngredientDTO> getIngredientsForRecipe(@PathVariable Long recipeId) {
        return recipeIngredientService.getIngredientsForRecipe(recipeId);
    }
}

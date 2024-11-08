package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.dto.RecipeIngredientDTO;
import java.util.List;

public interface RecipeIngredientService {
    RecipeIngredientDTO addIngredientToRecipe(Long recipeId, Long ingredientId);
    List<RecipeIngredientDTO> getIngredientsForRecipe(Long recipeId);
}

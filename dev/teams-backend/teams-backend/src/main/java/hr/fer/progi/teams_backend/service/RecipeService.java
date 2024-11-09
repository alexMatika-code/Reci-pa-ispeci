package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.CreateRecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;

import java.io.IOException;
import java.util.List;

public interface RecipeService {

    List<RecipeDTO> listAll();

    RecipeDTO fetchRecipe(Long id);

    void deleteRecipe(Long id);

    Recipe updateRecipe(Long id, Recipe recipe);

    Recipe createRecipe(Recipe recipe);

    void addIngredientToRecipe(Long recipeId, Long ingredientId);

    void removeIngredientFromRecipe(Long recipeId, Long ingredientId);

    Recipe createRecipeWithImage(CreateRecipeDTO createRecipeDTO,Long personId) throws IOException;

}

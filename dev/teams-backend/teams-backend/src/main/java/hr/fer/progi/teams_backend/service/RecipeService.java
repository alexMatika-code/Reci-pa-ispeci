package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.CreateRecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.SearchRecipesDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    Page<RecipeDTO> listPublicRecipes(SearchRecipesDTO searchRecipesDTO, int page, int size);

    Page<RecipeDTO> listRecommendedRecipes(int page, int size);

    List<RecipeDTO> findSimilarRecipes(Long id);
}

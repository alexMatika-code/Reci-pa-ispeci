package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Recipe;

import java.util.List;

public interface RecipeService {

    List<Recipe> listAll();

    Recipe fetchRecipe(Long id);

    void deleteRecipe(Long id);

    Recipe updateRecipe(Long id, Recipe recipe);

    Recipe createRecipe(Recipe recipe);
}

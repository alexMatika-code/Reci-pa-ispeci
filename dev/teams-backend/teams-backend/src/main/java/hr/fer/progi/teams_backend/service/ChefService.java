package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;

import java.util.List;

public interface ChefService {
    boolean approveRecipe(Long recipeId);

    boolean rejectRecipe(Long recipeId);

    List<RecipeDTO> getAllWaitingRecipes();
}

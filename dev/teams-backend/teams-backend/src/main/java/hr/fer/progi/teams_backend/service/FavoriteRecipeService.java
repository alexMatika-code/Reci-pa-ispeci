package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.dto.FavoriteRecipeDTO;

import java.util.List;

public interface FavoriteRecipeService {
    FavoriteRecipeDTO markAsFavorite(Long personId, Long recipeId);
    List<FavoriteRecipeDTO> getFavoriteRecipesForPerson(Long personId);
}

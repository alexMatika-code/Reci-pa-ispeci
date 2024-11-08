package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

@Data
public class FavoriteRecipeDTO {
    private Long favoriteRecipeId;
    private PersonDTO person;
    private RecipeDTO recipe;
}

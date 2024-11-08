package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

@Data
public class RecipeIngredientDTO {
    private Long recipeIngredientId;
    private RecipeDTO recipe;
    private IngredientDTO ingredient;
}

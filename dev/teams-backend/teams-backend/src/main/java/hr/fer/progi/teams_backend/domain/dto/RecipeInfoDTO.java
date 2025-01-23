package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

import java.util.Set;

@Data
public class RecipeInfoDTO {
    private Long recipeId;
    private String title;
    private String description;
    private String procedure;
    private int timeToCook;
    //private Set<IngredientDTO> ingredients;
    private String link;
}

package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class RecipeDTO {
    private Long recipeId;
    private String title;
    private String description;
    private String procedure;
    private boolean publicity;
    private int timeToCook;

    private Long chefId;
    private Long userId;
    private List<RatingDTO> ratings;

    private String imageBase64;
    private Set<IngredientDTO> ingredients;

}

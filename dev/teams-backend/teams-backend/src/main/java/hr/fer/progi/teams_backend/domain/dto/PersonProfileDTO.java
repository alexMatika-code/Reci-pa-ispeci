package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class PersonProfileDTO {
    private Long personId;
    private String firstName;
    private String lastName;
    private String about;
    private String username;
    private String email;
    private String image;
    private String role; //add getRoles.getName
    private Long recipeCount;
    private Long ratingCount;
    private Double ratingAverage;
    private List<RatingDTO> ratings;
    private List<RecipeDTO> recipes;
    private Set<IngredientDTO> favoriteIngredients;
}

package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class PersonDTO {
    private Long personId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;

    private List<RatingDTO> ratings;
    private List<RecipeDTO> recipes;
    private Set<IngredientDTO> favoriteIngredients;

}

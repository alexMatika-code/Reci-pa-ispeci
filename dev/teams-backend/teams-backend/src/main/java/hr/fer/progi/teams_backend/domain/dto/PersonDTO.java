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

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Set<IngredientDTO> getFavoriteIngredients() {
        return favoriteIngredients;
    }

    public void setFavoriteIngredients(Set<IngredientDTO> favoriteIngredients) {
        this.favoriteIngredients = favoriteIngredients;
    }

    public List<RecipeDTO> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<RecipeDTO> recipes) {
        this.recipes = recipes;
    }

    public List<RatingDTO> getRatings() {
        return ratings;
    }

    public void setRatings(List<RatingDTO> ratings) {
        this.ratings = ratings;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}

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

    public Double getRatingAverage() {
        return ratingAverage;
    }

    public void setRatingAverage(Double ratingAverage) {
        this.ratingAverage = ratingAverage;
    }

    public Long getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Long ratingCount) {
        this.ratingCount = ratingCount;
    }

    public Long getRecipeCount() {
        return recipeCount;
    }

    public void setRecipeCount(Long recipeCount) {
        this.recipeCount = recipeCount;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
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

package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class User {


    @Id
    @GeneratedValue
    private long id;

    private String authority;

    private String firstName;

    private String lastName;

    private String email;

    private String favouriteIngredients;

    private String about;

    @OneToMany
    private Set<Recipe> recipes;

    public void setId(Long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFavouriteIngredients() {
        return favouriteIngredients;
    }

    public void setFavouriteIngredients(String favouriteIngredients) {
        this.favouriteIngredients = favouriteIngredients;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }
}

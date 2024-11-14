package hr.fer.progi.teams_backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Getter
@Setter
@Entity
@Table(name = "PERSON")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long personId;

    protected String firstName;
    protected String lastName;
    protected String about;
    protected String username;
    protected String email;
    protected String password;
    protected String image;

    @ManyToOne
    @JoinColumn(name = "roleId")
    protected Role role;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonBackReference
    protected List<Rating> ratings;

    @OneToMany(mappedBy = "chef", cascade = CascadeType.ALL)
    protected List<Recipe> chefRecipes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    protected List<Recipe> userRecipes;

    @ManyToMany
    @JoinTable(
            name = "favorite_ingredients",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> favoriteIngredients = new HashSet<>();

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
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

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public List<Recipe> getChefRecipes() {
        return chefRecipes;
    }

    public void setChefRecipes(List<Recipe> chefRecipes) {
        this.chefRecipes = chefRecipes;
    }

    public List<Recipe> getUserRecipes() {
        return userRecipes;
    }

    public void setUserRecipes(List<Recipe> userRecipes) {
        this.userRecipes = userRecipes;
    }

    public Set<Ingredient> getFavoriteIngredients() {
        return favoriteIngredients;
    }

    public void setFavoriteIngredients(Set<Ingredient> favoriteIngredients) {
        this.favoriteIngredients = favoriteIngredients;
    }
}

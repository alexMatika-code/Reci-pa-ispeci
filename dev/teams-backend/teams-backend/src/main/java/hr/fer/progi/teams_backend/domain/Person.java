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
}

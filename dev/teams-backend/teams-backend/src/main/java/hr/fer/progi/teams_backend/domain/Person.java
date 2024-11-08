package hr.fer.progi.teams_backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "roleId")
    protected Role role;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonBackReference
    protected List<Rating> ratings;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    protected List<FavoriteRecipe> favoriteRecipes;

    @OneToMany(mappedBy = "chef", cascade = CascadeType.ALL)
    protected List<Recipe> chefRecipes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    protected List<Recipe> userRecipes;
}

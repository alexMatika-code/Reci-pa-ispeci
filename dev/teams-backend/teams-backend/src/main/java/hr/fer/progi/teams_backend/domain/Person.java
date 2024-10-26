package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
public class Person {
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
}

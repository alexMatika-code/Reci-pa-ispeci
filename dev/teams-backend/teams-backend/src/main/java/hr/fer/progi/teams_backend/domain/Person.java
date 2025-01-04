package hr.fer.progi.teams_backend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Data
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "favorite_ingredients",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> favoriteIngredients = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return Objects.equals(personId, person.personId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(personId);
    }

}

package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long ingredientId;

    protected String name;

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
    protected List<RecipeIngredient> recipes;

    @ManyToMany(mappedBy = "favoriteIngredients")
    private Set<Person> favoritedBy = new HashSet<>();
}

package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "RECIPE")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long recipeId;

    protected String procedure;
    protected boolean publicity;
    protected int timeToCook;
    protected String title;
    protected String description;
    protected boolean waitingApproval;
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "chefId", nullable = true)
    protected Person chef;

    @ManyToOne
    @JoinColumn(name = "userId")
    protected Person user;

    @ManyToMany
    @JoinTable(
            name = "recipe_ingredients",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> ingredients = new HashSet<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    protected List<Rating> ratings;

}
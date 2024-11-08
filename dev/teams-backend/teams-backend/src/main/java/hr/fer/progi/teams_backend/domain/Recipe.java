package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name = "chefId", nullable = true)
    protected Person chef;

    @ManyToOne
    @JoinColumn(name = "userId")
    protected Person user;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    protected List<Rating> ratings;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    protected List<RecipeIngredient> ingredients;

}

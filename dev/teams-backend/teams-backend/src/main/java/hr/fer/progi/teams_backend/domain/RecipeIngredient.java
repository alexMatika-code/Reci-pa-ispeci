package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "RECIPE_INGREDIENT")
public class RecipeIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long recipeIngredientId;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    protected Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "ingredientId")
    protected Ingredient ingredient;
}

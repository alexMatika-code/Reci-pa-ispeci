package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "FAVORITE_RECIPE")
public class FavoriteRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long favoriteRecipeId;

    @ManyToOne
    @JoinColumn(name = "personId")
    protected Person person;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    protected Recipe recipe;
}

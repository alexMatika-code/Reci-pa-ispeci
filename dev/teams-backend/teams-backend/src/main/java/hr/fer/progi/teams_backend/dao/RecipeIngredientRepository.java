package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    List<RecipeIngredient> findByRecipe_RecipeId(Long recipeId);
}

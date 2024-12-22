package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository
extends JpaRepository<Rating, Long> {
    @Query("SELECT COUNT(r) FROM Rating r WHERE r.recipe.recipeId IN :recipeIds")
    Long countByRecipeIds(@Param("recipeIds") List<Long> recipeIds);

    @Query("SELECT AVG(r.grade) FROM Rating r WHERE r.recipe.recipeId IN :recipeIds")
    Double calculateAverageRatingByRecipeIds(@Param("recipeIds") List<Long> recipeIds);
}

package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("SELECT COUNT(r) FROM Recipe r WHERE r.user.personId = :userId")
    Long countByUserId(@Param("userId") Long userId);

    @Query("SELECT r.recipeId FROM Recipe r WHERE r.user.personId = :userId")
    List<Long> findIdsByUserId(@Param("userId") Long userId);
}

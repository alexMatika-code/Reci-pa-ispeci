package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("SELECT COUNT(r) FROM Recipe r WHERE r.user.personId = :userId AND r.waitingApproval = false AND r.publicity=true")
    Long countByUserId(@Param("userId") Long userId);

    @Query("SELECT r.recipeId FROM Recipe r WHERE r.user.personId = :userId AND r.waitingApproval = false AND r.publicity=true")
    List<Long> findIdsByUserId(@Param("userId") Long userId);

    Page<Recipe> findByPublicityTrueAndWaitingApprovalFalse(Pageable pageable);

    List<Recipe> findByWaitingApprovalTrueAndPublicityTrue();

    @Query("SELECT r FROM Recipe r " +
            "WHERE r.publicity = true AND r.waitingApproval = false " +
            "AND (LOWER(r.title) LIKE :searchText OR LOWER(r.description) LIKE :searchText) " +
            "AND r.timeToCook <= :maxTimeToCook")
    Page<Recipe> findByPublicityTrueAndWaitingApprovalFalseAndSearchCriteria(
            @Param("searchText") String searchText,
            @Param("maxTimeToCook") Integer maxTimeToCook,
            Pageable pageable);

    @Query("""
            SELECT r
            FROM Recipe r
                 JOIN r.ingredients i
            WHERE r.publicity = true
              AND r.waitingApproval = false
              AND (LOWER(r.title) LIKE :searchText OR LOWER(r.description) LIKE :searchText)
              AND r.timeToCook <= :maxTimeToCook
              AND i.ingredientId IN :ingredientIds
            GROUP BY r
            HAVING COUNT(DISTINCT i.ingredientId) = :ingredientCount
            """)
    Page<Recipe> findByIngredientsAndSearchCriteria(
            @Param("searchText") String searchText,
            @Param("maxTimeToCook") Integer maxTimeToCook,
            @Param("ingredientIds") List<Long> ingredientIds,
            @Param("ingredientCount") long ingredientCount,
            Pageable pageable);

    @Query("""
            SELECT r
            FROM Recipe r
                JOIN r.ingredients i
            WHERE r.publicity = true AND i.ingredientId IN :ingredientIds
            GROUP BY r
            """)
    Page<Recipe> findByPersonFavouriteIngredients(
            @Param("ingredientIds") List<Long> ingredientIds,
            Pageable pageable);

    @Query(value = "SELECT r2.* FROM recipe_ingredients ri1 " +
            "JOIN recipe_ingredients ri2 ON ri1.ingredient_id = ri2.ingredient_id " +
            "JOIN recipe r1 ON ri1.recipe_id = r1.recipe_id " +
            "JOIN recipe r2 ON ri2.recipe_id = r2.recipe_id " +
            "WHERE ri1.recipe_id = :recipeId " +
            "  AND r1.publicity = true " +  // Uvjet da je referentni recept javan
            "  AND r2.recipe_id != :recipeId " +
            "  AND r2.publicity = true " +  // Uvjet da su slični recepti javni
            "GROUP BY r2.recipe_id, r2.procedure, r2.title, r2.description, " +
            "         r2.time_to_cook, r2.publicity, r2.waiting_approval, " +
            "         r2.chef_id, r2.user_id, r2.image " +
            "HAVING COUNT(*) >= 0.8 * (SELECT COUNT(*) FROM recipe_ingredients WHERE recipe_id = :recipeId)",
            nativeQuery = true)
    List<Recipe> findSimilarRecipes(@Param("recipeId") Long recipeId);
}

package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query("SELECT i FROM Ingredient i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :namePart, '%'))")
    List<Ingredient> findByNameContainingIgnoreCase(@Param("namePart") String namePart);

    boolean existsByNameIgnoreCase(String name);
}

package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.FavoriteRecipe;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRecipeRepository extends JpaRepository<FavoriteRecipe, Long> {
    boolean existsByPersonAndRecipe(Person person, Recipe recipe);

    @Query("SELECT fr FROM FavoriteRecipe fr WHERE fr.person.personId = :personId")
    List<FavoriteRecipe> findByPersonId(@Param("personId") Long personId);
}

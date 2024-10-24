package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository
extends JpaRepository<Recipe, Long> {
}

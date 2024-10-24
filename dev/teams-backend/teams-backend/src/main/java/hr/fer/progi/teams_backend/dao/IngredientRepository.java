package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientRepository
extends JpaRepository<Ingredient, Long> {

    List<Ingredient> listAll();
}

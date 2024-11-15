package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.dto.IngredientDTO;

import java.util.List;

public interface IngredientService {

    List<IngredientDTO> listAll();

    IngredientDTO fetchIngredient(Long id);

    void deleteIngredient(Long id);

    Ingredient updateIngredient(Long id, Ingredient ingredient);

    Ingredient createIngredient(Ingredient ingredient);

    List<IngredientDTO> searchIngredientsByName(String namePart);
}

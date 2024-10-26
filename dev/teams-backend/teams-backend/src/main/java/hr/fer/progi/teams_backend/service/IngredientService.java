package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Ingredient;

import java.util.List;

public interface IngredientService {

    List<Ingredient> listAll();

    Ingredient fetchIngredient(Long id);

    void deleteIngredient(Long id);

    Ingredient updateIngredient(Long id, Ingredient ingredient);

    Ingredient createIngredient(Ingredient ingredient);
}

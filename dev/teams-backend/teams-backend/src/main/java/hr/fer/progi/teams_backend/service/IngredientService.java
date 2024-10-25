package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Ingredient;

import java.util.List;

public interface IngredientService {

    List<Ingredient> listAll();

    Ingredient createIngredient(Ingredient ingredient);
}

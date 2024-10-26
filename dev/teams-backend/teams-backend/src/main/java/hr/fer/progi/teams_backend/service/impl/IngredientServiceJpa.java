package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class IngredientServiceJpa implements IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public List<Ingredient> listAll() {
        return ingredientRepository.findAll();
    }

    @Override
    public Ingredient fetchIngredient(Long id) {
        return ingredientRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteIngredient(Long id) {
        ingredientRepository.deleteById(id);
    }

    @Override
    public Ingredient updateIngredient(Long id, Ingredient ingredient) {
        Assert.notNull(ingredient, "Ingredient object must be given");

        Ingredient updateIngredient = ingredientRepository.findById(id).orElse(null);
        Assert.notNull(updateIngredient, "Ingredient by the ID of " + id + " does not exist");

        updateIngredient.setName(ingredient.getName());
        updateIngredient.setDescription(ingredient.getDescription());

        return ingredientRepository.save(updateIngredient);
    }

    @Override
    public Ingredient createIngredient(Ingredient ingredient) {
        Assert.notNull(ingredient, "Ingredient object must be given");
        return ingredientRepository.save(ingredient);
    }
}

package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.dto.IngredientDTO;
import hr.fer.progi.teams_backend.domain.mapper.IngredientMapper;
import hr.fer.progi.teams_backend.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class IngredientServiceJpa implements IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public List<IngredientDTO> listAll() {
        return ingredientRepository.findAll().stream()
                .map(IngredientMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public IngredientDTO fetchIngredient(Long id) {
        Ingredient ingredient=ingredientRepository.findById(id).orElse(null);
        return ingredient==null?null:IngredientMapper.toDTO(ingredient);
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

        return ingredientRepository.save(updateIngredient);
    }

    @Override
    public Ingredient createIngredient(Ingredient ingredient) {
        Assert.notNull(ingredient, "Ingredient object must be given");

        if (ingredientRepository.existsByNameIgnoreCase(ingredient.getName())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ingredient with the given name already exists."
            );        }

        return ingredientRepository.save(ingredient);
    }

    @Override
    public List<IngredientDTO> searchIngredientsByName(String namePart) {
        return ingredientRepository.findByNameContainingIgnoreCase(namePart)
                .stream()
                .map(IngredientMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<IngredientDTO> getIngredientsByRecipeId(Long recipeId) {
        List<Ingredient> ingredients = ingredientRepository.findByRecipesRecipeId(recipeId);

        return ingredients.stream()
                .map(IngredientMapper::toDTO)
                .collect(Collectors.toList());
    }
}

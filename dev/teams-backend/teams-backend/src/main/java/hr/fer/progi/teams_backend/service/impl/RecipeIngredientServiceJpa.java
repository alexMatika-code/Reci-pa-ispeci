package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.dao.RecipeIngredientRepository;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.RecipeIngredient;
import hr.fer.progi.teams_backend.domain.dto.RecipeIngredientDTO;
import hr.fer.progi.teams_backend.domain.mapper.RecipeIngredientMapper;
import hr.fer.progi.teams_backend.service.RecipeIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeIngredientServiceJpa implements RecipeIngredientService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    @Override
    public RecipeIngredientDTO addIngredientToRecipe(Long recipeId, Long ingredientId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found with ID: " + recipeId));

        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new IllegalArgumentException("Ingredient not found with ID: " + ingredientId));

        RecipeIngredient recipeIngredient = new RecipeIngredient();
        recipeIngredient.setRecipe(recipe);
        recipeIngredient.setIngredient(ingredient);

        RecipeIngredient savedRecipeIngredient = recipeIngredientRepository.save(recipeIngredient);
        return RecipeIngredientMapper.toDTO(savedRecipeIngredient);
    }

    @Override
    public List<RecipeIngredientDTO> getIngredientsForRecipe(Long recipeId) {
        // Check if the recipe exists
        recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found with ID: " + recipeId));

        // Fetch and map RecipeIngredients to DTOs
        return recipeIngredientRepository.findByRecipe_RecipeId(recipeId).stream()
                .map(RecipeIngredientMapper::toDTO)
                .collect(Collectors.toList());
    }

}

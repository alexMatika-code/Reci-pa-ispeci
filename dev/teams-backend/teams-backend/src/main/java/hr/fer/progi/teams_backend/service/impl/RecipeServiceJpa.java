package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.domain.mapper.RecipeMapper;
import hr.fer.progi.teams_backend.service.IngredientService;
import hr.fer.progi.teams_backend.service.RecipeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeServiceJpa implements RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public List<RecipeDTO> listAll() {
        return recipeRepository.findAll().stream()
                .map(RecipeMapper::toDTO)
                .collect(Collectors.toList());    }

    @Override
    public RecipeDTO fetchRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        return recipe != null ? RecipeMapper.toDTO(recipe) : null;    }

    @Override
    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe updateRecipe(Long id, Recipe recipe) {
        Assert.notNull(recipe, "Recipe object must be given");

        Recipe updateRecipe = recipeRepository.findById(id).orElse(null);
        Assert.notNull(updateRecipe, "Recipe by the ID of " + id + " does not exist");

        updateRecipe.setIngredients(recipe.getIngredients());
        updateRecipe.setProcedure(recipe.getProcedure());
        updateRecipe.setPublicity(recipe.isPublicity());
        updateRecipe.setTimeToCook(recipe.getTimeToCook());
        updateRecipe.setTitle(recipe.getTitle());
        updateRecipe.setDescription(recipe.getDescription());
        updateRecipe.setWaitingApproval(recipe.isWaitingApproval());
        updateRecipe.setChef(recipe.getChef());
        updateRecipe.setUser(recipe.getUser());

        return recipeRepository.save(updateRecipe);
    }

    @Override
    public Recipe createRecipe(Recipe recipe) {
        Assert.notNull(recipe, "Recipe object must be given");
        return recipeRepository.save(recipe);
    }

    @Override
    @Transactional
    public void addIngredientToRecipe(Long recipeId, Long ingredientId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + recipeId));
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new RuntimeException("Ingredient not found with id: " + ingredientId));

        recipe.getIngredients().add(ingredient);
        recipeRepository.save(recipe);
    }

    @Override
    @Transactional
    public void removeIngredientFromRecipe(Long recipeId, Long ingredientId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + recipeId));
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new RuntimeException("Ingredient not found with id: " + ingredientId));

        recipe.getIngredients().remove(ingredient);
        recipeRepository.save(recipe);
    }
}

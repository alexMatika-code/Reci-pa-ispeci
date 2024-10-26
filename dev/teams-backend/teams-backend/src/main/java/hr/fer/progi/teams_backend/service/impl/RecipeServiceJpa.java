package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class RecipeServiceJpa implements RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public List<Recipe> listAll() {
        return recipeRepository.findAll();
    }

    @Override
    public Recipe fetchRecipe(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

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
        updateRecipe.setType(recipe.getType());
        updateRecipe.setTimeToCook(recipe.getTimeToCook());
        updateRecipe.setName(recipe.getName());
        updateRecipe.setAverageRating(recipe.getAverageRating());

        return recipeRepository.save(updateRecipe);
    }

    @Override
    public Recipe createRecipe(Recipe recipe) {
        Assert.notNull(recipe, "Recipe object must be given");
        return recipeRepository.save(recipe);
    }
}

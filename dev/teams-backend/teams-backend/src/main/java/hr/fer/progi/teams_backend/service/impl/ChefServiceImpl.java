package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.service.ChefService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ChefServiceImpl implements ChefService {
    private final RecipeRepository recipeRepository;

    @Override
    public boolean approveRecipe(Long recipeId) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
        if (optionalRecipe.isPresent()) {
            Recipe recipe = optionalRecipe.get();
            if (recipe.isPublicity()) {
                recipe.setWaitingApproval(false);
                recipeRepository.save(recipe);
                return true;
            }
        }
        return false;
    }
}

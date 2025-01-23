package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.domain.mapper.RecipeMapper;
import hr.fer.progi.teams_backend.service.ChefService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public boolean rejectRecipe(Long recipeId) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
        if (optionalRecipe.isPresent()) {
            Recipe recipe = optionalRecipe.get();
            recipeRepository.delete(recipe);
            return true;
        }
        return false;
    }

    @Override
    public boolean declineRecipe(Long recipeId) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
        if (optionalRecipe.isPresent()) {
            Recipe recipe = optionalRecipe.get();
            if (recipe.isPublicity() && recipe.isWaitingApproval()) {
                recipe.setWaitingApproval(false);
                recipe.setPublicity(false);
                recipeRepository.save(recipe);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<RecipeDTO> getAllWaitingRecipes() {
        List<Recipe> waitingRecipes = recipeRepository.findByWaitingApprovalTrueAndPublicityTrue();

        return waitingRecipes.stream()
                .map(RecipeMapper::toDTO)
                .collect(Collectors.toList());    }
}

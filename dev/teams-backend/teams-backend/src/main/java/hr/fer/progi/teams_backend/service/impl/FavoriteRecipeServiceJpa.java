package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.FavoriteRecipeRepository;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.FavoriteRecipe;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.FavoriteRecipeDTO;
import hr.fer.progi.teams_backend.domain.mapper.FavoriteRecipeMapper;
import hr.fer.progi.teams_backend.service.FavoriteRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteRecipeServiceJpa implements FavoriteRecipeService {
    @Autowired
    private FavoriteRecipeRepository favoriteRecipeRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public FavoriteRecipeDTO markAsFavorite(Long personId, Long recipeId) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new IllegalArgumentException("Person not found with ID: " + personId));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("Recipe not found with ID: " + recipeId));

        if (favoriteRecipeRepository.existsByPersonAndRecipe(person, recipe)) {
            throw new IllegalStateException("Recipe is already marked as favorite by this person.");
        }

        FavoriteRecipe favoriteRecipe = new FavoriteRecipe();
        favoriteRecipe.setPerson(person);
        favoriteRecipe.setRecipe(recipe);

        FavoriteRecipe savedFavorite = favoriteRecipeRepository.save(favoriteRecipe);
        return FavoriteRecipeMapper.toDTO(savedFavorite);
    }

    @Override
    public List<FavoriteRecipeDTO> getFavoriteRecipesForPerson(Long personId) {
        return favoriteRecipeRepository.findByPersonId(personId).stream()
                .map(FavoriteRecipeMapper::toDTO)
                .collect(Collectors.toList());
    }
}

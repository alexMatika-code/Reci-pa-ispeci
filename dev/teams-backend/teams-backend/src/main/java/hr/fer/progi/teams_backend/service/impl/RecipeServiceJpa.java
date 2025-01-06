package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.constants.Roles;
import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.CreateRecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.SearchRecipesDTO;
import hr.fer.progi.teams_backend.domain.mapper.RecipeMapper;
import hr.fer.progi.teams_backend.service.RecipeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RecipeServiceJpa implements RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;
    @Autowired
    private PersonServiceJpa personServiceJpa;

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


    @Override
    public Recipe createRecipeWithImage(CreateRecipeDTO createRecipeDTO,Long personId) throws IOException {
        Recipe recipe = new Recipe();
        recipe.setTitle(createRecipeDTO.getTitle());
        recipe.setDescription(createRecipeDTO.getDescription());
        recipe.setTimeToCook(createRecipeDTO.getTimeToCook());
        recipe.setProcedure(createRecipeDTO.getProcedure());
        recipe.setPublicity(createRecipeDTO.isPublicity());
        recipe.setWaitingApproval(createRecipeDTO.isPublicity());

        Person person = personServiceJpa.getPerson(personId);
        recipe.setUser(person);
        if(person.getRole().getName().equals(Roles.CHEF)){
            recipe.setChef(person);
        }
        if(person.getRole().getName().equals(Roles.ADMIN)){
            recipe.setChef(person);
        }

        if (createRecipeDTO.getImage() != null && !createRecipeDTO.getImage().isEmpty()) {
            recipe.setImage(createRecipeDTO.getImage().getBytes());
        }

        Set<Ingredient> ingredients = createRecipeDTO.getIngredientIds().stream()
                .map(id -> ingredientRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Ingredient not found with ID: " + id)))
                .collect(Collectors.toSet());
        recipe.setIngredients(ingredients);

        return recipeRepository.save(recipe);
    }

    @Override
    public Page<RecipeDTO> listPublicRecipes(SearchRecipesDTO searchRecipesDTO, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        String searchText = (searchRecipesDTO.getSearchText() != null)
                ? "%" + searchRecipesDTO.getSearchText().toLowerCase() + "%"
                : "%";

        Integer maxTimeToCook = (searchRecipesDTO.getMaxTimeToCook() != null)
                ? searchRecipesDTO.getMaxTimeToCook()
                : Integer.MAX_VALUE;

        List<Long> ingIds = searchRecipesDTO.getIngredientIds() != null
                ? searchRecipesDTO.getIngredientIds()
                : List.of();

        if (ingIds.isEmpty()) {
            return recipeRepository.findByPublicityTrueAndWaitingApprovalFalseAndSearchCriteria(
                    searchText, maxTimeToCook, pageable
            ).map(RecipeMapper::toDTO);
        } else {
            return recipeRepository.findByIngredientsAndSearchCriteria(
                    searchText, maxTimeToCook, ingIds, ingIds.size(), pageable
            ).map(RecipeMapper::toDTO);
        }
    }

}

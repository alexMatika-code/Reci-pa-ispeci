package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.constants.Roles;
import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.CreateRecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.RecipeInfoDTO;
import hr.fer.progi.teams_backend.domain.dto.SearchRecipesDTO;
import hr.fer.progi.teams_backend.domain.mapper.RecipeMapper;
import hr.fer.progi.teams_backend.service.RecipeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.server.ResponseStatusException;

import javax.security.sasl.SaslServer;
import java.io.Console;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RecipeServiceJpa implements RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private PersonRepository personRepository;

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
    public List<RecipeInfoDTO> listAllPublic() {
        return recipeRepository.findByPublicityTrueAndWaitingApprovalFalse().stream()
                .map(RecipeMapper::toInfoDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RecipeDTO fetchRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElse(null);
        return recipe != null ? RecipeMapper.toDTO(recipe) : null;    }

    @Override
    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe updateRecipe(Long id, CreateRecipeDTO recipe) throws IOException {
        Assert.notNull(recipe, "Recipe object must be given");

        Recipe updateRecipe = recipeRepository.findById(id).orElse(null);
        Assert.notNull(updateRecipe, "Recipe by the ID of " + id + " does not exist");

        updateRecipe.setIngredients(new HashSet<>());
        recipeRepository.saveAndFlush(updateRecipe);

        Set<Ingredient> ingredients = recipe.getIngredientIds().stream()
                .map(id_ingr -> ingredientRepository.findById(id_ingr)
                        .orElseThrow(() -> new RuntimeException("Ingredient not found with ID: " + id_ingr)))
                .collect(Collectors.toSet());

        updateRecipe.setIngredients(ingredients);

        updateRecipe.setProcedure(recipe.getProcedure());
        updateRecipe.setPublicity(recipe.isPublicity());
        updateRecipe.setTimeToCook(recipe.getTimeToCook());
        updateRecipe.setTitle(recipe.getTitle());
        updateRecipe.setDescription(recipe.getDescription());
        if (recipe.getImage() != null && !recipe.getImage().isEmpty()) {
            updateRecipe.setImage(recipe.getImage().getBytes());
        }
        if (updateRecipe.isPublicity()) {
            updateRecipe.setWaitingApproval(true);
        }
        return recipeRepository.saveAndFlush(updateRecipe);
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
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "recipeId"));

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

    @Override
    public Page<RecipeDTO> listRecommendedRecipes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "recipeId"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        final Page<RecipeDTO>[] result = new Page[1];

        personRepository.findByEmail(email).ifPresentOrElse(
                person -> {
                    result[0] = recipeRepository.findByPersonFavouriteIngredients(
                            person.getFavoriteIngredients()
                                    .stream()
                                    .map(Ingredient::getIngredientId)
                                    .collect(Collectors.toList()), pageable
                    ).map(RecipeMapper::toDTO);
                },
                () -> {
                    throw new RuntimeException("User not found: " + email);
                }
        );
        if (result[0] != null) {
            return result[0];
        }else{
            return recipeRepository.findByPublicityTrueAndWaitingApprovalFalse(pageable).map(RecipeMapper::toDTO);
        }
    }

    @Override
    public List<RecipeDTO> findSimilarRecipes(Long recipeId) {

        if (recipeId == null || recipeId <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid recipe ID");
        }

        boolean recipeExists = recipeRepository.existsById(recipeId);
        if (!recipeExists) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found");
        }

        List<Recipe> similarRecipes = recipeRepository.findSimilarRecipes(recipeId);

        return similarRecipes.stream()
                .map(RecipeMapper::toDTO)
                .collect(Collectors.toList());
    }

}

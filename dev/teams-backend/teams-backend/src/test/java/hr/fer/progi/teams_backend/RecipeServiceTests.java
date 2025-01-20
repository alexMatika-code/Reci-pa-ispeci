package hr.fer.progi.teams_backend;

import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.service.impl.RecipeServiceJpa;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import org.springframework.web.server.ResponseStatusException;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTests {

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeServiceJpa recipeService;

    private Recipe createRecipe(Long recipeId, String title, Set<Ingredient> ingredients) {
        Recipe recipe = new Recipe();
        Person person = new Person();
        person.setUsername("1");
        recipe.setRecipeId(recipeId);
        recipe.setUser(person);
        recipe.setTitle(title);
        recipe.setIngredients(ingredients);
        recipe.setDescription("1");
        recipe.setWaitingApproval(true);
        recipe.setTimeToCook(2);
        recipe.setRatings(Collections.emptyList());
        recipe.setPublicity(true);
        return recipe;
    }

    private Ingredient createIngredient(Long ingredientId, String name) {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientId(ingredientId);
        ingredient.setName(name);
        return ingredient;
    }

    @Test
    void testFindSimilarRecipes_50PercentMatch() {
        Long recipeId = 1L;
        Ingredient ingredient1 = createIngredient(1L, "Salt");
        Ingredient ingredient2 = createIngredient(2L, "Sugar");
        Ingredient ingredient3 = createIngredient(3L, "Flour");

        Recipe mainRecipe = createRecipe(recipeId, "Main Recipe", Set.of(ingredient1, ingredient2));
        Recipe similarRecipe = createRecipe(2L, "Similar Recipe", Set.of(ingredient1, ingredient3));

        when(recipeRepository.existsById(recipeId)).thenReturn(true);
        when(recipeRepository.findSimilarRecipes(recipeId)).thenReturn(Collections.emptyList());

        List<RecipeDTO> result = recipeService.findSimilarRecipes(recipeId);

        assertNotNull(result);
        assertTrue(result.isEmpty(), "Recipes with less than 80% similarity should not be returned.");
    }

    @Test
    void testFindSimilarRecipes_80PercentMatch() {
        Long recipeId = 1L;
        Ingredient ingredient1 = createIngredient(1L, "Salt");
        Ingredient ingredient2 = createIngredient(2L, "Sugar");
        Ingredient ingredient3 = createIngredient(3L, "Flour");
        Ingredient ingredient4 = createIngredient(4L, "Butter");
        Ingredient ingredient5 = createIngredient(5L, "Milk");

        Recipe mainRecipe = createRecipe(recipeId, "Main Recipe", Set.of(ingredient1, ingredient2, ingredient3,
                ingredient4, ingredient5));
        Recipe similarRecipe = createRecipe(2L, "Similar Recipe", Set.of(ingredient1, ingredient2,
                ingredient3, ingredient4));

        when(recipeRepository.existsById(recipeId)).thenReturn(true);
        when(recipeRepository.findSimilarRecipes(recipeId)).thenReturn(List.of(similarRecipe));

        List<RecipeDTO> result = recipeService.findSimilarRecipes(recipeId);

        assertNotNull(result);
        assertEquals(1, result.size(), "Exactly 80% similarity should return one recipe.");
        assertEquals("Similar Recipe", result.get(0).getTitle());
    }

    @Test
    void testFindSimilarRecipes_100PercentMatch() {
        Long recipeId = 1L;
        Ingredient ingredient1 = createIngredient(1L, "Salt");
        Ingredient ingredient2 = createIngredient(2L, "Sugar");

        Recipe mainRecipe = createRecipe(recipeId, "Main Recipe", Set.of(ingredient1, ingredient2));
        Recipe similarRecipe = createRecipe(2L, "Similar Recipe", Set.of(ingredient1, ingredient2));

        when(recipeRepository.existsById(recipeId)).thenReturn(true);
        when(recipeRepository.findSimilarRecipes(recipeId)).thenReturn(List.of(similarRecipe));

        List<RecipeDTO> result = recipeService.findSimilarRecipes(recipeId);

        assertNotNull(result);
        assertEquals(1, result.size(), "100% similarity should return one recipe.");
        assertEquals("Similar Recipe", result.get(0).getTitle());
    }

    @Test
    void testFindSimilarRecipes_InvalidRecipeId() {
        Long recipeId = null;
        assertThrows(ResponseStatusException.class, () -> recipeService.findSimilarRecipes(recipeId));
    }

    @Test
    void testFindSimilarRecipes_NonExistingRecipe() {
        Long recipeId = 1L;
        when(recipeRepository.existsById(recipeId)).thenReturn(false);
        assertThrows(ResponseStatusException.class, () -> recipeService.findSimilarRecipes(recipeId));
    }

    @Test
    void testDeleteRecipe_NullId() {
        recipeService.deleteRecipe(null);
        verify(recipeRepository, never()).deleteById(anyLong());
    }
}

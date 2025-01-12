package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.CreateRecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.domain.mapper.RecipeMapper;
import hr.fer.progi.teams_backend.service.PersonService;
import hr.fer.progi.teams_backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import hr.fer.progi.teams_backend.domain.dto.SearchRecipesDTO;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private PersonService personService;

    @PreAuthorize("hasAnyAuthority('ADMIN','CHEF', 'USER')")
    @GetMapping("")
    public List<RecipeDTO> listRecipes() {
        return recipeService.listAll();
    }


    @GetMapping("/{id}")
    public RecipeDTO getRecipe(@PathVariable Long id) {
        return recipeService.fetchRecipe(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>  updateRecipe(@PathVariable Long id, @RequestBody CreateRecipeDTO recipe) {
        try {
            Recipe updatedRecipe = recipeService.updateRecipe(id, recipe);

            if (updatedRecipe == null || updatedRecipe.getRecipeId() == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save recipe in the database");
            }

            return ResponseEntity.ok("Recipe updated successfully with ID: " + updatedRecipe.getRecipeId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to upload image");
        }
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @PostMapping("/{recipeId}/addIngredient/{ingredientId}")
    public ResponseEntity<?> addIngredientToRecipe(@PathVariable Long recipeId, @PathVariable Long ingredientId) {
        recipeService.addIngredientToRecipe(recipeId, ingredientId);
        return ResponseEntity.ok("Ingredient added to recipe.");
    }

    @DeleteMapping("/{recipeId}/removeIngredient/{ingredientId}")
    public ResponseEntity<?> removeIngredientFromRecipe(@PathVariable Long recipeId, @PathVariable Long ingredientId) {
        recipeService.removeIngredientFromRecipe(recipeId, ingredientId);
        return ResponseEntity.ok("Ingredient removed from recipe.");
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRecipe(@ModelAttribute CreateRecipeDTO createRecipeDTO, Authentication authentication) {
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        PersonDTO person = personService.findByEmail(email);

        if (person != null) {
            try {
                Recipe createdRecipe = recipeService.createRecipeWithImage(createRecipeDTO, person.getPersonId());

                if (createdRecipe == null || createdRecipe.getRecipeId() == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save recipe in the database");
                }

                return ResponseEntity.ok("Recipe created successfully with ID: " + createdRecipe.getRecipeId() + ", user ID: " + person.getPersonId());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to upload image");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }


    @GetMapping("/public")
    public ResponseEntity<?> getPublicRecipes(
            @RequestParam(required = false) String searchText,
            @RequestParam(required = false) Integer maxTimeToCook,
            @RequestParam(required = false) List<Long> ingredientIds,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        SearchRecipesDTO searchRecipesDTO = RecipeMapper.toSearchRecipesDTO(
                searchText,
                maxTimeToCook,
                ingredientIds
        );
        return ResponseEntity.ok(recipeService.listPublicRecipes(searchRecipesDTO, page, size));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN','CHEF', 'USER')")
    @GetMapping("/recommended")
    public ResponseEntity<?> getRecommendedRecipes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(recipeService.listRecommendedRecipes(page, size));
    }

    @GetMapping("/checkSimilarity/{recipeId}")
    public ResponseEntity<?> getSimilarRecipes(@PathVariable Long recipeId) {
        List<RecipeDTO> similarRecipes = recipeService.findSimilarRecipes(recipeId);
        if (similarRecipes.isEmpty()) {
            return ResponseEntity.ok("No similar recipes found");
        }
        return ResponseEntity.ok(similarRecipes);
    }
}

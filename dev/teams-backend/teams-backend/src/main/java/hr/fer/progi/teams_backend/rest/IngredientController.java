package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.dto.IngredientDTO;
import hr.fer.progi.teams_backend.service.IngredientService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @GetMapping
    public List<IngredientDTO> getAllIngredients() {
        return ingredientService.listAll();
    }

    @GetMapping("/{id}")
    public IngredientDTO getIngredient(@PathVariable Long id) {
        return ingredientService.fetchIngredient(id);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'CHEF')")
    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Print the roles of the authenticated user
        if (authentication != null) {
            System.out.println("User: " + authentication.getName());
            System.out.println("Roles: ");
            for (GrantedAuthority authority : authentication.getAuthorities()) {
                System.out.println(authority.getAuthority());
            }
        } else {
            System.out.println("No user is authenticated.");
        }

        ingredientService.deleteIngredient(id);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'CHEF')")
    @PutMapping("/{id}")
    public Ingredient updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredient) {
        return ingredientService.updateIngredient(id, ingredient);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'CHEF')")
    @PostMapping
    public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.createIngredient(ingredient);
    }

    @GetMapping("/search")
    public List<IngredientDTO> searchIngredients(@RequestParam String namePart) {
        return ingredientService.searchIngredientsByName(namePart);
    }

    @GetMapping("/recipe/{recipeId}")
    public List<IngredientDTO> searchIngredientsByRecipe(@PathVariable Long recipeId) {
        log.info("Fetching ingredients for recipe ID: {}", recipeId);
        List<IngredientDTO> ingredientDTOs = ingredientService.getIngredientsByRecipeId(recipeId);

        if (ingredientDTOs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No ingredients found for the given recipe ID");
        } else {
            log.info("Fetched {} ingredients for recipe ID: {}", ingredientDTOs.size(), recipeId);
        }

        return ingredientDTOs;
    }

}

package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.dto.IngredientDTO;
import hr.fer.progi.teams_backend.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "https://reci-pa-ispeci.onrender.com",allowCredentials = "true")
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

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        ingredientService.deleteIngredient(id);
    }

    @PutMapping("/{id}")
    public Ingredient updateIngredient(@PathVariable Long id, @RequestBody Ingredient ingredient) {
        return ingredientService.updateIngredient(id, ingredient);
    }

    @PostMapping
    public Ingredient createIngredient(@RequestBody Ingredient ingredient) {
        return ingredientService.createIngredient(ingredient);
    }

    @GetMapping("/search")
    public List<IngredientDTO> searchIngredients(@RequestParam String namePart) {
        return ingredientService.searchIngredientsByName(namePart);
    }
}

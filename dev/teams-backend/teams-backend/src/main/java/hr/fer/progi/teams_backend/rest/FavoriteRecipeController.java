package hr.fer.progi.teams_backend.rest;


import hr.fer.progi.teams_backend.domain.dto.FavoriteRecipeDTO;
import hr.fer.progi.teams_backend.service.FavoriteRecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favoriteRecipes")
public class FavoriteRecipeController {
    @Autowired
    private FavoriteRecipeService favoriteRecipeService;

    @PostMapping("/markAsFavorite")
    public FavoriteRecipeDTO markAsFavorite(@RequestParam Long personId, @RequestParam Long recipeId) {
        return favoriteRecipeService.markAsFavorite(personId, recipeId);
    }

    @GetMapping("/person/{personId}")
    public List<FavoriteRecipeDTO> getFavoriteRecipesForPerson(@PathVariable Long personId) {
        return favoriteRecipeService.getFavoriteRecipesForPerson(personId);
    }
}

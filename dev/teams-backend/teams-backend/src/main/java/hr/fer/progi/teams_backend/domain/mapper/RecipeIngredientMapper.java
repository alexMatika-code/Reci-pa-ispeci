package hr.fer.progi.teams_backend.domain.mapper;

import hr.fer.progi.teams_backend.domain.RecipeIngredient;
import hr.fer.progi.teams_backend.domain.dto.RecipeIngredientDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RecipeIngredientMapper {
    public static RecipeIngredientDTO toDTO(RecipeIngredient recipeIngredient) {
        RecipeIngredientDTO dto = new RecipeIngredientDTO();
        dto.setRecipeIngredientId(recipeIngredient.getRecipeIngredientId());
        dto.setRecipe(RecipeMapper.toDTO(recipeIngredient.getRecipe()));
        dto.setIngredient(IngredientMapper.toDTO(recipeIngredient.getIngredient()));
        return dto;
    }
}

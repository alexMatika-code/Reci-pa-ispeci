package hr.fer.progi.teams_backend.domain.mapper;

import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class RecipeMapper {

    public static RecipeDTO toDTO(Recipe recipe) {
        RecipeDTO dto = new RecipeDTO();
        dto.setRecipeId(recipe.getRecipeId());
        dto.setTitle(recipe.getTitle());
        dto.setDescription(recipe.getDescription());
        dto.setProcedure(recipe.getProcedure());
        dto.setPublicity(recipe.isPublicity());
        dto.setWaitingApproval(recipe.isWaitingApproval());
        dto.setTimeToCook(recipe.getTimeToCook());
        dto.setRatings(recipe.getRatings().stream()
                .map(RatingMapper::toDTO)
                .collect(Collectors.toList()));

        dto.setIngredients(
                recipe.getIngredients().stream()
                        .map(IngredientMapper::toDTO)
                        .collect(Collectors.toSet())
        );

        if (recipe.getImage() != null) {
            dto.setImageBase64(Base64.getEncoder().encodeToString(recipe.getImage()));
        }else{
            dto.setImageBase64(null);
        }

        if (recipe.getChef() != null) {
            dto.setChefId(recipe.getChef().getPersonId());
        } else {
            dto.setChefId(null);
        }
        dto.setUserId(recipe.getUser().getPersonId() != null ? recipe.getUser().getPersonId() : null);

        return dto;
    }
}

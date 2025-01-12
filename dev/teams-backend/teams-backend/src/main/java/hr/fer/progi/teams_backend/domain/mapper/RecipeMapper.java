package hr.fer.progi.teams_backend.domain.mapper;

import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.RecipeDTO;
import hr.fer.progi.teams_backend.domain.dto.SearchRecipesDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RecipeMapper {

    public static RecipeDTO toDTO(Recipe recipe) {
        RecipeDTO dto = new RecipeDTO();
        dto.setUserName(recipe.getUser().getUsername());
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

    public static SearchRecipesDTO toSearchRecipesDTO(
            String searchText,
            Integer maxTimeToCook,
            List<Long> ingredientIds
    ) {
        String effectiveSearchText = (searchText != null) ? searchText : "";
        int effectiveMaxTimeToCook = (maxTimeToCook != null) ? maxTimeToCook : Integer.MAX_VALUE;

        SearchRecipesDTO dto = new SearchRecipesDTO();
        dto.setSearchText(effectiveSearchText);
        dto.setMaxTimeToCook(effectiveMaxTimeToCook);

        if (ingredientIds != null && !ingredientIds.isEmpty()) {
            dto.setIngredientIds(ingredientIds);
        } else {
            dto.setIngredientIds(List.of());
        }

        return dto;
    }
}

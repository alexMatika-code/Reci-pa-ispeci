package hr.fer.progi.teams_backend.domain.mapper;


import hr.fer.progi.teams_backend.domain.FavoriteRecipe;
import hr.fer.progi.teams_backend.domain.dto.FavoriteRecipeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class FavoriteRecipeMapper {
    public static FavoriteRecipeDTO toDTO(FavoriteRecipe favoriteRecipe) {
        FavoriteRecipeDTO dto = new FavoriteRecipeDTO();
        dto.setFavoriteRecipeId(favoriteRecipe.getFavoriteRecipeId());

        dto.setPerson(PersonMapper.toDTO(favoriteRecipe.getPerson()));
        dto.setRecipe(RecipeMapper.toDTO(favoriteRecipe.getRecipe()));

        return dto;
    }
}

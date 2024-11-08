package hr.fer.progi.teams_backend.domain.mapper;


import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.dto.IngredientDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class IngredientMapper {
    public static IngredientDTO toDTO(Ingredient ingredient) {
        IngredientDTO dto = new IngredientDTO();
        dto.setIngredientId(ingredient.getIngredientId());
        dto.setName(ingredient.getName());
        return dto;
    }

}

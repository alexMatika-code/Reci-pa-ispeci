package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

@Data
public class IngredientDTO {
    private Long ingredientId;
    private String name;
    private String description;
}

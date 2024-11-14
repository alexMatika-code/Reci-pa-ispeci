package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

@Data
public class IngredientDTO {
    private Long ingredientId;
    private String name;

    public Long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Long ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

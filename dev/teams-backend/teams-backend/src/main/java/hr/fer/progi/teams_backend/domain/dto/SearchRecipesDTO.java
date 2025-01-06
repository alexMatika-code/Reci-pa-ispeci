package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class SearchRecipesDTO {
    private String searchText;
    private Integer maxTimeToCook;
    private List<Long> ingredientIds;
}

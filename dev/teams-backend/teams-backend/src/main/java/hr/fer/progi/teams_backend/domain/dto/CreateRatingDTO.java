package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

@Data
public class CreateRatingDTO {
    private Long recipeId;
    private int grade;
    private String comment;
}
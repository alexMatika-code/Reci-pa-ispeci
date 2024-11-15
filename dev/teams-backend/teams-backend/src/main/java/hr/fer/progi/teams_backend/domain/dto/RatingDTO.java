package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

@Data
public class RatingDTO {
    private Long ratingId;
    private int grade;
    private String comment;

    private Long personId;
    private Long recipeId;
}

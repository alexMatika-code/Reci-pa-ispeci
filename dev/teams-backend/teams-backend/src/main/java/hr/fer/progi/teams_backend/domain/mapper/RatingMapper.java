package hr.fer.progi.teams_backend.domain.mapper;


import hr.fer.progi.teams_backend.domain.Rating;
import hr.fer.progi.teams_backend.domain.dto.RatingDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RatingMapper {
    public static RatingDTO toDTO(Rating rating) {
        RatingDTO dto = new RatingDTO();
        dto.setRatingId(rating.getRatingId());
        dto.setGrade(rating.getGrade());
        dto.setComment(rating.getComment());
        dto.setPersonId(rating.getPerson().getPersonId());
        dto.setRecipeId(rating.getRecipe().getRecipeId());

        return dto;
    }
}

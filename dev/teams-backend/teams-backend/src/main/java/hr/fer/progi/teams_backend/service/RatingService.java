package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Rating;
import hr.fer.progi.teams_backend.domain.dto.RatingDTO;

import java.util.List;

public interface RatingService {

    List<RatingDTO> listAll();

    RatingDTO fetchRating(Long id);

    void deleteRating(Long id);

    Rating updateRating(Long id, Rating rating);

    Rating createRating(Rating rating);

    Long getTotalRatingCountByUserId(Long userId);

    Double getAverageRatingByUserId(Long userId);
}

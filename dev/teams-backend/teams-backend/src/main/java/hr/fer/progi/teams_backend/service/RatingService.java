package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Rating;

import java.util.List;

public interface RatingService {

    List<Rating> listAll();

    Rating fetchRating(Long id);

    void deleteRating(Long id);

    Rating updateRating(Long id, Rating rating);

    Rating createRating(Rating rating);
}

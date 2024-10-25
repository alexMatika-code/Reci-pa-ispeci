package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Rating;

import java.util.List;

public interface RatingService {

    List<Rating> listAll();

    Rating createRating(Rating rating);
}

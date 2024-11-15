package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RatingRepository;
import hr.fer.progi.teams_backend.domain.Rating;
import hr.fer.progi.teams_backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class RatingServiceJpa implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> listAll() {
        return ratingRepository.findAll();
    }

    @Override
    public Rating fetchRating(Long id) {
        return ratingRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }

    @Override
    public Rating updateRating(Long id, Rating rating) {
        Assert.notNull(rating, "Rating object must be given");

        Rating updatedRating = ratingRepository.findById(id).orElse(null);
        Assert.notNull(updatedRating, "Rating by the ID of " + id + " does not exist");

        updatedRating.setComment(rating.getComment());
        updatedRating.setRating(rating.getRating());
        updatedRating.setPerson(rating.getPerson());
        updatedRating.setRecipe(rating.getRecipe());

        return ratingRepository.save(updatedRating);
    }

    @Override
    public Rating createRating(Rating rating) {
        Assert.notNull(rating, "Rating object must be given");
        return ratingRepository.save(rating);
    }
}
package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RatingRepository;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Rating;
import hr.fer.progi.teams_backend.domain.dto.RatingDTO;
import hr.fer.progi.teams_backend.domain.mapper.RatingMapper;
import hr.fer.progi.teams_backend.service.RatingService;
import hr.fer.progi.teams_backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingServiceJpa implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public List<RatingDTO> listAll() {
        return ratingRepository.findAll().stream()
                .map(RatingMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RatingDTO fetchRating(Long id) {
        Rating rating = ratingRepository.findById(id).orElse(null);
        return rating != null ? RatingMapper.toDTO(rating) : null;
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
        updatedRating.setGrade(rating.getGrade());
        updatedRating.setPerson(rating.getPerson());
        updatedRating.setRecipe(rating.getRecipe());

        return ratingRepository.save(updatedRating);
    }

    @Override
    public Rating createRating(Rating rating) {
        Assert.notNull(rating, "Rating object must be given");
        return ratingRepository.save(rating);
    }

    @Override
    public Long getTotalRatingCountByUserId(Long userId) {
        List<Long> recipeIds = recipeRepository.findIdsByUserId(userId);
        return ratingRepository.countByRecipeIds(recipeIds);
    }

    @Override
    public Double getAverageRatingByUserId(Long userId) {
        List<Long> recipeIds = recipeRepository.findIdsByUserId(userId);
        return ratingRepository.calculateAverageRatingByRecipeIds(recipeIds);
    }
}

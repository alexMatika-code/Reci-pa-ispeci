package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RatingRepository;
import hr.fer.progi.teams_backend.domain.Rating;
import hr.fer.progi.teams_backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceJpa implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> listAll() {
        return ratingRepository.findAll();
    }
}

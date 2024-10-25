package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Rating;
import hr.fer.progi.teams_backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    RatingService ratingService;

    @GetMapping
    public List<Rating> getRatings() {
        return ratingService.listAll();
    }

    @PostMapping
    public Rating createRating(@RequestBody Rating rating) {
        return ratingService.createRating(rating);
    }
}

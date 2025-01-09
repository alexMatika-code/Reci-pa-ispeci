package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Rating;
import hr.fer.progi.teams_backend.domain.dto.CreateRatingDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.domain.dto.RatingDTO;
import hr.fer.progi.teams_backend.service.PersonService;
import hr.fer.progi.teams_backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private PersonService personService;

    @GetMapping
    public List<RatingDTO> getRatings() {
        return ratingService.listAll();
    }

    @GetMapping("/{id}")
    public RatingDTO getRating(@PathVariable Long id) {
        return ratingService.fetchRating(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRating(@PathVariable Long id) {
        ratingService.deleteRating(id);
    }

    @PutMapping("/{id}")
    public Rating updateRating(@PathVariable Long id, @RequestBody Rating rating) {
        return ratingService.updateRating(id, rating);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CHEF', 'USER')")
    @PostMapping
    public Rating createRating(@RequestBody Rating rating) {
        return ratingService.createRating(rating);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CHEF', 'USER')")
    @PostMapping("/create")
    public ResponseEntity<?> createRating(@RequestBody CreateRatingDTO createRatingDTO, Authentication authentication) {
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        PersonDTO person = personService.findByEmail(email);

        if (person != null) {
            Rating createdRating = ratingService.createRating(createRatingDTO, person.getPersonId());
            return ResponseEntity.ok("Rating created successfully with ID: " + createdRating.getRatingId());
        } else {
            return ResponseEntity.status(401).body("User not found");
        }
    }
}

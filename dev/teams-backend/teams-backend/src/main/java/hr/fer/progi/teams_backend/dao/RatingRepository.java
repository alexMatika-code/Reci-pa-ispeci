package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository
extends JpaRepository<Rating, Long> {

    List<Rating> listAll();
}

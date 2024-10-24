package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository
extends JpaRepository<Rating, Long> {
}

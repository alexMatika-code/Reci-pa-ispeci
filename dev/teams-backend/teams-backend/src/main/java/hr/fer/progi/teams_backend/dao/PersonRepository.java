package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}
package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;

import java.util.List;

public interface PersonService {

    List<PersonDTO> listAll();

    PersonDTO fetchPerson(Long id);

    void deletePerson(Long id);

    Person updatePerson(Long id, Person person);

    Person createPerson(Person person);
}

package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Person;

import java.util.List;

public interface PersonService {

    List<Person> listAll();

    Person fetchPerson(Long id);

    void deletePerson(Long id);

    Person updatePerson(Long id, Person person);

    Person createPerson(Person person);
}

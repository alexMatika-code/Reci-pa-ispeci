package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.domain.mapper.PersonMapper;
import hr.fer.progi.teams_backend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Service
public class PersonServiceJpa implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public List<PersonDTO> listAll() {
        return personRepository.findAll().stream()
                .map(PersonMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PersonDTO fetchPerson(Long id) {
        Person person = personRepository.findById(id).orElse(null);
        return person != null ? PersonMapper.toDTO(person) : null;
    }

    @Override
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

    @Override
    public Person updatePerson(Long id, Person person) {
        Assert.notNull(person, "Person object must be given");

        Person updatePerson = personRepository.findById(id).orElse(null);
        Assert.notNull(updatePerson, "Person by the ID of " + id + " does not exist");

        updatePerson.setFirstName(person.getFirstName());
        updatePerson.setLastName(person.getLastName());
        updatePerson.setEmail(person.getEmail());
        updatePerson.setAbout(person.getAbout());
        updatePerson.setUsername(person.getUsername());
        updatePerson.setPassword(person.getPassword());

        updatePerson.setRole(person.getRole());
        updatePerson.setRatings(person.getRatings());
        updatePerson.setFavoriteRecipes(person.getFavoriteRecipes());
        updatePerson.setChefRecipes(person.getChefRecipes());
        updatePerson.setUserRecipes(person.getUserRecipes());

        return personRepository.save(updatePerson);
    }

    @Override
    public Person createPerson(Person person) {
        Assert.notNull(person, "Person object must be given");
        return personRepository.save(person);
    }
}

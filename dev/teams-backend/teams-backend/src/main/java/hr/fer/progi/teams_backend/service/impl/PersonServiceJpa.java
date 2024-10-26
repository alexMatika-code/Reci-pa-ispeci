package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class PersonServiceJpa implements PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Override
    public List<Person> listAll() {
        return personRepository.findAll();
    }

    @Override
    public Person fetchPerson(Long id) {
        return personRepository.findById(id).orElse(null);
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

        updatePerson.setAuthority(person.getAuthority());
        updatePerson.setFirstName(person.getFirstName());
        updatePerson.setLastName(person.getLastName());
        updatePerson.setEmail(person.getEmail());
        updatePerson.setFavouriteIngredients(person.getFavouriteIngredients());
        updatePerson.setAbout(person.getAbout());
        updatePerson.setRecipes(person.getRecipes());

        return personRepository.save(updatePerson);
    }

    @Override
    public Person createPerson(Person person) {
        Assert.notNull(person, "Person object must be given");
        return personRepository.save(person);
    }
}

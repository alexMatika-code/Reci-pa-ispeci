package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.service.PersonService;
import org.apache.coyote.BadRequestException;
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
    public Person createPerson(Person person) {
        Assert.notNull(person, "Person object must be given");
        return personRepository.save(person);
    }
}

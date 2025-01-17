package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.dao.RecipeRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.PersonAuthInfoDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonProfileDTO;
import hr.fer.progi.teams_backend.domain.mapper.PersonMapper;
import hr.fer.progi.teams_backend.service.PersonService;
import hr.fer.progi.teams_backend.service.RatingService;
import hr.fer.progi.teams_backend.service.RecipeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonServiceJpa implements PersonService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private IngredientRepository ingredientRepository;

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
    public Person getPerson(Long id){
        return personRepository.findById(id).orElse(null);
    }

    @Override
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

    @Override
    public PersonDTO findByEmail(String email) {
        Person person = personRepository.findByEmail(email).orElse(null);
        return person != null ? PersonMapper.toDTO(person) : null;
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
        updatePerson.setChefRecipes(person.getChefRecipes());
        updatePerson.setUserRecipes(person.getUserRecipes());

        return personRepository.save(updatePerson);
    }

    @Override
    public Person createPerson(Person person) {
        Assert.notNull(person, "Person object must be given");
        return personRepository.save(person);
    }

    @Override
    @Transactional
    public void addFavoriteIngredient(Long personId, Long ingredientId) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + personId));
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new RuntimeException("Ingredient not found with id: " + ingredientId));

        person.getFavoriteIngredients().add(ingredient);
        personRepository.save(person);
    }

    @Override
    @Transactional
    public void removeFavoriteIngredient(Long personId, Long ingredientId) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + personId));
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new RuntimeException("Ingredient not found with id: " + ingredientId));

        person.getFavoriteIngredients().remove(ingredient);
        personRepository.save(person);
    }

    @Override
    public PersonProfileDTO getPersonProfileByUsername(String username) {
        // Retrieve the person by username
        Person person = personRepository.findByUsername(username).orElse(null);
        if (person == null) {
            return null;
        }
        Long recipeCount=recipeRepository.countByUserId(person.getPersonId());
        Long ratingCount = ratingService.getTotalRatingCountByUserId(person.getPersonId());
        Double averageRating = ratingService.getAverageRatingByUserId(person.getPersonId());

        // Pass the additional data to the mapper
        return PersonMapper.toPersonProfileDTO(person, recipeCount, ratingCount, averageRating);
    }

    @Override
    public PersonAuthInfoDTO GetAuthUserInfo(Long id) {
        Person person = personRepository.findById(id).orElse(null);
        return person != null ? PersonMapper.PersonToPersonAuthInfoDTO(person) : null;
    }
}

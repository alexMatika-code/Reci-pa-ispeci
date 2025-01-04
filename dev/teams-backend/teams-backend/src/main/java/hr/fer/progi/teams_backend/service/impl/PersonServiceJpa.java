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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
    public Person createPerson(Person person) {
        Assert.notNull(person, "Person object must be given");
        return personRepository.save(person);
    }

    @Override
    public void updatePerson(String about) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");

        personRepository.findByEmail(email).ifPresentOrElse(
                person -> {
                    person.setAbout(about);
                    personRepository.save(person);
                },
                () -> {
                    throw new RuntimeException("User not found: " + email);
                }
        );
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
    public void addFavoriteIngredients(Long personId, List<Long> ingredientIds) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + personId));

        List<Ingredient> ingredients = ingredientRepository.findAllById(ingredientIds);
        if (ingredients.size() != ingredientIds.size()) {
            throw new RuntimeException("Some ingredients were not found with the provided IDs");
        }

        for (Ingredient ingredient : ingredients) {
            if (person.getFavoriteIngredients().contains(ingredient)) {
                throw new IllegalArgumentException("Ingredient already added to favorites: " + ingredient.getName());
            }
        }

        person.getFavoriteIngredients().addAll(ingredients);
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
    @Transactional
    public void setFavoriteIngredients(Long personId, List<Long> ingredientIds) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + personId));

        List<Ingredient> ingredients = ingredientRepository.findAllById(ingredientIds);
        if (ingredients.size() != ingredientIds.size()) {
            throw new RuntimeException("Some ingredients were not found with the provided IDs");
        }

        person.getFavoriteIngredients().clear();
        person.getFavoriteIngredients().addAll(ingredients);

        personRepository.save(person);
    }

    @Override
    public PersonProfileDTO getPersonProfileByUsername(String username,boolean isOwner) {
        Person person = personRepository.findByUsername(username).orElse(null);
        if (person == null) {
            return null;
        }
        Long recipeCount=recipeRepository.countByUserId(person.getPersonId());
        Long ratingCount = ratingService.getTotalRatingCountByUserId(person.getPersonId());
        Double averageRating = ratingService.getAverageRatingByUserId(person.getPersonId());

        return PersonMapper.toPersonProfileDTO(person, recipeCount, ratingCount, averageRating,isOwner);
    }

    @Override
    public PersonAuthInfoDTO GetAuthUserInfo(Long id) {
        Person person = personRepository.findById(id).orElse(null);
        return person != null ? PersonMapper.PersonToPersonAuthInfoDTO(person) : null;
    }
}

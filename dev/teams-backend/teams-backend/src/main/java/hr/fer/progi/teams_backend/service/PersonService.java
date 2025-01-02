package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.PersonAuthInfoDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonProfileDTO;

import java.util.List;

public interface PersonService {

    List<PersonDTO> listAll();

    PersonDTO fetchPerson(Long id);

    void deletePerson(Long id);

    Person updatePerson(Long id, Person person);

    Person createPerson(Person person);

    void addFavoriteIngredient(Long personId, Long ingredientId);

    void removeFavoriteIngredient(Long personId, Long ingredientId);

    PersonDTO findByEmail(String email);

    public Person getPerson(Long id);

    PersonProfileDTO getPersonProfileByUsername(String username);

    public PersonAuthInfoDTO GetAuthUserInfo(Long id);

    void addFavoriteIngredients(Long personId, List<Long> ingredientIds);
}

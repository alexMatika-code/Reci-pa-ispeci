package hr.fer.progi.teams_backend;

import hr.fer.progi.teams_backend.dao.IngredientRepository;
import hr.fer.progi.teams_backend.dao.PersonRepository;
import hr.fer.progi.teams_backend.domain.Ingredient;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.service.impl.PersonServiceJpa;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PersonServiceTests {

    @InjectMocks
    private PersonServiceJpa personService;

    @Mock
    private PersonRepository personRepository;

    @Mock
    private IngredientRepository ingredientRepository;

    @Test
    void addFavoriteIngredients_PersonNotFound() {
        Long personId = 1L;
        List<Long> ingredientIds = List.of(1L, 2L);

        when(personRepository.findById(personId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class,
                () -> personService.addFavoriteIngredients(personId, ingredientIds));

        assertEquals("Person not found with id: " + personId, exception.getMessage());
    }

    @Test
    void addFavoriteIngredients_IngredientNotFound() {
        Long personId = 1L;
        List<Long> ingredientIds = List.of(1L, 2L, 3L);

        Person mockPerson = new Person();
        mockPerson.setPersonId(personId);

        when(personRepository.findById(personId)).thenReturn(Optional.of(mockPerson));
        when(ingredientRepository.findAllById(ingredientIds)).thenReturn(List.of(new Ingredient(), new Ingredient()));

        Exception exception = assertThrows(RuntimeException.class,
                () -> personService.addFavoriteIngredients(personId, ingredientIds));

        assertEquals("Some ingredients were not found with the provided IDs", exception.getMessage());
    }

    @Test
    void addFavoriteIngredients_IngredientAlreadyAdded() {
        Long personId = 1L;
        List<Long> ingredientIds = List.of(1L);

        Person mockPerson = new Person();
        mockPerson.setPersonId(personId);

        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientId(1L);
        ingredient.setName("Salt");

        mockPerson.getFavoriteIngredients().add(ingredient);

        when(personRepository.findById(personId)).thenReturn(Optional.of(mockPerson));
        when(ingredientRepository.findAllById(ingredientIds)).thenReturn(List.of(ingredient));

        Exception exception = assertThrows(IllegalArgumentException.class,
                () -> personService.addFavoriteIngredients(personId, ingredientIds));

        assertEquals("Ingredient already added to favorites: Salt", exception.getMessage());
    }

    @Test
    void addFavoriteIngredients_SuccessfulAddition() {
        Long personId = 1L;
        List<Long> ingredientIds = List.of(1L, 2L);

        Person mockPerson = new Person();
        mockPerson.setPersonId(personId);

        Ingredient ingredient1 = new Ingredient();
        ingredient1.setIngredientId(1L);
        ingredient1.setName("Salt");

        Ingredient ingredient2 = new Ingredient();
        ingredient2.setIngredientId(2L);
        ingredient2.setName("Sugar");

        when(personRepository.findById(personId)).thenReturn(Optional.of(mockPerson));
        when(ingredientRepository.findAllById(ingredientIds)).thenReturn(List.of(ingredient1, ingredient2));
        when(personRepository.save(mockPerson)).thenReturn(mockPerson);

        personService.addFavoriteIngredients(personId, ingredientIds);

        assertTrue(mockPerson.getFavoriteIngredients().contains(ingredient1));
        assertTrue(mockPerson.getFavoriteIngredients().contains(ingredient2));
    }
}

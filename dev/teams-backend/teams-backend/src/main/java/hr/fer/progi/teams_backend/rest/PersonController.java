package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/people")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping
    public List<PersonDTO> getPeople() {
        return personService.listAll();
    }

    @GetMapping("/{id}")
    public PersonDTO getPerson(@PathVariable Long id) {
        return personService.fetchPerson(id);
    }

    @DeleteMapping("/{id}")
    public void deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
    }

    @PutMapping("/{id}")
    public Person updatePerson(@PathVariable Long id, @RequestBody Person person) {
        return personService.updatePerson(id, person);
    }

    @PostMapping("")
    public Person createPerson(@RequestBody Person person) {
        return personService.createPerson(person);
    }

    @PostMapping("/{personId}/favoriteIngredient/{ingredientId}")
    public ResponseEntity<?> addFavoriteIngredient(@PathVariable Long personId, @PathVariable Long ingredientId) {
        personService.addFavoriteIngredient(personId, ingredientId);
        return ResponseEntity.ok("Ingredient added to favorites.");
    }

    @DeleteMapping("/{personId}/favoriteIngredient/{ingredientId}")
    public ResponseEntity<?> removeFavoriteIngredient(@PathVariable Long personId, @PathVariable Long ingredientId) {
        personService.removeFavoriteIngredient(personId, ingredientId);
        return ResponseEntity.ok("Ingredient removed from favorites.");
    }

}

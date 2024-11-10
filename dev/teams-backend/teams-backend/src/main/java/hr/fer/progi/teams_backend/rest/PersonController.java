package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonProfileDTO;
import hr.fer.progi.teams_backend.service.PersonService;
import hr.fer.progi.teams_backend.service.RatingService;
import hr.fer.progi.teams_backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
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

    @PostMapping("/favoriteIngredient/{ingredientId}")
    public ResponseEntity<?> addFavoriteIngredient(@PathVariable Long ingredientId, Authentication authentication) {
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        PersonDTO person = personService.findByEmail(email);
        if (person != null) {
            personService.addFavoriteIngredient(person.getPersonId(), ingredientId);
            return ResponseEntity.ok("Ingredient added to favorites.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

    @DeleteMapping("favoriteIngredient/{ingredientId}")
    public ResponseEntity<?> removeFavoriteIngredient(@PathVariable Long ingredientId, Authentication authentication) {
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        PersonDTO person = personService.findByEmail(email);
        if (person != null) {
            personService.removeFavoriteIngredient(person.getPersonId(), ingredientId);
            return ResponseEntity.ok("Ingredient removed from favorites.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

    @GetMapping("/profile/{username}")
    public PersonProfileDTO getPersonProfile(@PathVariable String username) {
        return personService.getPersonProfileByUsername(username);
    }

    @GetMapping("/getAuth")
    public OAuth2User getAuth(@AuthenticationPrincipal OAuth2User authUser) {
        return authUser;
    }

    @GetMapping("/getAuthUser")
    public ResponseEntity<?> getAuthUser(Authentication authentication) {
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        PersonDTO person = personService.findByEmail(email);

        if (person != null) {
            PersonProfileDTO personProfile = personService.getPersonProfileByUsername(person.getUsername());
            return ResponseEntity.ok(personProfile);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }


}

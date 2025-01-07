package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.*;
import hr.fer.progi.teams_backend.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Profile;

import java.util.List;
import java.util.Objects;

@Profile({"form-security", "oauth-security"})
@Slf4j
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

    @PutMapping("/about")
    public void updatePerson(@RequestBody String about) {
        personService.updatePerson(about);
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

    @PostMapping("/favoriteIngredients")
    public ResponseEntity<?> addFavoriteIngredients(@RequestBody List<Long> ingredientIds, Authentication authentication) {
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        PersonDTO person = personService.findByEmail(email);
        if (person != null) {
            try {
                personService.addFavoriteIngredients(person.getPersonId(), ingredientIds);
                return ResponseEntity.ok("Ingredients added to favorites.");
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
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

    @PutMapping("/favoriteIngredients")
    public ResponseEntity<?> setFavoriteIngredients(@RequestBody List<Long> ingredientIds,
                                                    Authentication authentication) {
        String email = ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        PersonDTO person = personService.findByEmail(email);
        if (person != null) {
            try {
                personService.setFavoriteIngredients(person.getPersonId(), ingredientIds);
                return ResponseEntity.ok("Favorite ingredients updated.");
            } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

    @GetMapping("/profile/{username}")
    public PersonProfileDTO getPersonProfile(@PathVariable String username, Authentication authentication) {
        String usernameAuth = null;

        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User principal) {
            String email = principal.getAttribute("email");
            PersonDTO person = personService.findByEmail(email);
            if (person != null) {
                usernameAuth = person.getUsername();
            }
        }

        boolean isOwner = (usernameAuth != null && usernameAuth.equals(username));
        log.info("Fetching profile: loggedInUser={}, requestedProfile={}", usernameAuth, username);
        return personService.getPersonProfileByUsername(username,isOwner);
    }

    @GetMapping("/getAuth")
    public OAuth2User getAuth(@AuthenticationPrincipal OAuth2User authUser) {
        return authUser;
    }

    @GetMapping("/getAuthUser")
    public ResponseEntity<?> getAuthUser(@AuthenticationPrincipal User user) {
        log.info("GetAuthUser");
        log.info("Principal: {}", user.getUsername());
        String username = user.getUsername();
        PersonDTO person = personService.findByUsername(username);

        if (person != null) {
            PersonAuthInfoDTO personAuthInfo = personService.GetAuthUserInfo(person.getPersonId());
            return ResponseEntity.ok(personAuthInfo);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

    @GetMapping("/info")
    public List<PersonInfoDTO> getAllPeopleInfo() {
        return personService.listAllPersonInfo();
    }

    @PutMapping("/promote")
    public ResponseEntity<?> promotePerson(@RequestBody PromoteDemoteRequestDTO request) {
        Long personId = request.getPersonId();
        if (personId == null) {
            return ResponseEntity.badRequest().body("Invalid request. 'personId' is required.");
        }

        try {
            personService.promotePerson(personId);
            return ResponseEntity.ok("User with ID " + personId + " has been promoted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/demote")
    public ResponseEntity<?> demotePerson(@RequestBody PromoteDemoteRequestDTO request) {
        Long personId = request.getPersonId();
        if (personId == null) {
            return ResponseEntity.badRequest().body("Invalid request. 'personId' is required.");
        }

        try {
            personService.demotePerson(personId);
            return ResponseEntity.ok("User with ID " + personId + " has been demoted.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

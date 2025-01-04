package hr.fer.progi.teams_backend.domain.mapper;

import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Recipe;
import hr.fer.progi.teams_backend.domain.dto.PersonAuthInfoDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import hr.fer.progi.teams_backend.domain.dto.PersonProfileDTO;
import hr.fer.progi.teams_backend.service.RatingService;
import hr.fer.progi.teams_backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class PersonMapper {
    public static PersonDTO toDTO(Person person) {
        PersonDTO dto = new PersonDTO();
        dto.setPersonId(person.getPersonId());
        dto.setFirstName(person.getFirstName());
        dto.setLastName(person.getLastName());
        dto.setUsername(person.getUsername());
        dto.setEmail(person.getEmail());

        dto.setRecipes(person.getUserRecipes().stream()
                .map(RecipeMapper::toDTO)
                .collect(Collectors.toList()));

        dto.setRatings(person.getRatings().stream()
                .map(RatingMapper::toDTO)
                .collect(Collectors.toList()));

        dto.setFavoriteIngredients(person.getFavoriteIngredients().stream()
                .map(IngredientMapper::toDTO)
                .collect(Collectors.toSet()));
        return dto;
    }

    public static PersonProfileDTO toPersonProfileDTO(Person person, Long recipeCount, Long ratingCount, Double averageRating,boolean isOwner) {
        PersonProfileDTO dto = new PersonProfileDTO();
        dto.setPersonId(person.getPersonId());
        dto.setFirstName(person.getFirstName());
        dto.setLastName(person.getLastName());
        dto.setAbout(person.getAbout());
        dto.setUsername(person.getUsername());
        dto.setEmail(person.getEmail());
        dto.setImage(person.getImage());
        dto.setRole(person.getRole().getName().toString());

        // Set the data retrieved from services
        dto.setRecipeCount(recipeCount);
        dto.setRatingCount(ratingCount);
        dto.setRatingAverage(averageRating);

        if (isOwner) {
            dto.setRecipes(
                    person.getUserRecipes().stream()
                            .map(RecipeMapper::toDTO)
                            .collect(Collectors.toList())
            );
        } else {
            dto.setRecipes(
                    person.getUserRecipes().stream()
                            .filter(recipe -> recipe.isPublicity() && !recipe.isWaitingApproval())
                            .map(RecipeMapper::toDTO)
                            .collect(Collectors.toList())
            );
        }

        dto.setRatings(person.getRatings().stream()
                .map(RatingMapper::toDTO)
                .collect(Collectors.toList()));

        dto.setFavoriteIngredients(person.getFavoriteIngredients().stream()
                .map(IngredientMapper::toDTO)
                .collect(Collectors.toSet()));

        return dto;
    }

    public static PersonAuthInfoDTO PersonToPersonAuthInfoDTO(Person person) {
        PersonAuthInfoDTO dto = new PersonAuthInfoDTO();
        dto.setPersonId(person.getPersonId());
        dto.setFirstName(person.getFirstName());
        dto.setLastName(person.getLastName());
        dto.setUsername(person.getUsername());
        dto.setEmail(person.getEmail());
        dto.setImage(person.getImage());
        dto.setRole(person.getRole().getName().toString());

        return dto;
    }
}

package hr.fer.progi.teams_backend.domain.mapper;

import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.dto.PersonDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

        dto.setRecipes(person.getChefRecipes().stream()
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
}

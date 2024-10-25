package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Recipe {

    @Id
    @GeneratedValue
    private long id;

    private String ingredients;

    private String procedure;

    private String type;

    private String timeToCook;

    private String name;

    private double averageRating;

}

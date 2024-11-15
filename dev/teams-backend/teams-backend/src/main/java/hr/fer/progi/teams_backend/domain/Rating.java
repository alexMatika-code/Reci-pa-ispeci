package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "RATING")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long ratingId;

    protected int grade;
    protected String comment;

    @ManyToOne
    @JoinColumn(name = "personId")
    protected Person person;

    @ManyToOne
    @JoinColumn(name = "recipeId")
    protected Recipe recipe;
}

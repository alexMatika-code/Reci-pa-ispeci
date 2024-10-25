package hr.fer.progi.teams_backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Rating {
    @Id
    @GeneratedValue
    private long id;

    private String comment;

    private int rating;

    @OneToOne
    private Person person;

    @OneToOne
    private Recipe recipe;

    public void setId(Long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Person getUser() {
        return person;
    }

    public void setUser(Person user) {
        this.person = user;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}

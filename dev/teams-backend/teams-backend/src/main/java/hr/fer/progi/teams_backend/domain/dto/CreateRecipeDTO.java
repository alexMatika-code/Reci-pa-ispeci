package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CreateRecipeDTO {
    private String title;
    private String description;
    private int timeToCook;
    private String procedure;
    private boolean publicity;
    private MultipartFile image;
    private List<Long> ingredientIds;
}

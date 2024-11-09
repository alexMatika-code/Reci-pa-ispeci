package hr.fer.progi.teams_backend.rest;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.security.Principal;

@RestController
public class TestController {

    @GetMapping("/login")
    public RedirectView redirectToGoogleLogin() {
        return new RedirectView("/oauth2/authorization/google");
    }

    @GetMapping("/home")
    public String home() {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>Create Recipe</title>" +
                "</head>" +
                "<body>" +
                "<h1>Create Recipe</h1>" +
                "<form id='recipeForm' method='POST' action='http://localhost:8080/recipes/create' enctype='multipart/form-data'>" +
                "<label for='title'>Title:</label>" +
                "<input type='text' id='title' name='title' value='Chocolate Cake' required><br><br>" +

                "<label for='description'>Description:</label>" +
                "<textarea id='description' name='description' required>This is a rich and moist chocolate cake perfect for celebrations.</textarea><br><br>" +

                "<label for='timeToCook'>Time to Cook (minutes):</label>" +
                "<input type='number' id='timeToCook' name='timeToCook' value='45' required><br><br>" +

                "<label for='procedure'>Procedure:</label>" +
                "<textarea id='procedure' name='procedure' required>1. Preheat oven to 350°F (175°C).\n2. Mix flour, sugar, cocoa, baking soda, and salt.\n3. Add eggs, milk, oil, and vanilla.\n4. Pour into pans and bake for 30 minutes.</textarea><br><br>" +

                "<label for='publicity'>Publicity:</label>" +
                "<select id='publicity' name='publicity' required>" +
                "<option value='true' selected>Public</option>" +
                "<option value='false'>Private</option>" +
                "</select><br><br>" +

                "<label for='image'>Image:</label>" +
                "<input type='file' id='image' name='image' accept='image/*' required><br><br>" +

                "<label for='ingredientIds'>Ingredient IDs (comma-separated):</label>" +
                "<input type='text' id='ingredientIds' name='ingredientIds' value='26,27,28'><br><br>" +

                "<button type='submit'>Create Recipe</button>" +
                "</form>" +

                "<script>" +
                "document.getElementById('recipeForm').onsubmit = function() {" +
                "const ingredientIdsInput = document.getElementById('ingredientIds');" +
                "if (ingredientIdsInput.value) {" +
                "ingredientIdsInput.value = ingredientIdsInput.value.split(',').map(id => id.trim()).join(',');" +
                "}" +
                "};" +
                "</script>" +

                "</body>" +
                "</html>";
    }

}
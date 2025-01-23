package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.domain.dto.RecipeInfoDTO;
import hr.fer.progi.teams_backend.service.OpenAiService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import hr.fer.progi.teams_backend.service.RecipeService;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class OpenAiServiceJpa implements OpenAiService {

    private final RecipeService recipeService;

    public OpenAiServiceJpa(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @Value("${groq.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final List<JsonNode> conversationHistory = new ArrayList<>();



    @Override
    public String getChatbotResponse(String userMessage) throws IOException {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost post = new HttpPost("https://api.groq.com/openai/v1/chat/completions");

            if (conversationHistory.isEmpty()) {
                List<RecipeInfoDTO> publicRecipes = recipeService.listAllPublic();
                String recipeJSON = objectMapper.writeValueAsString(publicRecipes);

                conversationHistory.add(objectMapper.createObjectNode()
                        .put("role", "system")
                        .put("content", "You are a cooking-help providing virtual assistant." +
                                " You speak only in standard Croatian language and correctly use Croatian diacritics, which are limited to: 'č', 'ć', 'đ' and 'ž'." +
                                "You are never allowed to write '?' unless it is at the end of a sentence." +
                                " Respond in short sentences, unless you are providing the user with a recipe, then you are allowed to write longer answers." +
                                " You help users with finding the recipes which fit their wants, needs and cooking ability. " +
                                "Try to mostly suggest recipes from the following list, and when suggesting a recipe from the list to a user send them the link attached to the recipe: "
                                + recipeJSON + "If you are unable to find a fitting recipe in the list feel free to suggest a new one." +
                                "If you are sending links, send them at the end of the paragraph."));
            }

            conversationHistory.add(objectMapper.createObjectNode()
                    .put("role", "user")
                    .put("content", userMessage));

            String jsonRequest = objectMapper.createObjectNode()
                    .put("model", "llama-3.3-70b-versatile")
                    .set("messages", objectMapper.createArrayNode().addAll(conversationHistory))
                    .toString();

            post.setEntity(new StringEntity(jsonRequest));
            post.setHeader("Content-Type", "application/json");
            post.setHeader("Authorization", "Bearer " + apiKey);

            JsonNode response = objectMapper.readTree(client.execute(post).getEntity().getContent());

            if (response.has("choices") && response.get("choices").isArray() && response.get("choices").size() > 0) {
                String assistantResponse = response.get("choices").get(0).get("message").get("content").asText();
                conversationHistory.add(objectMapper.createObjectNode()
                        .put("role", "assistant")
                        .put("content", assistantResponse));
                System.out.println(assistantResponse);
                return assistantResponse;
            } else {
                throw new RuntimeException("Unexpected response format: " + response.toString());
            }
        }
    }
}

package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.service.OpenAiService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    @Value("${groq.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final List<JsonNode> conversationHistory = new ArrayList<>();

    @Override
    public String getChatbotResponse(String userMessage) throws IOException {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost post = new HttpPost("https://api.groq.com/openai/v1/chat/completions");

            if (conversationHistory.isEmpty()) {
                conversationHistory.add(objectMapper.createObjectNode()
                        .put("role", "system")
                        .put("content", "Ti si virtualni asistent koji piše na standardnom hrvatskom jeziku i specijaliziran si za pomoć korisnicima u pronalaženju recepata koji odgovaraju njihovim željama, preferencijama i razini kulinarskog znanja. Korisnicima pružaš kratke i jasne upute za pripremu jela, preporučuješ ideje za obroke i daješ korisne savjete za kuhanje. Uvijek koristi ispravne dijakretičke znakove."));
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

package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.liveChat.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message sendMessage(@Payload Message message) {

        return message;
    }
}

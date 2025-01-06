package hr.fer.progi.teams_backend.domain.dto;

import lombok.Data;

@Data
public class PersonInfoDTO {
    private Long personId;
    private String image;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String role;
}

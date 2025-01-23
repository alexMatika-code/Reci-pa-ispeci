package hr.fer.progi.teams_backend.domain.dto;

import hr.fer.progi.teams_backend.constants.Roles;
import lombok.Data;

@Data
public class RoleDTO {
    private Long roleId;
    private Roles name;
}
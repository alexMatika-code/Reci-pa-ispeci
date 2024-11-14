package hr.fer.progi.teams_backend.domain.dto;

import hr.fer.progi.teams_backend.constants.Roles;
import lombok.Data;

@Data
public class RoleDTO {
    private Long roleId;
    private Roles name;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Roles getName() {
        return name;
    }

    public void setName(Roles name) {
        this.name = name;
    }
}

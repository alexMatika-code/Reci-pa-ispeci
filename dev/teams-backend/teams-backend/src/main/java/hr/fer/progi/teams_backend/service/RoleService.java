package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Role;
import hr.fer.progi.teams_backend.domain.dto.RoleDTO;

import java.util.List;

public interface RoleService {
    List<RoleDTO> listAll();

    RoleDTO fetchRole(Long id);

    void deleteRole(Long id);

    Role updateRole(Long id, Role role);

    Role createRole(Role role);
}

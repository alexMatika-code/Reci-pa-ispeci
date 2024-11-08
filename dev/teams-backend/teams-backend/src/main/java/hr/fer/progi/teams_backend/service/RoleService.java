package hr.fer.progi.teams_backend.service;

import hr.fer.progi.teams_backend.domain.Role;
import java.util.List;

public interface RoleService {
    List<Role> listAll();

    Role fetchRole(Long id);

    void deleteRole(Long id);

    Role updateRole(Long id, Role role);

    Role createRole(Role role);
}

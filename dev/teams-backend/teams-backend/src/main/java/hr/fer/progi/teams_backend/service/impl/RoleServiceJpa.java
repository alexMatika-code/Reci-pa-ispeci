package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RoleRepository;
import hr.fer.progi.teams_backend.domain.Role;
import hr.fer.progi.teams_backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@Service
public class RoleServiceJpa implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> listAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role fetchRole(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Role updateRole(Long id, Role role) {
        Assert.notNull(role, "Role object must be given");

        Role updateRole = roleRepository.findById(id).orElse(null);
        Assert.notNull(updateRole, "Role by the ID of " + id + " does not exist");

        updateRole.setName(role.getName());

        return roleRepository.save(updateRole);
    }

    @Override
    public Role createRole(Role role) {
        Assert.notNull(role, "Role object must be given");
        return roleRepository.save(role);
    }
}

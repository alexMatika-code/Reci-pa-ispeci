package hr.fer.progi.teams_backend.service.impl;

import hr.fer.progi.teams_backend.dao.RoleRepository;
import hr.fer.progi.teams_backend.domain.Person;
import hr.fer.progi.teams_backend.domain.Role;
import hr.fer.progi.teams_backend.domain.dto.RoleDTO;
import hr.fer.progi.teams_backend.domain.mapper.PersonMapper;
import hr.fer.progi.teams_backend.domain.mapper.RoleMapper;
import hr.fer.progi.teams_backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceJpa implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<RoleDTO> listAll() {
        return roleRepository.findAll().stream()
                .map(RoleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RoleDTO fetchRole(Long id) {
        Role role = roleRepository.findById(id).orElse(null);
        return role != null ? RoleMapper.toDTO(role) : null;
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

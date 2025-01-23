package hr.fer.progi.teams_backend.rest;

import hr.fer.progi.teams_backend.domain.Role;
import hr.fer.progi.teams_backend.domain.dto.RoleDTO;
import hr.fer.progi.teams_backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping
    public List<RoleDTO> listAll() {
        return roleService.listAll();
    }

    @GetMapping("/{id}")
    public RoleDTO fetchRole(@PathVariable Long id) {
        return roleService.fetchRole(id);
    }

    @PostMapping
    public Role createRole(@RequestBody Role role) {
        return roleService.createRole(role);
    }

    @PutMapping("/{id}")
    public Role updateRole(@PathVariable Long id, @RequestBody Role role) {
        return roleService.updateRole(id, role);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
    }
}
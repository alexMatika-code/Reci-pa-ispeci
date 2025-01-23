package hr.fer.progi.teams_backend.domain.mapper;

import hr.fer.progi.teams_backend.domain.Role;
import hr.fer.progi.teams_backend.domain.dto.RoleDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleMapper {
    public static RoleDTO toDTO(Role role) {
        RoleDTO dto = new RoleDTO();
        dto.setRoleId(role.getRoleId());
        dto.setName(role.getName());
        return dto;
    }

}

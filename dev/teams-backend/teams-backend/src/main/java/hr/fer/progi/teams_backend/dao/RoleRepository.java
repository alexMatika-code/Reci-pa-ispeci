package hr.fer.progi.teams_backend.dao;

import hr.fer.progi.teams_backend.constants.Roles;
import hr.fer.progi.teams_backend.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(Roles roles);
}

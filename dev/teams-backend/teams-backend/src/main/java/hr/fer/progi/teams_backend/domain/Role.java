package hr.fer.progi.teams_backend.domain;

import hr.fer.progi.teams_backend.constants.Roles;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Data
@Entity
@Table(name = "ROLE")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long roleId;

    @Enumerated(EnumType.STRING)
    protected Roles name;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    protected List<Person> persons;
}
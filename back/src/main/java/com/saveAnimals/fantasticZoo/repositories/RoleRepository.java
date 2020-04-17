package com.saveAnimals.fantasticZoo.repositories;

import com.saveAnimals.fantasticZoo.models.ERole;
import com.saveAnimals.fantasticZoo.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}

package com.saveAnimals.animalShelter.repositories;

import com.saveAnimals.animalShelter.models.ERole;
import com.saveAnimals.animalShelter.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}

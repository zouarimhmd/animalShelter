package com.saveAnimals.fantasticZoo.repositories;

import com.saveAnimals.fantasticZoo.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findAll();

    Animal save(Animal animal);

    @Override
    Optional<Animal> findById(Long aLong);

    @Override
    void deleteById(Long aLong);
}

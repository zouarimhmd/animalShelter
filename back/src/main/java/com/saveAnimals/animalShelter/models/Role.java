package com.saveAnimals.animalShelter.models;

import javax.persistence.*;

@Entity
@Table(name = "role")
public class Role  {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "roleId", nullable = false)
    private Long roleId;

    private ERole name;

    public Role() {

    }

    public Role(ERole name) {
        this.name = name;
    }

    public Long getId() {
        return roleId;
    }

    public void setId(Long id) {
        this.roleId = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }



}
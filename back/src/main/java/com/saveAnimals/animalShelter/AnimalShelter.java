package com.saveAnimals.animalShelter;

import com.saveAnimals.animalShelter.services.FileService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;


@SpringBootApplication
public class AnimalShelter implements CommandLineRunner {

	@Resource
    FileService storageService;

	public static void main(String[] args) {
		SpringApplication.run(AnimalShelter.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
		storageService.init();
	}
}

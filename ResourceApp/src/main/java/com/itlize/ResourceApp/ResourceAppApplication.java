package com.itlize.resourceBackend.ResourceApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableAutoConfiguration
public class ResourceAppApplication {
	
	@RequestMapping("/")
	String home() {
		return "Hello world";
	}

	public static void main(String[] args) {
		SpringApplication.run(ResourceAppApplication.class, args);
	}

}

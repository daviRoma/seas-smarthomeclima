package it.univaq.disim.seas.smarthomeclima.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages={"it.univaq.disim.seas.smarthomeclima"})
@EntityScan("it.univaq.disim.seas.smarthomeclima.knowledgebase.domain")
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
    
}
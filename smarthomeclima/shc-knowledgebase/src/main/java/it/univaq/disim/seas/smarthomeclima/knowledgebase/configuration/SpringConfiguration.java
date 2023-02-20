package it.univaq.disim.seas.smarthomeclima.knowledgebase.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = {"it.univaq.disim.seas.smarthomeclima.knowledgebase.business.repositories"})
public class SpringConfiguration {

}

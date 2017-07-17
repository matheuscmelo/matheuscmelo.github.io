package si1.lab03.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import si1.lab03.entities.Serie;

public interface SerieRepository extends JpaRepository<Serie,Long> {

}

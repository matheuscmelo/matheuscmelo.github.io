package si1.lab03.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import si1.lab03.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

}

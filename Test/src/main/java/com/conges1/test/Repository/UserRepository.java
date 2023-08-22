package com.conges1.test.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.conges1.test.Enums.UserRole;
import com.conges1.test.Modeles.User;



public interface UserRepository extends JpaRepository<User,Long>{

    User findByRole(UserRole admin);
    Optional<User> findFirstByEmail(String email);


}

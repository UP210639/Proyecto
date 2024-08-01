package com.example.to_do_list.repository;
import com.example.to_do_list.models.*;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value="Select * from users where TRIM(LOWER(email)) = TRIM(LOWER(?1))", nativeQuery = true)
    Optional<User> findUserByEmail(String email);

}

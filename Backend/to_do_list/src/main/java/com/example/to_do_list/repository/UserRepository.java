package com.example.to_do_list.repository;
import com.example.to_do_list.models.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface UserRepository extends JpaRepository<User,String> {
    @Query(value="Select * from users where email = ?1", nativeQuery = true)
    List<User> findByEmail(Integer user);
}

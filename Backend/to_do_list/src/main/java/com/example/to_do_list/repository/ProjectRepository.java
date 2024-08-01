package com.example.to_do_list.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.Task;

public interface ProjectRepository extends JpaRepository<Project ,Integer> {
   @Query(value="Select * from projects where user_id = ?1", nativeQuery = true)
    List<Project> findByUserId(Integer userId);
}

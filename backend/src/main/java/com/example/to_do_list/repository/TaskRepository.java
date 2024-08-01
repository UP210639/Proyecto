package com.example.to_do_list.repository;
import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task,Integer> {
 @Query(value="Select * from tasks where project_id = ?1", nativeQuery = true)
    List<Task> findByProjectId(Integer projectId);

}

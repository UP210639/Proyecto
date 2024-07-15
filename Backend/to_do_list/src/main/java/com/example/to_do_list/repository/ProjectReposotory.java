package com.example.to_do_list.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Project;

public interface ProjectReposotory extends JpaRepository<Project ,Integer> {
   
   

}

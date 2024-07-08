package com.example.to_do_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.to_do_list.models.Project;

public interface ProjectReposotory extends JpaRepository<Project ,Integer> {

}

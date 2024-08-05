package com.example.to_do_list.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.repository.ProjectReposotory;

@Service
public class ProjectService {
    private final ProjectReposotory projectRepository  ;

    @Autowired
    public  ProjectService(ProjectReposotory projectRepository ){
        this.projectRepository =projectRepository;
    }

    
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }
    
}

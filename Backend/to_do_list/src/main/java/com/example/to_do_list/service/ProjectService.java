package com.example.to_do_list.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.User;
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
    
    public Project createProject(Project newProject){
        return projectRepository.save(newProject);
    }
    
    public Project getProjectByID(Integer id) {
        return projectRepository.findById(id).orElse(null);
    }

    public Project update(Integer id, Project projectDetails) {
        System.out.println(projectDetails.getName());

        return projectRepository.findById(id).map(project -> {
            project.setUser(projectDetails.getUser());
            project.setName(projectDetails.getName());
            project.setDescription(projectDetails.getDescription());
      //      project.setDateAdd(projectDetails.getDateAdd());
            return projectRepository.save(project);
        }).orElseGet(() -> {
            projectDetails.setId(id);
            return projectRepository.save(projectDetails);
        });
    }

    public void deleteProject(Integer id) {         
        projectRepository.deleteById(id);
    }
}

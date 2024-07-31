package com.example.to_do_list.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.dtos.ProjectDTO;
import com.example.to_do_list.models.Project;


import com.example.to_do_list.models.Task;
import com.example.to_do_list.models.User;
import com.example.to_do_list.service.ProjectService;
import com.example.to_do_list.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
//import jakarta.xml.bind.PropertyException;

@RestController
@RequestMapping("/project")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<ProjectDTO> getAllProjects() {
        return projectService.getProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Integer id) {
        ProjectDTO projectDTO = projectService.getProjectById(id);
        if (projectDTO != null) {
            return ResponseEntity.ok(projectDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ProjectDTO createProject(@RequestBody ProjectDTO projectDTO) {
        return projectService.createProject(projectDTO);
    }

    @GetMapping("/user/{id}")
    public List<ProjectDTO> getProjecctByUserID(@PathVariable Integer id) {
        return projectService.getProjectByUserId(id);
    }

    @GetMapping("/getByID/{id}")
    public ResponseEntity<ProjectDTO> getProjectId(@PathVariable Integer id) {
        ProjectDTO projectDTO = projectService.getProjectById(id);
        if (projectDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(projectDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Integer id, @RequestBody ProjectDTO projectDTO) {
        ProjectDTO updatedProject = projectService.updateProject(id, projectDTO);
        if (updatedProject != null) {
            return ResponseEntity.ok(updatedProject);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Integer id) {
        if (projectService.deleteProjecct(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
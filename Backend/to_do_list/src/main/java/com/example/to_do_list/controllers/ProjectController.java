package com.example.to_do_list.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.to_do_list.models.Project;
 
import com.example.to_do_list.service.ProjectService;
import com.example.to_do_list.service.TaskService;

//import jakarta.xml.bind.PropertyException;

@RestController
@RequestMapping("/project")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService=projectService;
    }

    @GetMapping({"/get"})
    public List<Project> getMethodName() {
         return projectService.getProjects();
    }

    @PostMapping({"/create"})
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project newProject = projectService.createProject(project);
        return ResponseEntity.ok(newProject);
    }

    //@PostMapping({"/create"})
    //@ResponseBody
    //public ResponseEntity<Project>  createCliente(@RequestBody  Project project) {
    //    System.out.println(project);
    //    
//
    //    return ResponseEntity.ok(project);
    //}
}

 
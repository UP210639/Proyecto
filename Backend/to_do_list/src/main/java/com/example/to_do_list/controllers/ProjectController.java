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

import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.Task;
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

    @GetMapping("/getByID/{id}")
    public ResponseEntity<Project> getProjectId(@PathVariable Integer id) {
        Project project = projectService.getProjectByID(id);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

    
    @PutMapping("/update/{id}")
    public ResponseEntity<Project> updatedProject(@PathVariable Integer id, @RequestBody Project projectDetails) {
        Project updatedProject = projectService.update(id, projectDetails);
        System.out.println(projectDetails.getName());
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePeoject(@PathVariable Integer id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
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

 
package com.example.to_do_list.controllers;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.models.User;
import com.example.to_do_list.service.ProjectService;
import com.example.to_do_list.service.TaskService;

@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<ProjectDTO> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getTaskById(@PathVariable Integer id) {
        TaskDTO projectDTO = projectService.getTaskById(id);
        if (projectDTO != null) {
            return ResponseEntity.ok(projectDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ProjectDTO createProject(@RequestBody projectDTO projectDTO) {
        return projectService.createTask(projectDTO);
    }

    @GetMapping("/user/{id}")
    public List<ProjectDTO> getProjecctByUserId(@PathVariable Integer id) {
        return projectService.getProjecctByUserId(id);
    }

    @GetMapping("/getByID/{id}")
    public ResponseEntity<Project> getProjectId(@PathVariable Integer id) {
        Project project = projectService.getProjectByID(id);
        if (project == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Integer id, @RequestBody PorjectDTO projectDTO) {
        TaskDTO updatedProject = projectService.updateProject(id, projectDTO);
        if (updatedProject != null) {
            return ResponseEntity.ok(updatedProject);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Integer id) {
        if (projectService.deleteProject(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
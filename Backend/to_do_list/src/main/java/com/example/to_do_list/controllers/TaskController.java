package com.example.to_do_list.controllers;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.service.TaskService;
import com.example.to_do_list.exception.ExcepcionRecursoNoEncontrado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public TaskDTO getTaskById(@PathVariable Integer id) throws ExcepcionRecursoNoEncontrado {
        return taskService.getTaskById(id);
    }

    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO) {
        return taskService.createTask(taskDTO);
    }

    @GetMapping("/project/{id}")
    public List<TaskDTO> getTasksByProjectId(@PathVariable Integer id) {
        return taskService.getTasksByProjectId(id);
    }
    
    @GetMapping("/getByID/{id}")
    public   TaskDTO  getidTask(@PathVariable Integer id ) throws ExcepcionRecursoNoEncontrado{
    return   taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Integer id, @RequestBody TaskDTO taskDTO) {
        TaskDTO updatedTask = taskService.updateTask(id, taskDTO);
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        if (taskService.deleteTask(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

package com.example.to_do_list.controllers;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.service.TaskService;

import jakarta.validation.Valid;

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
    public TaskDTO createTask(@RequestBody @Valid TaskDTO taskDTO) {
        return taskService.createTask(taskDTO);
    }

    @GetMapping("/project/{id}")
    public List<TaskDTO> getTasksByProjectId(@PathVariable Integer id) {
        return taskService.getTasksByProjectId(id);
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Integer id, @Valid @RequestBody TaskDTO taskDTO) throws ExcepcionRecursoNoEncontrado {
        System.out.println(taskDTO);
        TaskDTO updatedTask = taskService.updateTask(id, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        if (taskService.deleteTask(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

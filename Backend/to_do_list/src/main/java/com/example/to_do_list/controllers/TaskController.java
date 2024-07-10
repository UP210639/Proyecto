package com.example.to_do_list.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.to_do_list.models.Task;
import com.example.to_do_list.service.TaskService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/task")
public class TaskController {
    
    private final TaskService taskService;
    
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
 
    @GetMapping("/get")
    public List<Task> getAll() {
        return taskService.getTasks();
    }

   @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.update(id, taskDetails);
        System.out.println(taskDetails.getName());
        return ResponseEntity.ok(updatedTask);
    }
    

    @PostMapping("/create")
    public ResponseEntity<Task> postCreateTask(@RequestBody Task task) {
        Task newTask = taskService.creatTask(task);
        return ResponseEntity.ok(newTask);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
    

    
    
    


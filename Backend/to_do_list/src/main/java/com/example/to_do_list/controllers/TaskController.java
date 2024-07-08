package com.example.to_do_list.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.to_do_list.models.Task;
import com.example.to_do_list.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class TaskController {
    
    private final TaskService taskService;
    
    public TaskController(@Autowired TaskService taskService) {
        this.taskService = taskService;
    }
    
    @GetMapping({"/task/get"})
    public List<Task> getMethodName() {
         return taskService.getTasks();
    }

    
    
    
}

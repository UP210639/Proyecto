package com.example.to_do_list.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.to_do_list.models.Task;
import com.example.to_do_list.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    
    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

   
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

}

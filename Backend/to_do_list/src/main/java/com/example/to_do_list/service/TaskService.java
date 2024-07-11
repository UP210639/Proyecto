package com.example.to_do_list.service;

import java.util.List;
import java.util.Optional;

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

    public Task creatTask(Task newTask){
        return taskRepository.save(newTask);
    }

    public Task update(Integer id, Task taskDetails) {
        System.out.println(taskDetails.getName());

        return taskRepository.findById(id).map(task -> {
            task.setUser(taskDetails.getUser());
            task.setName(taskDetails.getName());
            task.setDescription(taskDetails.getDescription());
            task.setDateAdd(taskDetails.getDateAdd());
            task.setProject(taskDetails.getProject());
            task.setStatus(taskDetails.getStatus());
            return taskRepository.save(task);

        }).orElseGet(() -> {
            taskDetails.setId(id);
            return taskRepository.save(taskDetails);
        });
    }

    public void deleteTask(Integer id) {         
        taskRepository.deleteById(id);
    }

    public Task getTasksByID(Integer id) {
        return taskRepository.findById(id).orElse(null);
    }
}

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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

<<<<<<< Updated upstream
=======
    public Task getTasksByID(Integer id) {
        return taskRepository.findById(id).orElse(null);
    }

>>>>>>> Stashed changes
    public Task creatTask(Task newTask){
        return taskRepository.save(newTask);
    }

    public Task update(Integer id, Task taskDetails) {
<<<<<<< Updated upstream
        System.out.println(taskDetails.getName());

        return taskRepository.findById(id).map(task -> {
<<<<<<< Updated upstream
=======
           
=======
        return taskRepository.findById(id).map(task -> {
>>>>>>> Stashed changes
>>>>>>> Stashed changes
            task.setUser(taskDetails.getUser());
            task.setName(taskDetails.getName());
            task.setDescription(taskDetails.getDescription());
            task.setDateAdd(taskDetails.getDateAdd());
            task.setProject(taskDetails.getProject());
            task.setStatus(taskDetails.getStatus());
            return taskRepository.save(task);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        }).orElseGet(() -> {
            taskDetails.setId(id);
            return taskRepository.save(taskDetails);
        });
    }
<<<<<<< Updated upstream

    public void deleteTask(Integer id) {         
        taskRepository.deleteById(id);
    }

<<<<<<< Updated upstream
    public Task getTasksByID(Integer id) {
        return taskRepository.findById(id).orElse(null);
    }
=======
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}

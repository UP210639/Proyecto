package com.example.to_do_list.service;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.exception.ExcepcionRecursoNoEncontrado;
import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.models.User;
import com.example.to_do_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public TaskDTO getTaskById(Integer id) throws ExcepcionRecursoNoEncontrado {
        return taskRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Tarea con ID " + id + " no encontrada"));
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = convertToEntity(taskDTO);
        task = taskRepository.save(task);
        return convertToDTO(task);
    }

    public TaskDTO updateTask(Integer id, TaskDTO taskDTO) throws ExcepcionRecursoNoEncontrado {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Tarea con ID " + id + " no encontrada"));
    
        // Actualizar los campos de la tarea existente con los datos del DTO
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(Task.Status.valueOf(taskDTO.getStatus()));
        task.setDateAdd(taskDTO.getDateAdd());
        task.setUser(new User(taskDTO.getUserId()));
        task.setProject(new Project(taskDTO.getProjectId()));
        
        // Guardar los cambios en el repositorio
        task = taskRepository.save(task);
        
        // Convertir la entidad Task actualizada a DTO y devolverla
        return convertToDTO(task);
    }

    public boolean deleteTask(Integer id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<TaskDTO> getTasksByProjectId(Integer projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        return tasks.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setUserId(task.getUser().getId());
        taskDTO.setName(task.getName());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setStatus(task.getStatus().name());
        taskDTO.setDateAdd(task.getDateAdd());
        taskDTO.setProjectId(task.getProject().getId());
        return taskDTO;
    }

    private Task convertToEntity(TaskDTO taskDTO) {
        Task task = new Task();
        task.setId(taskDTO.getId());
        task.setUser(new User(taskDTO.getUserId()));
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(Task.Status.valueOf(taskDTO.getStatus()));
        task.setDateAdd(taskDTO.getDateAdd());
        task.setProject(new Project(taskDTO.getProjectId()));
        return task;
    }
}

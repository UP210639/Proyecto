package com.example.to_do_list.service;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.exception.ExcepcionRecursoNoEncontrado;
import com.example.to_do_list.mappers.TaskMapper;
import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.models.User;
import com.example.to_do_list.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskMapper taskMapper;

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                             .stream()
                             .map(taskMapper::toDTO)
                             .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(Integer id) throws ExcepcionRecursoNoEncontrado {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Tarea con ID " + id + " no encontrada"));
        return taskMapper.toDTO(task);
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDTO(task);
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
        return taskMapper.toDTO(task);
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
        return tasks.stream().map(taskMapper::toDTO).collect(Collectors.toList());
    }
}

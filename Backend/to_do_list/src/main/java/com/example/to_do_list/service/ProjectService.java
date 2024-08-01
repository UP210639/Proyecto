package com.example.to_do_list.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.to_do_list.dtos.ProjectDTO;
import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.exception.ExcepcionRecursoNoEncontrado;
import com.example.to_do_list.models.Project;

import com.example.to_do_list.models.Task;

import com.example.to_do_list.models.User;
import com.example.to_do_list.repository.ProjectReposotory;

@Service
public class ProjectService {

    @Autowired
    private ProjectReposotory projectRepository;

    public List<ProjectDTO> getProjects() {
        return projectRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Integer id) throws ExcepcionRecursoNoEncontrado {
         return projectRepository
         .findById(id)
         .map(this::convertToDTO) 
         .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Proyecto con ID " + id + " no encontrada"));
    }

    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Project project = convertToEntity(projectDTO);
        project = projectRepository.save(project);
        return convertToDTO(project);
    }

    public ProjectDTO updateProject(Integer id, ProjectDTO projectDTO) throws ExcepcionRecursoNoEncontrado {
        Project project  = projectRepository.findById(id) 
            .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Proyecto con ID " + id + " no encontrado"));
            
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setDateAdd(projectDTO.getDateAdd());
        project.setUser(new User(projectDTO.getUserId()));
        project = projectRepository.save(project);  
        return convertToDTO(project);
    }
    
    public boolean deleteProjecct(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ProjectDTO> getProjectByUserId(Integer userId) {
        List<Project> projects = projectRepository.findByUserId(userId);
        return projects.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO projectDTO  = new ProjectDTO();
        projectDTO.setId(project.getId());
        projectDTO.setUserId(project.getUser().getId());
        projectDTO.setName(project.getName());
        projectDTO.setDescription(project.getDescription());
        projectDTO.setDateAdd(project.getDateAdd());
        return projectDTO;
    }

    private Project convertToEntity(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setId(projectDTO.getId());
        project.setUser(new User(projectDTO.getUserId()));
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setDateAdd(projectDTO.getDateAdd());
        return project;
    }
}

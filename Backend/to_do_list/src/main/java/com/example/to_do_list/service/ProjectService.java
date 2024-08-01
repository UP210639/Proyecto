package com.example.to_do_list.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.to_do_list.dtos.ProjectDTO;
import com.example.to_do_list.exception.ExcepcionRecursoNoEncontrado;
import com.example.to_do_list.mappers.ProjectMapper;
import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.User;
import com.example.to_do_list.repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMapper projectMapper;

    public List<ProjectDTO> getProjects() {
        return projectRepository.findAll().stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Integer id) throws ExcepcionRecursoNoEncontrado {
        return projectRepository.findById(id)
                .map(projectMapper::toDTO)
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Proyecto con ID " + id + " no encontrado"));
    }

    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Project project = projectMapper.toEntity(projectDTO);
        project = projectRepository.save(project);
        return projectMapper.toDTO(project);
    }

    public ProjectDTO updateProject(Integer id, ProjectDTO projectDTO) throws ExcepcionRecursoNoEncontrado {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("Proyecto con ID " + id + " no encontrado"));

        // Actualizar los campos del proyecto existente con los datos del DTO
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setDateAdd(projectDTO.getDateAdd());
        project.setUser(new User(projectDTO.getUserId()));
        
        // Guardar los cambios en el repositorio
        project = projectRepository.save(project);
        
        return projectMapper.toDTO(project);
    }

    public boolean deleteProject(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ProjectDTO> getProjectsByUserId(Integer userId) {
        List<Project> projects = projectRepository.findByUserId(userId);
        return projects.stream()
                .map(projectMapper::toDTO)
                .collect(Collectors.toList());
    }
}

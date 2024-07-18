package com.example.to_do_list.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.to_do_list.dtos.ProjectDTO;
import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Project;

import com.example.to_do_list.models.Task;

import com.example.to_do_list.models.User;
import com.example.to_do_list.repository.ProjectReposotory;

@Service
public class ProjectService {

    @Autowired
    private ProjectReposotory projectRepository;

    public List<Project> getProjects() {
        return projectRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ProectDTO getProjectById(Integer id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.map(this::convertToDTO).orElse(null);
    }

    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Project project = convertToEntity(projectDTO);
        task = projectRepository.save(project);
        return convertToDTO(project);
    }

    public ProjectDTO updateProject(Integer id, ProjectDTO projectDTO) {
        Optional<Project> projectOptional = projectRepository.findById(id);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setName(projectDTO.getName());
            project.setDescription(projectDTO.getDescription());
            project.setDateAdd(projectDTO.getDateAdd());
            project.setUser(new User(projectkDTO.getUserId()));
            project = taskRepository.save(project);
            return convertToDTO(project);
        }
        return null;
    }

    public boolean deleteProjecct(Integer id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<ProjectDTO> getProjectByUserId(Integer userId) {
        List<Project> projects = projectRepository.findByProjectId(userId);
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

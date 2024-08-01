package com.example.to_do_list.mappers;

import com.example.to_do_list.dtos.ProjectDTO;
import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-01T11:35:29-0600",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.7.jar, environment: Java 20.0.1 (Oracle Corporation)"
)
@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Override
    public ProjectDTO toDTO(Project project) {
        if ( project == null ) {
            return null;
        }

        ProjectDTO projectDTO = new ProjectDTO();

        projectDTO.setUserId( projectUserId( project ) );
        projectDTO.setId( project.getId() );
        projectDTO.setName( project.getName() );
        projectDTO.setDescription( project.getDescription() );
        projectDTO.setDateAdd( project.getDateAdd() );

        return projectDTO;
    }

    @Override
    public Project toEntity(ProjectDTO projectDTO) {
        if ( projectDTO == null ) {
            return null;
        }

        Project project = new Project();

        project.setUser( projectDTOToUser( projectDTO ) );
        project.setId( projectDTO.getId() );
        project.setName( projectDTO.getName() );
        project.setDescription( projectDTO.getDescription() );
        project.setDateAdd( projectDTO.getDateAdd() );

        return project;
    }

    private Integer projectUserId(Project project) {
        if ( project == null ) {
            return null;
        }
        User user = project.getUser();
        if ( user == null ) {
            return null;
        }
        Integer id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected User projectDTOToUser(ProjectDTO projectDTO) {
        if ( projectDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( projectDTO.getUserId() );

        return user;
    }
}

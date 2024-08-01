package com.example.to_do_list.mappers;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Project;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.models.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-08-01T11:35:29-0600",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.7.jar, environment: Java 20.0.1 (Oracle Corporation)"
)
@Component
public class TaskMapperImpl implements TaskMapper {

    @Override
    public TaskDTO toDTO(Task task) {
        if ( task == null ) {
            return null;
        }

        TaskDTO taskDTO = new TaskDTO();

        taskDTO.setUserId( taskUserId( task ) );
        taskDTO.setProjectId( taskProjectId( task ) );
        taskDTO.setId( task.getId() );
        taskDTO.setName( task.getName() );
        taskDTO.setDescription( task.getDescription() );
        if ( task.getStatus() != null ) {
            taskDTO.setStatus( task.getStatus().name() );
        }
        taskDTO.setDateAdd( task.getDateAdd() );

        return taskDTO;
    }

    @Override
    public Task toEntity(TaskDTO taskDTO) {
        if ( taskDTO == null ) {
            return null;
        }

        Task task = new Task();

        task.setUser( taskDTOToUser( taskDTO ) );
        task.setProject( taskDTOToProject( taskDTO ) );
        task.setId( taskDTO.getId() );
        task.setName( taskDTO.getName() );
        task.setDescription( taskDTO.getDescription() );
        if ( taskDTO.getStatus() != null ) {
            task.setStatus( Enum.valueOf( Task.Status.class, taskDTO.getStatus() ) );
        }
        task.setDateAdd( taskDTO.getDateAdd() );

        return task;
    }

    private Integer taskUserId(Task task) {
        if ( task == null ) {
            return null;
        }
        User user = task.getUser();
        if ( user == null ) {
            return null;
        }
        Integer id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Integer taskProjectId(Task task) {
        if ( task == null ) {
            return null;
        }
        Project project = task.getProject();
        if ( project == null ) {
            return null;
        }
        Integer id = project.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected User taskDTOToUser(TaskDTO taskDTO) {
        if ( taskDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( taskDTO.getUserId() );

        return user;
    }

    protected Project taskDTOToProject(TaskDTO taskDTO) {
        if ( taskDTO == null ) {
            return null;
        }

        Project project = new Project();

        project.setId( taskDTO.getProjectId() );

        return project;
    }
}

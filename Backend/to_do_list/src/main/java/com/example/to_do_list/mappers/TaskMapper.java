package com.example.to_do_list.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.models.Task;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "project.id", target = "projectId")
    TaskDTO toDTO(Task task);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "projectId", target = "project.id")
    Task toEntity(TaskDTO taskDTO);
}

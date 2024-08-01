package com.example.to_do_list.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import com.example.to_do_list.dtos.ProjectDTO;
import com.example.to_do_list.models.Project;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);
    
    @Mapping(source = "user.id", target = "userId")
    ProjectDTO toDTO(Project project);

    @Mapping(source = "userId", target = "user.id")
    Project toEntity(ProjectDTO projectDTO);
}
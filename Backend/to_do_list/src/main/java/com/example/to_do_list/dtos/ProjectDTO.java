package com.example.to_do_list.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ProjectDTO {
    private Integer id;
    private String name;
    private String description;
    private LocalDateTime dateAdd;
    private Integer userId;
}
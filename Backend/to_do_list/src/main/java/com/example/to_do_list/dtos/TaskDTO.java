package com.example.to_do_list.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class TaskDTO {
    private Integer id;
    private Integer userId;
    private String name;
    private String description;
    private String status;
    private LocalDateTime dateAdd;
    private Integer projectId;
}
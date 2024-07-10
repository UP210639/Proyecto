package com.example.to_do_list.dtos;


import lombok.Data;
import java.time.LocalDateTime;

@Data
 
public class TaskUpdateDTO {
    private Integer userId;
    private String name;
    private String description;
    private LocalDateTime dateAdd;
    private Integer projectId;

     
}
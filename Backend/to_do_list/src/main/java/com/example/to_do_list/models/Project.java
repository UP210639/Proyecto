package com.example.to_do_list.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table (name ="projects")//tabla en la base de datos
public class Project {
    @Id
    @Column(name ="project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //id de tarea

    public String name ;
    public String description;

    @Column(name ="created_at")
    private LocalDateTime dateAdd;

    @Column(name = "user_id")
    private Integer user;


}

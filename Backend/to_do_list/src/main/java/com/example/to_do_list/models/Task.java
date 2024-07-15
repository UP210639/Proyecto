package com.example.to_do_list.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table (name ="tasks")//tabla en la base de datos
public class Task {
    @Id
    @Column(name = "task_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // id de tarea


    //@ManyToOne
    //@JoinColumn(name = "user_id")
    @Column(name = "user_id")
    private Integer user;
    //private User user;

    private String name;
    private String description;
    private String status;

    @Column(name = "created_at")
    private LocalDateTime dateAdd;

    //@ManyToOne
    //@JoinColumn(name = "project_id")
    @Column(name = "project_id")
    private Integer project;
   // private Project project; // Cambiado a Project

}

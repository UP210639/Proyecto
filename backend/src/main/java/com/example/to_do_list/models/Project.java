package com.example.to_do_list.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime dateAdd = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
 
    public Project() {
    }

    public Project(Integer id) {
        this.id = id;
    }
}

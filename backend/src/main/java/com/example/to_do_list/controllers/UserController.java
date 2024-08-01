package com.example.to_do_list.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.to_do_list.exception.ExcepcionRecursoNoEncontrado;
import com.example.to_do_list.models.User;
import com.example.to_do_list.service.UserService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
public class UserController {
    
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("valid/{email}")
    public User validUserByEmail(@RequestParam String email) throws ExcepcionRecursoNoEncontrado {
        User user = userService.getUserByEmail(email);
        return user;
    }
    



 
}

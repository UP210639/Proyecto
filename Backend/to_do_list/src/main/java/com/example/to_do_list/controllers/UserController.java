package com.example.to_do_list.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.to_do_list.models.User;
import com.example.to_do_list.service.UserService;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(@Autowired UserService userService ){
        this.userService =userService;
    }

    @GetMapping({"/get"})
    public List<User> getUsers(){
        return userService.getUsers();
    }
}

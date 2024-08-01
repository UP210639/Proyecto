package com.example.to_do_list.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.to_do_list.dtos.TaskDTO;
import com.example.to_do_list.exception.ExcepcionRecursoNoEncontrado;
import com.example.to_do_list.models.Task;
import com.example.to_do_list.models.User;
import com.example.to_do_list.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserByID(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) throws ExcepcionRecursoNoEncontrado {
        User user = userRepository.findUserByEmail(email)
            .orElseThrow(() -> new ExcepcionRecursoNoEncontrado("El usuario con el correo " + email + " no fue encontrado"));
        return user;
    }
}
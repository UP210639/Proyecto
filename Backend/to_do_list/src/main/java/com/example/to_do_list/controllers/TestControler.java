package com.example.to_do_list.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestControler {
     @GetMapping("/")
    public String saludo(){
        System.out.println("inicio:");

        return "Saca la mota";
    }

}

package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String email;
    private String name;
    private String membershipType;
    private String school;
    private String department;
    private String grade;
    private String desiredJob;
    private String techStack;
    private String message;

}
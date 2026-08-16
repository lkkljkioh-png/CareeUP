package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GraduateSearchResponse {

    private Long id;
    private String name;
    private String school;
    private String department;
    private String majorCategory;
    private String graduationYear;
    private String company;
    private String position;
    private String techStack;
    private String message;

}
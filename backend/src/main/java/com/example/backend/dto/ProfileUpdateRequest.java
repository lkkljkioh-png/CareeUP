package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {

    // 수정 전용 (아이디, 이름 등 기본 정보X)

    private String school;
    private String department;
    private String majorCategory;

    // 재학생
    private String grade;
    private String desiredJob;

    // 졸업생
    private String graduationYear;
    private String company;
    private String position;

    // 공통
    private String techStack;
    private String message;
}
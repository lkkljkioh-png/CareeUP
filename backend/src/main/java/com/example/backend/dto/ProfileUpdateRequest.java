package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {

    // 수정 전용 (이름, 아이디 등 기본 정보 입력X)
    private String school;

    private String department;

    private String grade;

    private String desiredJob;

    private String techStack;

    private String message;
}
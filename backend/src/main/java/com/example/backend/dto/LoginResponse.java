package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private String token;               // id 대신 토큰

    private String email;

    private String name;

    private String membershipType;      // 재학생/졸업생 회원 구분 추가
}
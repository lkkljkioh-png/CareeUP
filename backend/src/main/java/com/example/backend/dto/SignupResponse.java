package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupResponse {

    private Long id;          // 내부 PK

    private String userId;    // 로그인 아이디

    private String email;

    private String name;
}
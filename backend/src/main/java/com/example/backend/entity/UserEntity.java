package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class UserEntity {

    @Id                                                             // 기본 키(PK), 회원 번호, 자동 증가
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)                        // 반드시 입력, 중복 가입 불가
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;
}
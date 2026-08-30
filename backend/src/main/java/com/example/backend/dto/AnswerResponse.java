package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AnswerResponse {

    private Long id;

    private Long questionId;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Long userId;

    private String writerName;

    private String writerMembershipType;

    private String company;

    private String position;
}   
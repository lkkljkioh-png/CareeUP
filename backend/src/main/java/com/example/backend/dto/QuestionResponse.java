package com.example.backend.dto;

import com.example.backend.entity.QuestionCategory;
import com.example.backend.entity.QuestionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class QuestionResponse {

    private Long id;

    private String title;

    private String content;

    private QuestionCategory category;

    private QuestionStatus status;

    private Integer viewCount;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // 작성자 정보
    private Long userId;

    private String writerName;

    private String writerMembershipType;
}
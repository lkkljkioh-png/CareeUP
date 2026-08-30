package com.example.backend.dto;

import com.example.backend.entity.QuestionCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionUpdateRequest {

    private String title;

    private String content;

    private QuestionCategory category;
}
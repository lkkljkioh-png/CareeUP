package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.QuestionCreateRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.service.QuestionService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(
            QuestionService questionService
    ) {
        this.questionService = questionService;
    }


    // =========================
    // 질문 작성
    // POST /api/questions
    // =========================
    @PostMapping
    public ApiResponse<QuestionResponse> createQuestion(
            Authentication authentication,
            @RequestBody QuestionCreateRequest request
    ) {

        String email = authentication.getName();

        QuestionResponse response =
                questionService.createQuestion(
                        email,
                        request
                );

        return new ApiResponse<>(
                true,
                "질문이 등록되었습니다.",
                response
        );
    }


    // =========================
    // 질문 전체 조회
    // GET /api/questions
    // =========================
    @GetMapping
    public ApiResponse<List<QuestionResponse>> getQuestions() {

        List<QuestionResponse> questions =
                questionService.getQuestions();

        return new ApiResponse<>(
                true,
                "질문 목록 조회 성공",
                questions
        );
    }


    // =========================
    // 질문 상세 조회
    // GET /api/questions/{id}
    // =========================
    @GetMapping("/{id}")
    public ApiResponse<QuestionResponse> getQuestion(
            @PathVariable Long id
    ) {

        QuestionResponse question =
                questionService.getQuestion(id);

        return new ApiResponse<>(
                true,
                "질문 조회 성공",
                question
        );
    }
}
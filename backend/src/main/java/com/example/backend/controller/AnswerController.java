package com.example.backend.controller;

import com.example.backend.dto.AnswerCreateRequest;
import com.example.backend.dto.AnswerResponse;
import com.example.backend.dto.ApiResponse;
import com.example.backend.service.AnswerService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(
            AnswerService answerService
    ) {
        this.answerService = answerService;
    }


    // =========================
    // 답변 작성
    // POST /api/questions/{questionId}/answers
    // =========================
    @PostMapping("/api/questions/{questionId}/answers")
    public ApiResponse<AnswerResponse> createAnswer(
            @PathVariable Long questionId,
            Authentication authentication,
            @RequestBody AnswerCreateRequest request
    ) {

        String email = authentication.getName();

        AnswerResponse response =
                answerService.createAnswer(
                        questionId,
                        email,
                        request
                );

        return new ApiResponse<>(
                true,
                "답변이 등록되었습니다.",
                response
        );
    }


    // =========================
    // 답변 목록
    // GET /api/questions/{questionId}/answers
    // =========================
    @GetMapping("/api/questions/{questionId}/answers")
    public ApiResponse<List<AnswerResponse>> getAnswers(
            @PathVariable Long questionId
    ) {

        return new ApiResponse<>(
                true,
                "답변 조회 성공",
                answerService.getAnswers(questionId)
        );
    }


    // =========================
    // 답변 수정
    // PUT /api/answers/{answerId}
    // =========================
    @PutMapping("/api/answers/{answerId}")
    public ApiResponse<AnswerResponse> updateAnswer(
            @PathVariable Long answerId,
            Authentication authentication,
            @RequestBody AnswerCreateRequest request
    ) {

        String email = authentication.getName();

        return new ApiResponse<>(
                true,
                "답변이 수정되었습니다.",
                answerService.updateAnswer(
                        answerId,
                        email,
                        request
                )
        );
    }


    // =========================
    // 답변 삭제
    // DELETE /api/answers/{answerId}
    // =========================
    @DeleteMapping("/api/answers/{answerId}")
    public ApiResponse<Void> deleteAnswer(
            @PathVariable Long answerId,
            Authentication authentication
    ) {

        String email = authentication.getName();

        answerService.deleteAnswer(
                answerId,
                email
        );

        return new ApiResponse<>(
                true,
                "답변이 삭제되었습니다.",
                null
        );
    }
}
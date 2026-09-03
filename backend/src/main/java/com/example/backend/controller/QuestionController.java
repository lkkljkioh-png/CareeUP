package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.QuestionCreateRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.dto.QuestionUpdateRequest;
import com.example.backend.entity.QuestionCategory;
import com.example.backend.entity.QuestionStatus;
import com.example.backend.service.QuestionService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

        private final QuestionService questionService;

        public QuestionController(
                        QuestionService questionService) {
                this.questionService = questionService;
        }

        // =========================
        // 질문 작성
        // POST /api/questions
        // =========================
        @PostMapping
        public ApiResponse<QuestionResponse> createQuestion(
                        Authentication authentication,
                        @RequestBody QuestionCreateRequest request) {

                String email = authentication.getName();

                QuestionResponse response = questionService.createQuestion(
                                email,
                                request);

                return new ApiResponse<>(
                                true,
                                "질문이 등록되었습니다.",
                                response);
        }

        // =========================
        // 질문 전체 조회
        // GET /api/questions
        // =========================
        @GetMapping
        public ApiResponse<List<QuestionResponse>> getQuestions(

                        @RequestParam(required = false) QuestionCategory category,

                        @RequestParam(required = false) QuestionStatus status,

                        @RequestParam(required = false) String keyword) {

                List<QuestionResponse> questions = questionService.getQuestions(
                                category,
                                status,
                                keyword);

                return new ApiResponse<>(
                                true,
                                "질문 목록 조회 성공",
                                questions);
        }

        // =========================
        // 질문 상세 조회
        // GET /api/questions/{id}
        // =========================
        @GetMapping("/my")
        public ApiResponse<List<QuestionResponse>> getMyQuestions(
                        Authentication authentication) {

                String email = authentication.getName();

                List<QuestionResponse> questions = questionService.getMyQuestions(email);

                return new ApiResponse<>(
                                true,
                                "내 질문 조회 성공",
                                questions);
        }

        @GetMapping("/{id:[0-9]+}")
        public ApiResponse<QuestionResponse> getQuestion(
                        @PathVariable Long id) {

                QuestionResponse question = questionService.getQuestion(id);                

                return new ApiResponse<>(
                                true,
                                "질문 조회 성공",
                                question);
        }                        

        @PutMapping("/{id}")
        public ApiResponse<QuestionResponse> updateQuestion(
                        @PathVariable Long id,
                        Authentication authentication,
                        @RequestBody QuestionUpdateRequest request) {

                String email = authentication.getName();                

                QuestionResponse response = questionService.updateQuestion(
                                id,
                                email,
                                request);

                return new ApiResponse<>(        
                                true,
                                "질문이 수정되었습니다.",
                                response);
        }                        

        @DeleteMapping("/{id}")
        public ApiResponse<Void> deleteQuestion(
                        @PathVariable Long id,
                        Authentication authentication) {

                String email = authentication.getName();

                questionService.deleteQuestion(
                                id,
                                email);

                return new ApiResponse<>(
                                true,
                                "질문이 삭제되었습니다.",
                                null);
        }
}
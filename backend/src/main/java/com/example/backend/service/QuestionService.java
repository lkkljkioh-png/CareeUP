package com.example.backend.service;

import com.example.backend.dto.QuestionCreateRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.entity.QuestionEntity;
import com.example.backend.entity.QuestionStatus;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public QuestionService(
            QuestionRepository questionRepository,
            UserRepository userRepository
    ) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }


    // =========================
    // 질문 작성
    // =========================
    @Transactional
    public QuestionResponse createQuestion(
            String email,
            QuestionCreateRequest request
    ) {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("사용자를 찾을 수 없습니다.")
                );

        // 재학생만 질문 작성 가능
        if (!"student".equals(user.getMembershipType())) {
            throw new IllegalArgumentException("재학생만 질문을 작성할 수 있습니다.");
        }

        if (request.getTitle() == null ||
                request.getTitle().trim().isEmpty()) {

            throw new IllegalArgumentException("제목을 입력해주세요.");
        }

        if (request.getContent() == null ||
                request.getContent().trim().isEmpty()) {

            throw new IllegalArgumentException("내용을 입력해주세요.");
        }

        if (request.getCategory() == null) {
            throw new IllegalArgumentException("카테고리를 선택해주세요.");
        }

        QuestionEntity question = new QuestionEntity();

        question.setUser(user);
        question.setTitle(request.getTitle().trim());
        question.setContent(request.getContent().trim());
        question.setCategory(request.getCategory());
        question.setStatus(QuestionStatus.WAITING);
        question.setViewCount(0);

        QuestionEntity savedQuestion =
                questionRepository.save(question);

        return toResponse(savedQuestion);
    }


    // =========================
    // 질문 전체 조회
    // =========================
    @Transactional(readOnly = true)
    public List<QuestionResponse> getQuestions() {

        return questionRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================
    // 질문 상세 조회
    // =========================
    @Transactional
    public QuestionResponse getQuestion(Long questionId) {

        QuestionEntity question =
                questionRepository.findById(questionId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "질문을 찾을 수 없습니다."
                                )
                        );

        // 조회수 증가
        question.setViewCount(question.getViewCount() + 1);

        return toResponse(question);
    }


    // =========================
    // Entity -> Response DTO
    // =========================
    private QuestionResponse toResponse(
            QuestionEntity question
    ) {

        return new QuestionResponse(
                question.getId(),
                question.getTitle(),
                question.getContent(),
                question.getCategory(),
                question.getStatus(),
                question.getViewCount(),
                question.getCreatedAt(),
                question.getUpdatedAt(),

                question.getUser().getId(),
                question.getUser().getName(),
                question.getUser().getMembershipType()
        );
    }
}
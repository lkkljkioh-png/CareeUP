package com.example.backend.service;

import com.example.backend.dto.AnswerCreateRequest;
import com.example.backend.dto.AnswerResponse;
import com.example.backend.entity.AnswerEntity;
import com.example.backend.entity.QuestionEntity;
import com.example.backend.entity.QuestionStatus;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.AnswerRepository;
import com.example.backend.repository.QuestionRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public AnswerService(
            AnswerRepository answerRepository,
            QuestionRepository questionRepository,
            UserRepository userRepository
    ) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }


    // =========================
    // 답변 작성
    // =========================
    @Transactional
    public AnswerResponse createAnswer(
            Long questionId,
            String email,
            AnswerCreateRequest request
    ) {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("사용자를 찾을 수 없습니다.")
                );

        // 졸업생만 답변 가능
        if (!"graduate".equals(user.getMembershipType())) {
            throw new IllegalArgumentException(
                    "졸업생만 답변을 작성할 수 있습니다."
            );
        }

        QuestionEntity question = questionRepository.findById(questionId)
                .orElseThrow(() ->
                        new IllegalArgumentException("질문을 찾을 수 없습니다.")
                );

        if (request.getContent() == null ||
                request.getContent().trim().isEmpty()) {

            throw new IllegalArgumentException("답변 내용을 입력해주세요.");
        }

        AnswerEntity answer = new AnswerEntity();

        answer.setQuestion(question);
        answer.setUser(user);
        answer.setContent(request.getContent().trim());

        AnswerEntity savedAnswer =
                answerRepository.save(answer);

        // 질문 상태 변경
        question.setStatus(QuestionStatus.ANSWERED);

        return toResponse(savedAnswer);
    }


    // =========================
    // 특정 질문의 답변 조회
    // =========================
    @Transactional(readOnly = true)
    public List<AnswerResponse> getAnswers(
            Long questionId
    ) {

        // 질문 존재 여부 확인
        if (!questionRepository.existsById(questionId)) {
            throw new IllegalArgumentException(
                    "질문을 찾을 수 없습니다."
            );
        }

        return answerRepository
                .findByQuestionIdOrderByCreatedAtAsc(questionId)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // =========================
    // 답변 수정
    // =========================
    @Transactional
    public AnswerResponse updateAnswer(
            Long answerId,
            String email,
            AnswerCreateRequest request
    ) {

        AnswerEntity answer = answerRepository.findById(answerId)
                .orElseThrow(() ->
                        new IllegalArgumentException("답변을 찾을 수 없습니다.")
                );

        if (!answer.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException(
                    "본인이 작성한 답변만 수정할 수 있습니다."
            );
        }

        if (request.getContent() == null ||
                request.getContent().trim().isEmpty()) {

            throw new IllegalArgumentException("답변 내용을 입력해주세요.");
        }

        answer.setContent(request.getContent().trim());

        return toResponse(answer);
    }


    // =========================
    // 답변 삭제
    // =========================
    @Transactional
    public void deleteAnswer(
            Long answerId,
            String email
    ) {

        AnswerEntity answer = answerRepository.findById(answerId)
                .orElseThrow(() ->
                        new IllegalArgumentException("답변을 찾을 수 없습니다.")
                );

        if (!answer.getUser().getEmail().equals(email)) {
            throw new IllegalArgumentException(
                    "본인이 작성한 답변만 삭제할 수 있습니다."
            );
        }

        Long questionId = answer.getQuestion().getId();

        answerRepository.delete(answer);

        // DELETE SQL 먼저 반영
        answerRepository.flush();

        // 답변이 하나도 안 남았으면 WAITING
        if (!answerRepository.existsByQuestionId(questionId)) {

            QuestionEntity question =
                    questionRepository.findById(questionId)
                            .orElseThrow(() ->
                                    new IllegalArgumentException(
                                            "질문을 찾을 수 없습니다."
                                    )
                            );

            question.setStatus(QuestionStatus.WAITING);
        }
    }


    // =========================
    // Entity -> DTO
    // =========================
    private AnswerResponse toResponse(
            AnswerEntity answer
    ) {

        UserEntity user = answer.getUser();

        return new AnswerResponse(
                answer.getId(),
                answer.getQuestion().getId(),
                answer.getContent(),
                answer.getCreatedAt(),
                answer.getUpdatedAt(),

                user.getId(),
                user.getName(),
                user.getMembershipType(),
                user.getCompany(),
                user.getPosition()
        );
    }
}
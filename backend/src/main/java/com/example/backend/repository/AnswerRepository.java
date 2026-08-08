package com.example.backend.repository;

import com.example.backend.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Long> {

    // 특정 질문의 답변 목록
    List<AnswerEntity> findByQuestionIdOrderByCreatedAtAsc(Long questionId);

    // 특정 질문의 답변 개수
    long countByQuestionId(Long questionId);

    // 특정 질문에 답변이 있는지
    boolean existsByQuestionId(Long questionId);
}
package com.example.backend.repository;

import com.example.backend.entity.QuestionEntity;
import com.example.backend.entity.QuestionCategory;
import com.example.backend.entity.QuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {

    // 최신 질문부터 조회
    List<QuestionEntity> findAllByOrderByCreatedAtDesc();

    // 카테고리별 조회
    List<QuestionEntity> findByCategoryOrderByCreatedAtDesc(
            QuestionCategory category
    );

    // 상태별 조회
    List<QuestionEntity> findByStatusOrderByCreatedAtDesc(
            QuestionStatus status
    );

    // 카테고리 + 상태
    List<QuestionEntity> findByCategoryAndStatusOrderByCreatedAtDesc(
            QuestionCategory category,
            QuestionStatus status
    );

    // 제목 검색
    List<QuestionEntity> findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(
            String keyword
    );

    // 제목 또는 내용 검색
    List<QuestionEntity> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(
            String titleKeyword,
            String contentKeyword
    );
}
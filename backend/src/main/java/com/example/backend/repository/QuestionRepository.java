package com.example.backend.repository;

import com.example.backend.entity.QuestionEntity;
import com.example.backend.entity.QuestionCategory;
import com.example.backend.entity.QuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {

  // 최신 질문부터 조회
  List<QuestionEntity> findAllByOrderByCreatedAtDesc();

  // 카테고리별 조회
  List<QuestionEntity> findByCategoryOrderByCreatedAtDesc(
      QuestionCategory category);

  // 상태별 조회
  List<QuestionEntity> findByStatusOrderByCreatedAtDesc(
      QuestionStatus status);

  // 카테고리 + 상태
  List<QuestionEntity> findByCategoryAndStatusOrderByCreatedAtDesc(
      QuestionCategory category,
      QuestionStatus status);

  // 제목 검색
  List<QuestionEntity> findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(
      String keyword);

  // 제목 또는 내용 검색
  List<QuestionEntity> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrderByCreatedAtDesc(
      String titleKeyword,
      String contentKeyword);

  @Query("""
      SELECT q
      FROM QuestionEntity q
      WHERE (:category IS NULL OR q.category = :category)
        AND (:status IS NULL OR q.status = :status)
        AND (
               :keyword IS NULL
               OR LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(q.content) LIKE LOWER(CONCAT('%', :keyword, '%'))
            )
      ORDER BY q.createdAt DESC
      """)
  List<QuestionEntity> searchQuestions(
      @Param("category") QuestionCategory category,
      @Param("status") QuestionStatus status,
      @Param("keyword") String keyword);

  // 로그인 사용자의 질문 조회
  List<QuestionEntity> findByUserIdOrderByCreatedAtDesc(Long userId);
}
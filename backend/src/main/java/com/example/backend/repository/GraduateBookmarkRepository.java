package com.example.backend.repository;

import com.example.backend.entity.GraduateBookmarkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GraduateBookmarkRepository
        extends JpaRepository<GraduateBookmarkEntity, Long> {

    List<GraduateBookmarkEntity> findByStudentIdOrderByIdDesc(
            Long studentId);

    Optional<GraduateBookmarkEntity> findByStudentIdAndGraduateId(
            Long studentId,
            Long graduateId);

    boolean existsByStudentIdAndGraduateId(
            Long studentId,
            Long graduateId);
}
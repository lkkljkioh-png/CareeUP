package com.example.backend.repository;

import com.example.backend.entity.StudentActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentActivityRepository
        extends JpaRepository<StudentActivityEntity, Long> {

    List<StudentActivityEntity> findByUserId(Long userId);

    long countByUserId(Long userId);

    Optional<StudentActivityEntity> findByIdAndUserId(
            Long id,
            Long userId);
}
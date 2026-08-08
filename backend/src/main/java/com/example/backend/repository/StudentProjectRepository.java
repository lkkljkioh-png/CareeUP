package com.example.backend.repository;

import com.example.backend.entity.StudentProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentProjectRepository
        extends JpaRepository<StudentProjectEntity, Long> {

    List<StudentProjectEntity> findByUserId(Long userId);

    Optional<StudentProjectEntity> findByIdAndUserId(
            Long id,
            Long userId
    );
}
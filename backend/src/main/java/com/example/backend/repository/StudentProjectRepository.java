package com.example.backend.repository;

import com.example.backend.entity.StudentProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentProjectRepository
        extends JpaRepository<StudentProjectEntity, Long> {

    List<StudentProjectEntity> findByUserId(Long userId);
}
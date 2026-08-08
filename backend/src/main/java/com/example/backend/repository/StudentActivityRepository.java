package com.example.backend.repository;

import com.example.backend.entity.StudentActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentActivityRepository
        extends JpaRepository<StudentActivityEntity, Long> {

    List<StudentActivityEntity> findByUserId(Long userId);
}
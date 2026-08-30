package com.example.backend.repository;

import com.example.backend.entity.GraduateProfileViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface GraduateProfileViewRepository
        extends JpaRepository<GraduateProfileViewEntity, Long> {

    long countByGraduateId(Long graduateId);

    long countByGraduateIdAndViewedAtAfter(
            Long graduateId,
            LocalDateTime viewedAt
    );
}
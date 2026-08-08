package com.example.backend.repository;

import com.example.backend.entity.GraduateExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GraduateExperienceRepository
        extends JpaRepository<GraduateExperienceEntity, Long> {

    List<GraduateExperienceEntity> findByUserId(Long userId);
}
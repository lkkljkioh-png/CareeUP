package com.example.backend.repository;

import com.example.backend.entity.GraduateExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GraduateExperienceRepository
                extends JpaRepository<GraduateExperienceEntity, Long> {

        List<GraduateExperienceEntity> findByUserId(Long userId);

        long countByUserId(Long userId);

        Optional<GraduateExperienceEntity> findByIdAndUserId(
                        Long id,
                        Long userId);
}
package com.example.backend.repository;

import com.example.backend.entity.GraduateActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GraduateActivityRepository
        extends JpaRepository<GraduateActivityEntity, Long> {

    List<GraduateActivityEntity> findByUserId(Long userId);

    Optional<GraduateActivityEntity> findByIdAndUserId(
            Long id,
            Long userId);
}
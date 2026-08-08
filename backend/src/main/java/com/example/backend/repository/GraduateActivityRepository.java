package com.example.backend.repository;

import com.example.backend.entity.GraduateActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GraduateActivityRepository
        extends JpaRepository<GraduateActivityEntity, Long> {

    List<GraduateActivityEntity> findByUserId(Long userId);
}
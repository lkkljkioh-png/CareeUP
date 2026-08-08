package com.example.backend.repository;

import com.example.backend.entity.GraduateCertificateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GraduateCertificateRepository
        extends JpaRepository<GraduateCertificateEntity, Long> {

    List<GraduateCertificateEntity> findByUserId(Long userId);
}
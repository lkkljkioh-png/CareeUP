package com.example.backend.repository;

import com.example.backend.entity.StudentCertificateEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentCertificateRepository
        extends JpaRepository<StudentCertificateEntity, Long> {

    List<StudentCertificateEntity> findByUserId(Long userId);

    Optional<StudentCertificateEntity> findByIdAndUserId(
            Long id,
            Long userId);
}

package com.example.backend.service;

import com.example.backend.entity.StudentActivityEntity;
import com.example.backend.entity.StudentCertificateEntity;
import com.example.backend.entity.StudentProjectEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.StudentActivityRepository;
import com.example.backend.repository.StudentCertificateRepository;
import com.example.backend.repository.StudentProjectRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentProfileService {

    private final UserRepository userRepository;
    private final StudentProjectRepository projectRepository;
    private final StudentCertificateRepository certificateRepository;
    private final StudentActivityRepository activityRepository;

    public StudentProfileService(
            UserRepository userRepository,
            StudentProjectRepository projectRepository,
            StudentCertificateRepository certificateRepository,
            StudentActivityRepository activityRepository) {

        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.certificateRepository = certificateRepository;
        this.activityRepository = activityRepository;
    }

    public UserEntity getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    public List<StudentProjectEntity> getProjects(Long userId) {

        return projectRepository.findByUserId(userId);
    }

    public List<StudentCertificateEntity> getCertificates(Long userId) {

        return certificateRepository.findByUserId(userId);
    }

    public List<StudentActivityEntity> getActivities(Long userId) {

        return activityRepository.findByUserId(userId);
    }
}
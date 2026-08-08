package com.example.backend.service;

import com.example.backend.entity.GraduateActivityEntity;
import com.example.backend.entity.GraduateCertificateEntity;
import com.example.backend.entity.GraduateExperienceEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.GraduateActivityRepository;
import com.example.backend.repository.GraduateCertificateRepository;
import com.example.backend.repository.GraduateExperienceRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GraduateProfileService {

    private final UserRepository userRepository;
    private final GraduateExperienceRepository experienceRepository;
    private final GraduateCertificateRepository certificateRepository;
    private final GraduateActivityRepository activityRepository;

    public GraduateProfileService(
            UserRepository userRepository,
            GraduateExperienceRepository experienceRepository,
            GraduateCertificateRepository certificateRepository,
            GraduateActivityRepository activityRepository) {

        this.userRepository = userRepository;
        this.experienceRepository = experienceRepository;
        this.certificateRepository = certificateRepository;
        this.activityRepository = activityRepository;
        }

    public UserEntity getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    public List<GraduateExperienceEntity> getExperiences(Long userId) {

        return experienceRepository.findByUserId(userId);
    }

    public List<GraduateCertificateEntity> getCertificates(Long userId) {

        return certificateRepository.findByUserId(userId);
    }

    public List<GraduateActivityEntity> getActivities(Long userId) {

        return activityRepository.findByUserId(userId);
    }
}
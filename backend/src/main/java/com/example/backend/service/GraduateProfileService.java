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

    // 추가
    public void addExperience(Long userId, String experienceName) {

        GraduateExperienceEntity experience = new GraduateExperienceEntity();

        experience.setUserId(userId);
        experience.setExperienceName(experienceName);

        experienceRepository.save(experience);
    }

    public void addCertificate(Long userId, String certificateName) {

        GraduateCertificateEntity certificate = new GraduateCertificateEntity();

        certificate.setUserId(userId);
        certificate.setCertificateName(certificateName);

        certificateRepository.save(certificate);
    }

    public void addActivity(Long userId, String activityName) {

        GraduateActivityEntity activity = new GraduateActivityEntity();

        activity.setUserId(userId);
        activity.setActivityName(activityName);

        activityRepository.save(activity);
    }

    // 삭제
    public void deleteExperience(Long userId, Long experienceId) {

        GraduateExperienceEntity experience = experienceRepository.findByIdAndUserId(experienceId, userId)
                .orElseThrow(() -> new IllegalArgumentException("경력을 찾을 수 없습니다."));

        experienceRepository.delete(experience);
    }

    public void deleteCertificate(Long userId, Long certificateId) {

        GraduateCertificateEntity certificate = certificateRepository.findByIdAndUserId(certificateId, userId)
                .orElseThrow(() -> new IllegalArgumentException("자격증을 찾을 수 없습니다."));

        certificateRepository.delete(certificate);
    }

    public void deleteActivity(Long userId, Long activityId) {

        GraduateActivityEntity activity = activityRepository.findByIdAndUserId(activityId, userId)
                .orElseThrow(() -> new IllegalArgumentException("대외활동을 찾을 수 없습니다."));

        activityRepository.delete(activity);
    }

    public UserEntity getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
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
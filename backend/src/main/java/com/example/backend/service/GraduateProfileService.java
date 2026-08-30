package com.example.backend.service;

import com.example.backend.dto.GraduateProfileStatsResponse;
import com.example.backend.entity.GraduateActivityEntity;
import com.example.backend.entity.GraduateCertificateEntity;
import com.example.backend.entity.GraduateExperienceEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.GraduateActivityRepository;
import com.example.backend.repository.GraduateBookmarkRepository;
import com.example.backend.repository.GraduateCertificateRepository;
import com.example.backend.repository.GraduateExperienceRepository;
import com.example.backend.repository.GraduateProfileViewRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GraduateProfileService {

    private final UserRepository userRepository;
    private final GraduateExperienceRepository experienceRepository;
    private final GraduateCertificateRepository certificateRepository;
    private final GraduateActivityRepository activityRepository;
    private final GraduateProfileViewRepository graduateProfileViewRepository;
    private final GraduateBookmarkRepository graduateBookmarkRepository;

    public GraduateProfileService(
            UserRepository userRepository,
            GraduateExperienceRepository experienceRepository,
            GraduateCertificateRepository certificateRepository,
            GraduateActivityRepository activityRepository,
            GraduateProfileViewRepository graduateProfileViewRepository,
            GraduateBookmarkRepository graduateBookmarkRepository) {

        this.userRepository = userRepository;
        this.experienceRepository = experienceRepository;
        this.certificateRepository = certificateRepository;
        this.activityRepository = activityRepository;
        this.graduateProfileViewRepository = graduateProfileViewRepository;
        this.graduateBookmarkRepository = graduateBookmarkRepository;
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

    // 특정 졸업생인지 확인
    public UserEntity getGraduateById(Long userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!"graduate".equals(user.getMembershipType())) {
            throw new IllegalArgumentException("졸업생이 아닙니다.");
        }

        return user;
    }

    // 프로필 통계 조회
    public GraduateProfileStatsResponse getStats(Long userId) {

        long viewCount = graduateProfileViewRepository.countByGraduateId(userId);

        long bookmarkCount = graduateBookmarkRepository.countByGraduateId(userId);

        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        long weeklyViewCount = graduateProfileViewRepository
                .countByGraduateIdAndViewedAtAfter(
                        userId,
                        sevenDaysAgo);

        return new GraduateProfileStatsResponse(
                viewCount,
                bookmarkCount,
                weeklyViewCount);
    }
}
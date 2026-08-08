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

    // 추가 기능
    public void addProject(Long userId, String projectName) {

        StudentProjectEntity project = new StudentProjectEntity();

        project.setUserId(userId);
        project.setProjectName(projectName);

        projectRepository.save(project);
    }

    public void addCertificate(Long userId, String certificateName) {

        StudentCertificateEntity certificate = new StudentCertificateEntity();

        certificate.setUserId(userId);
        certificate.setCertificateName(certificateName);

        certificateRepository.save(certificate);
    }

    public void addActivity(Long userId, String activityName) {

        StudentActivityEntity activity = new StudentActivityEntity();

        activity.setUserId(userId);
        activity.setActivityName(activityName);

        activityRepository.save(activity);
    }

    // 삭제 기능
    public void deleteProject(Long userId, Long projectId) {

        StudentProjectEntity project = projectRepository.findByIdAndUserId(projectId, userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "프로젝트를 찾을 수 없습니다."));

        projectRepository.delete(project);
    }

    public void deleteCertificate(Long userId, Long certificateId) {

        StudentCertificateEntity certificate = certificateRepository.findByIdAndUserId(certificateId, userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "자격증을 찾을 수 없습니다."));

        certificateRepository.delete(certificate);
    }

    public void deleteActivity(Long userId, Long activityId) {

        StudentActivityEntity activity = activityRepository.findByIdAndUserId(activityId, userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "대외활동을 찾을 수 없습니다."));

        activityRepository.delete(activity);
    }

    public UserEntity getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
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
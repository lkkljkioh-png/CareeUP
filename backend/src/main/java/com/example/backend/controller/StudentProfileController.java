package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.entity.StudentActivityEntity;
import com.example.backend.entity.StudentCertificateEntity;
import com.example.backend.entity.StudentProjectEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.service.StudentProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/student-profile")
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    public StudentProfileController(
            StudentProfileService studentProfileService) {
        this.studentProfileService = studentProfileService;
    }

    @GetMapping
    public ApiResponse<Map<String, Object>> getStudentProfile(
            Authentication authentication) {

        UserEntity user = studentProfileService.getUser(authentication.getName());

        Long userId = user.getId();

        List<StudentProjectEntity> projects = studentProfileService.getProjects(userId);

        List<StudentCertificateEntity> certificates = studentProfileService.getCertificates(userId);

        List<StudentActivityEntity> activities = studentProfileService.getActivities(userId);

        Map<String, Object> data = new HashMap<>();

        data.put("projects", projects);
        data.put("certificates", certificates);
        data.put("activities", activities);

        return new ApiResponse<>(
                true,
                "재학생 프로필 조회 성공",
                data);
    }

    // 추가 API
    @PostMapping("/projects")
    public ApiResponse<Void> addProject(
            Authentication authentication,
            @RequestBody Map<String, String> request) {

        UserEntity user = studentProfileService.getUser(authentication.getName());

        String projectName = request.get("projectName");

        studentProfileService.addProject(
                user.getId(),
                projectName);

        return new ApiResponse<>(
                true,
                "프로젝트가 추가되었습니다.",
                null);
    }

    @PostMapping("/certificates")
    public ApiResponse<Void> addCertificate(
            Authentication authentication,
            @RequestBody Map<String, String> request) {

        UserEntity user = studentProfileService.getUser(authentication.getName());

        String certificateName = request.get("certificateName");

        studentProfileService.addCertificate(
                user.getId(),
                certificateName);

        return new ApiResponse<>(
                true,
                "자격증이 추가되었습니다.",
                null);
    }

    @PostMapping("/activities")
    public ApiResponse<Void> addActivity(
            Authentication authentication,
            @RequestBody Map<String, String> request) {

        UserEntity user = studentProfileService.getUser(authentication.getName());

        String activityName = request.get("activityName");

        studentProfileService.addActivity(
                user.getId(),
                activityName);

        return new ApiResponse<>(
                true,
                "대외활동이 추가되었습니다.",
                null);
    }

    // 삭제 API
    @DeleteMapping("/projects/{projectId}")
    public ApiResponse<Void> deleteProject(
            Authentication authentication,
            @PathVariable("projectId") Long projectId) {

        UserEntity user = studentProfileService.getUser(authentication.getName());

        studentProfileService.deleteProject(
                user.getId(),
                projectId);

        return new ApiResponse<>(
                true,
                "프로젝트가 삭제되었습니다.",
                null);
    }

    @DeleteMapping("/certificates/{certificateId}")
    public ApiResponse<Void> deleteCertificate(
            Authentication authentication,
            @PathVariable("certificateId") Long certificateId) {

        UserEntity user = studentProfileService.getUser(authentication.getName());

        studentProfileService.deleteCertificate(
                user.getId(),
                certificateId);

        return new ApiResponse<>(
                true,
                "자격증이 삭제되었습니다.",
                null);
    }

    @DeleteMapping("/activities/{activityId}")
    public ApiResponse<Void> deleteActivity(
            Authentication authentication,
            @PathVariable("activityId") Long activityId) {

        UserEntity user = studentProfileService.getUser(authentication.getName());

        studentProfileService.deleteActivity(
                user.getId(),
                activityId);

        return new ApiResponse<>(
                true,
                "대외활동이 삭제되었습니다.",
                null);
    }
}
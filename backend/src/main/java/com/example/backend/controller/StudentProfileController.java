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

        UserEntity user =
                studentProfileService.getUser(authentication.getName());

        Long userId = user.getId();

        List<StudentProjectEntity> projects =
                studentProfileService.getProjects(userId);

        List<StudentCertificateEntity> certificates =
                studentProfileService.getCertificates(userId);

        List<StudentActivityEntity> activities =
                studentProfileService.getActivities(userId);

        Map<String, Object> data = new HashMap<>();

        data.put("projects", projects);
        data.put("certificates", certificates);
        data.put("activities", activities);

        return new ApiResponse<>(
                true,
                "재학생 프로필 조회 성공",
                data
        );
    }
}
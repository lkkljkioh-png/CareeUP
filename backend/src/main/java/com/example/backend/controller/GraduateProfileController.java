package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.entity.GraduateActivityEntity;
import com.example.backend.entity.GraduateCertificateEntity;
import com.example.backend.entity.GraduateExperienceEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.service.GraduateProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/graduate-profile")
public class GraduateProfileController {

    private final GraduateProfileService graduateProfileService;

    public GraduateProfileController(
            GraduateProfileService graduateProfileService) {
        this.graduateProfileService = graduateProfileService;
    }

    @GetMapping
    public ApiResponse<Map<String, Object>> getGraduateProfile(
            Authentication authentication) {

        UserEntity user =
                graduateProfileService.getUser(authentication.getName());

        Long userId = user.getId();

        List<GraduateExperienceEntity> experiences =
                graduateProfileService.getExperiences(userId);

        List<GraduateCertificateEntity> certificates =
                graduateProfileService.getCertificates(userId);

        List<GraduateActivityEntity> activities =
                graduateProfileService.getActivities(userId);

        Map<String, Object> data = new HashMap<>();

        data.put("experiences", experiences);
        data.put("certificates", certificates);
        data.put("activities", activities);

        return new ApiResponse<>(
                true,
                "졸업생 프로필 조회 성공",
                data
        );
    }
}
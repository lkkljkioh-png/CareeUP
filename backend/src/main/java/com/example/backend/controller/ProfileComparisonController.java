package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.ProfileComparisonResponse;
import com.example.backend.service.ProfileComparisonService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile-comparisons")
public class ProfileComparisonController {

    private final ProfileComparisonService profileComparisonService;

    public ProfileComparisonController(
            ProfileComparisonService profileComparisonService) {

        this.profileComparisonService = profileComparisonService;
    }

    @GetMapping("/graduates/{graduateId}")
    public ApiResponse<ProfileComparisonResponse> compareGraduateProfile(
            Authentication authentication,
            @PathVariable("graduateId") Long graduateId) {

        ProfileComparisonResponse response = profileComparisonService.compare(
                authentication.getName(),
                graduateId);

        return new ApiResponse<>(
                true,
                "프로필 비교 성공",
                response);
    }
}
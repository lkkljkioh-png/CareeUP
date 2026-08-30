package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.entity.GraduateActivityEntity;
import com.example.backend.entity.GraduateCertificateEntity;
import com.example.backend.entity.GraduateExperienceEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.service.GraduateProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.GraduateProfileStatsResponse;

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

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                Long userId = user.getId();

                List<GraduateExperienceEntity> experiences = graduateProfileService.getExperiences(userId);

                List<GraduateCertificateEntity> certificates = graduateProfileService.getCertificates(userId);

                List<GraduateActivityEntity> activities = graduateProfileService.getActivities(userId);

                Map<String, Object> data = new HashMap<>();

                data.put("experiences", experiences);
                data.put("certificates", certificates);
                data.put("activities", activities);

                return new ApiResponse<>(
                                true,
                                "졸업생 프로필 조회 성공",
                                data);
        }

        // 프로필 통계 조회
        @GetMapping("/stats")
        public ApiResponse<GraduateProfileStatsResponse> getStats(
                        Authentication authentication) {

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                GraduateProfileStatsResponse stats = graduateProfileService.getStats(user.getId());

                return new ApiResponse<>(
                                true,
                                "프로필 통계 조회 성공",
                                stats);
        }

        // 특정 졸업생 스펙 조회
        @GetMapping("/{userId}")
        public ApiResponse<Map<String, Object>> getGraduateProfileById(
                        @PathVariable("userId") Long userId) {

                graduateProfileService.getGraduateById(userId);

                List<GraduateExperienceEntity> experiences = graduateProfileService.getExperiences(userId);

                List<GraduateCertificateEntity> certificates = graduateProfileService.getCertificates(userId);

                List<GraduateActivityEntity> activities = graduateProfileService.getActivities(userId);

                Map<String, Object> data = new HashMap<>();

                data.put("experiences", experiences);
                data.put("certificates", certificates);
                data.put("activities", activities);

                return new ApiResponse<>(
                                true,
                                "졸업생 스펙 조회 성공",
                                data);
        }

        // 추가 API
        @PostMapping("/experiences")
        public ApiResponse<Void> addExperience(
                        Authentication authentication,
                        @RequestBody Map<String, String> request) {

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                String experienceName = request.get("experienceName");

                graduateProfileService.addExperience(
                                user.getId(),
                                experienceName);

                return new ApiResponse<>(
                                true,
                                "경력이 추가되었습니다.",
                                null);
        }

        @PostMapping("/certificates")
        public ApiResponse<Void> addCertificate(
                        Authentication authentication,
                        @RequestBody Map<String, String> request) {

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                String certificateName = request.get("certificateName");

                graduateProfileService.addCertificate(
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

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                String activityName = request.get("activityName");

                graduateProfileService.addActivity(
                                user.getId(),
                                activityName);

                return new ApiResponse<>(
                                true,
                                "대외활동이 추가되었습니다.",
                                null);
        }

        // 삭제 API
        @DeleteMapping("/experiences/{experienceId}")
        public ApiResponse<Void> deleteExperience(
                        Authentication authentication,
                        @PathVariable("experienceId") Long experienceId) {

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                graduateProfileService.deleteExperience(
                                user.getId(),
                                experienceId);

                return new ApiResponse<>(
                                true,
                                "경력이 삭제되었습니다.",
                                null);
        }

        @DeleteMapping("/certificates/{certificateId}")
        public ApiResponse<Void> deleteCertificate(
                        Authentication authentication,
                        @PathVariable("certificateId") Long certificateId) {

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                graduateProfileService.deleteCertificate(
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

                UserEntity user = graduateProfileService.getUser(authentication.getName());

                graduateProfileService.deleteActivity(
                                user.getId(),
                                activityId);

                return new ApiResponse<>(
                                true,
                                "대외활동이 삭제되었습니다.",
                                null);
        }
}
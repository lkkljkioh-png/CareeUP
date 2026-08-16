package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.EmailRequest;
import com.example.backend.dto.GraduateSearchResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.ProfileUpdateRequest;
import com.example.backend.dto.ResetPasswordRequest;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.SignupResponse;
import com.example.backend.dto.UserResponse;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

        private final UserService userService;

        public UserController(UserService userService) {
                this.userService = userService;
        }

        // 회원가입
        @PostMapping("/signup")
        public ApiResponse<SignupResponse> signup(
                        @Valid @RequestBody SignupRequest request) {

                System.out.println("===== 회원가입 API 호출 =====");

                SignupResponse response = userService.register(request);

                return new ApiResponse<>(
                                true,
                                "회원가입이 완료되었습니다.",
                                response);
        }

        // 로그인
        @PostMapping("/login")
        public ApiResponse<LoginResponse> login(
                        @Valid @RequestBody LoginRequest request) {

                LoginResponse response = userService.login(request);

                return new ApiResponse<>(
                                true,
                                "로그인에 성공했습니다.",
                                response);
        }

        // 내 정보 조회
        @GetMapping("/me")
        public ApiResponse<UserResponse> me(Authentication authentication) {

                UserResponse response = userService.getMyInfo(authentication.getName());

                return new ApiResponse<>(
                                true,
                                "조회 성공",
                                response);
        }

        // 이메일 존재 확인
        @PostMapping("/check-user")
        public ApiResponse<Boolean> checkUser(@RequestBody EmailRequest request) {

                boolean exists = userService.checkUser(
                                request.getUserId(),
                                request.getEmail());

                return new ApiResponse<>(
                                true,
                                exists ? "확인되었습니다." : "일치하는 회원이 없습니다.",
                                exists);
        }

        // 비밀번호 변경
        @PutMapping("/reset-password")
        public ApiResponse<Void> resetPassword(@RequestBody ResetPasswordRequest request) {

                userService.resetPassword(request);

                return new ApiResponse<>(
                                true,
                                "비밀번호가 변경되었습니다.",
                                null);
        }

        // 프로필 업데이트
        @PutMapping("/profile")
        public ApiResponse<UserResponse> updateProfile(
                        Authentication authentication,
                        @RequestBody ProfileUpdateRequest request) {

                String email = authentication.getName();

                UserResponse response = userService.updateProfile(email, request);

                return new ApiResponse<>(
                                true,
                                "프로필이 수정되었습니다.",
                                response);
        }

        // 졸업생 전체 조회 및 검색
        @GetMapping("/graduates")
        public ApiResponse<List<GraduateSearchResponse>> searchGraduates(
                        @RequestParam(name = "keyword", required = false) String keyword,

                        @RequestParam(name = "majorCategory", required = false) String majorCategory) {

                List<GraduateSearchResponse> graduates = userService.searchGraduates(
                                keyword,
                                majorCategory);

                return new ApiResponse<>(
                                true,
                                "졸업생 조회 성공",
                                graduates);
        }

        // 졸업생 상세 조회
        @GetMapping("/graduates/{id}")
        public ApiResponse<GraduateSearchResponse> getGraduateById(
                        @PathVariable("id") Long id) {

                GraduateSearchResponse graduate = userService.getGraduateById(id);

                return new ApiResponse<>(
                                true,
                                "졸업생 상세 조회 성공",
                                graduate);
        }
}
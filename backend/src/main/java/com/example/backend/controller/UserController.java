package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.SignupResponse;
import com.example.backend.dto.UserResponse;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
            @Valid @RequestBody SignupRequest request
    ) {

        SignupResponse response = userService.register(request);

        return new ApiResponse<>(
                true,
                "회원가입이 완료되었습니다.",
                response
        );
    }

    // 로그인
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        LoginResponse response = userService.login(request);

        return new ApiResponse<>(
                true,
                "로그인에 성공했습니다.",
                response
        );
    }

    // 내 정보 조회
    @GetMapping("/me")
    public ApiResponse<UserResponse> me(Authentication authentication) {

        UserResponse response =
                userService.getMyInfo(authentication.getName());

        return new ApiResponse<>(
                true,
                "조회 성공",
                response
        );
    }
}
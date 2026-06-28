package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.SignupRequest;
import com.example.backend.dto.SignupResponse;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

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
}
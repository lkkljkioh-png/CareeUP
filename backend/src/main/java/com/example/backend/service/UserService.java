package com.example.backend.service;

import com.example.backend.config.JwtProvider;
import com.example.backend.dto.*;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtProvider jwtProvider) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    public SignupResponse register(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        if (userRepository.existsByUserId(request.getUserId())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        UserEntity user = new UserEntity();

        user.setUserId(request.getUserId());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setMembershipType(request.getMembershipType());
        user.setGender(request.getGender());

        UserEntity savedUser = userRepository.save(user);

        return new SignupResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getName());
    }

    public LoginResponse login(LoginRequest request) {

        UserEntity user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."); // 이메일 또는 비밀번호로 되어 있어 문구 수정
        }
        String token = jwtProvider.createToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getName(),
                user.getMembershipType());
    }

    public UserResponse getMyInfo(String email) {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getMembershipType());
    }

    // 이메일 & 아이디 확인
    public boolean checkUser(String userId, String email) {

        return userRepository.findByUserIdAndEmail(userId, email).isPresent();

    }

    // 비밀번호 재설정
    public void resetPassword(ResetPasswordRequest request) {

        UserEntity user = userRepository
                .findByUserIdAndEmail(request.getUserId(), request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("회원 정보를 찾을 수 없습니다."));

        // 기존 비밀번호와 같은지 확인
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("기존에 사용하던 비밀번호는 사용할 수 없습니다.");
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
    }
}
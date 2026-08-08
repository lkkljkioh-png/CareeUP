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

    // 회원가입
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

    // 로그인
    public LoginResponse login(LoginRequest request) {

        UserEntity user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        String token = jwtProvider.createToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getName(),
                user.getMembershipType());
    }

    // 내 정보 조회
    public UserResponse getMyInfo(String email) {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getMembershipType(),
                user.getSchool(),
                user.getDepartment(),
                user.getGrade(),
                user.getGraduationYear(),
                user.getCompany(),
                user.getPosition(),
                user.getDesiredJob(),
                user.getTechStack(),
                user.getMessage());
    }

    // 아이디 & 이메일 확인
    public boolean checkUser(String userId, String email) {

        return userRepository.findByUserIdAndEmail(userId, email).isPresent();

    }

    // 비밀번호 재설정
    public void resetPassword(ResetPasswordRequest request) {

        // 입력값 검사
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new IllegalArgumentException("새 비밀번호를 입력해주세요.");
        }

        if (request.getPassword().length() < 8) {
            throw new IllegalArgumentException("비밀번호는 8자 이상이어야 합니다.");
        }

        UserEntity user = userRepository
                .findByUserIdAndEmail(request.getUserId(), request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("회원 정보를 찾을 수 없습니다."));

        // 기존 비밀번호와 동일한지 확인
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("기존에 사용하던 비밀번호는 사용할 수 없습니다.");
        }

        // 새 비밀번호 암호화 후 저장
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
    }

    public void updateProfile(String email, ProfileUpdateRequest request) {

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (request.getSchool() != null) {
            user.setSchool(request.getSchool());
        }

        if (request.getDepartment() != null) {
            user.setDepartment(request.getDepartment());
        }

        if (request.getGrade() != null) {
            user.setGrade(request.getGrade());
        }

        if (request.getDesiredJob() != null) {
            user.setDesiredJob(request.getDesiredJob());
        }

        if (request.getTechStack() != null) {
            user.setTechStack(request.getTechStack());
        }

        if (request.getMessage() != null) {
            user.setMessage(request.getMessage());
        }

        userRepository.save(user);
    }
}
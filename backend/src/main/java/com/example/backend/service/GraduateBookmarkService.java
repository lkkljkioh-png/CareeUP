package com.example.backend.service;

import com.example.backend.dto.GraduateSearchResponse;
import com.example.backend.entity.GraduateBookmarkEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.GraduateBookmarkRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class GraduateBookmarkService {

    private final GraduateBookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    public GraduateBookmarkService(
            GraduateBookmarkRepository bookmarkRepository,
            UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
    }

    // 관심 졸업생 등록
    @Transactional
    public void addBookmark(
            String email,
            Long graduateId) {

        UserEntity student = getStudent(email);

        getGraduate(graduateId);

        boolean alreadyBookmarked = bookmarkRepository.existsByStudentIdAndGraduateId(
                student.getId(),
                graduateId);

        // 이미 등록돼 있으면 중복 저장하지 않음
        if (alreadyBookmarked) {
            return;
        }

        GraduateBookmarkEntity bookmark = new GraduateBookmarkEntity();

        bookmark.setStudentId(student.getId());
        bookmark.setGraduateId(graduateId);

        bookmarkRepository.save(bookmark);
    }

    // 관심 졸업생 해제
    @Transactional
    public void deleteBookmark(
            String email,
            Long graduateId) {

        UserEntity student = getStudent(email);

        GraduateBookmarkEntity bookmark = bookmarkRepository
                .findByStudentIdAndGraduateId(
                        student.getId(),
                        graduateId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "등록된 관심 졸업생이 아닙니다."));

        bookmarkRepository.delete(bookmark);
    }

    // 관심 등록 여부 조회
    public boolean isBookmarked(
            String email,
            Long graduateId) {

        UserEntity student = getStudent(email);

        getGraduate(graduateId);

        return bookmarkRepository
                .existsByStudentIdAndGraduateId(
                        student.getId(),
                        graduateId);
    }

    // 관심 졸업생 목록 조회
    public List<GraduateSearchResponse> getBookmarkedGraduates(
            String email) {

        UserEntity student = getStudent(email);

        return bookmarkRepository
                .findByStudentIdOrderByIdDesc(student.getId())
                .stream()
                .map(bookmark -> userRepository.findById(
                        bookmark.getGraduateId()))
                .flatMap(optionalUser -> optionalUser.stream())
                .filter(user -> "graduate".equals(
                        user.getMembershipType()))
                .map(this::toGraduateResponse)
                .toList();
    }

    // 로그인한 사용자가 재학생인지 확인
    private UserEntity getStudent(String email) {

        UserEntity user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "사용자를 찾을 수 없습니다."));

        if (!"student".equals(user.getMembershipType())) {
            throw new IllegalArgumentException(
                    "재학생만 관심 졸업생을 등록할 수 있습니다.");
        }

        return user;
    }

    // 대상 사용자가 졸업생인지 확인
    private UserEntity getGraduate(Long graduateId) {

        UserEntity graduate = userRepository
                .findById(graduateId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "졸업생을 찾을 수 없습니다."));

        if (!"graduate".equals(
                graduate.getMembershipType())) {
            throw new IllegalArgumentException(
                    "졸업생 프로필이 아닙니다.");
        }

        return graduate;
    }

    // 졸업생 Entity를 응답 DTO로 변환
    private GraduateSearchResponse toGraduateResponse(
            UserEntity user) {

        return new GraduateSearchResponse(
                user.getId(),
                user.getName(),
                user.getSchool(),
                user.getDepartment(),
                user.getMajorCategory(),
                user.getGraduationYear(),
                user.getCompany(),
                user.getPosition(),
                user.getTechStack(),
                user.getMessage());
    }
}
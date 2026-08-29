package com.example.backend.controller;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.GraduateSearchResponse;
import com.example.backend.service.GraduateBookmarkService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks/graduates")
public class GraduateBookmarkController {

    private final GraduateBookmarkService bookmarkService;

    public GraduateBookmarkController(
            GraduateBookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    // 관심 졸업생 목록 조회
    @GetMapping
    public ApiResponse<List<GraduateSearchResponse>> getBookmarks(
            Authentication authentication) {

        List<GraduateSearchResponse> bookmarks = bookmarkService.getBookmarkedGraduates(
                authentication.getName());

        return new ApiResponse<>(
                true,
                "관심 졸업생 조회 성공",
                bookmarks);
    }

    // 특정 졸업생 관심 등록 여부 조회
    @GetMapping("/{graduateId}/status")
    public ApiResponse<Boolean> getBookmarkStatus(
            Authentication authentication,
            @PathVariable("graduateId") Long graduateId) {

        boolean bookmarked = bookmarkService.isBookmarked(
                authentication.getName(),
                graduateId);

        return new ApiResponse<>(
                true,
                "관심 등록 여부 조회 성공",
                bookmarked);
    }

    // 관심 졸업생 등록
    @PostMapping("/{graduateId}")
    public ApiResponse<Void> addBookmark(
            Authentication authentication,
            @PathVariable("graduateId") Long graduateId) {

        bookmarkService.addBookmark(
                authentication.getName(),
                graduateId);

        return new ApiResponse<>(
                true,
                "관심 졸업생으로 등록되었습니다.",
                null);
    }

    // 관심 졸업생 해제
    @DeleteMapping("/{graduateId}")
    public ApiResponse<Void> deleteBookmark(
            Authentication authentication,
            @PathVariable("graduateId") Long graduateId) {

        bookmarkService.deleteBookmark(
                authentication.getName(),
                graduateId);

        return new ApiResponse<>(
                true,
                "관심 졸업생 등록이 해제되었습니다.",
                null);
    }
}
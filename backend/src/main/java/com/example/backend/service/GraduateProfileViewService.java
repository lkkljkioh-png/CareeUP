package com.example.backend.service;

import com.example.backend.entity.GraduateProfileViewEntity;
import com.example.backend.repository.GraduateProfileViewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class GraduateProfileViewService {

    private final GraduateProfileViewRepository graduateProfileViewRepository;

    public GraduateProfileViewService(
            GraduateProfileViewRepository graduateProfileViewRepository) {

        this.graduateProfileViewRepository = graduateProfileViewRepository;
    }

    // 프로필 조회 기록 저장
    public void addView(Long graduateId, Long viewerId) {

        if (graduateId.equals(viewerId)) {
            return;
        }

        GraduateProfileViewEntity view = new GraduateProfileViewEntity();

        view.setGraduateId(graduateId);
        view.setViewerId(viewerId);
        view.setViewedAt(LocalDateTime.now());

        graduateProfileViewRepository.save(view);
    }
}
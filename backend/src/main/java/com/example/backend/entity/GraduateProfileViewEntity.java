package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "graduate_profile_views")
public class GraduateProfileViewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long graduateId;
    private Long viewerId;
    private LocalDateTime viewedAt;

    public Long getId() {
        return id;
    }

    public Long getGraduateId() {
        return graduateId;
    }

    public void setGraduateId(Long graduateId) {
        this.graduateId = graduateId;
    }

    public Long getViewerId() {
        return viewerId;
    }

    public void setViewerId(Long viewerId) {
        this.viewerId = viewerId;
    }

    public LocalDateTime getViewedAt() {
        return viewedAt;
    }

    public void setViewedAt(LocalDateTime viewedAt) {
        this.viewedAt = viewedAt;
    }
}
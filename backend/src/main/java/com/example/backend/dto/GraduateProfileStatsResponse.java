package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GraduateProfileStatsResponse {

    private long viewCount;

    private long bookmarkCount;

    private long weeklyViewCount;
}
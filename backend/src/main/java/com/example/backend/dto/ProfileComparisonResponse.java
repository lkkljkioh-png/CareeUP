package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProfileComparisonResponse {

    private Long graduateId;
    private String graduateName;

    private List<String> commonTechStacks;
    private List<String> missingTechStacks;

    private List<String> commonCertificates;
    private List<String> missingCertificates;

    private CountComparison projectExperience;
    private CountComparison activity;

    private int completedCategoryCount;
    private int comparableCategoryCount;

    @Getter
    @AllArgsConstructor
    public static class CountComparison {

        private int studentCount;
        private int graduateCount;
        private int gap;
        private boolean comparable;
        private boolean sufficient;
    }
}
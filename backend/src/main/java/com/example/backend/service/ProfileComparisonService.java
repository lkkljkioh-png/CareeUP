package com.example.backend.service;

import com.example.backend.dto.ProfileComparisonResponse;
import com.example.backend.entity.UserEntity;
import com.example.backend.repository.GraduateActivityRepository;
import com.example.backend.repository.GraduateCertificateRepository;
import com.example.backend.repository.GraduateExperienceRepository;
import com.example.backend.repository.StudentActivityRepository;
import com.example.backend.repository.StudentCertificateRepository;
import com.example.backend.repository.StudentProjectRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileComparisonService {

    private final UserRepository userRepository;
    private final StudentProjectRepository studentProjectRepository;
    private final StudentCertificateRepository studentCertificateRepository;
    private final StudentActivityRepository studentActivityRepository;
    private final GraduateExperienceRepository graduateExperienceRepository;
    private final GraduateCertificateRepository graduateCertificateRepository;
    private final GraduateActivityRepository graduateActivityRepository;

    public ProfileComparisonService(
            UserRepository userRepository,
            StudentProjectRepository studentProjectRepository,
            StudentCertificateRepository studentCertificateRepository,
            StudentActivityRepository studentActivityRepository,
            GraduateExperienceRepository graduateExperienceRepository,
            GraduateCertificateRepository graduateCertificateRepository,
            GraduateActivityRepository graduateActivityRepository) {

        this.userRepository = userRepository;
        this.studentProjectRepository = studentProjectRepository;
        this.studentCertificateRepository = studentCertificateRepository;
        this.studentActivityRepository = studentActivityRepository;
        this.graduateExperienceRepository = graduateExperienceRepository;
        this.graduateCertificateRepository = graduateCertificateRepository;
        this.graduateActivityRepository = graduateActivityRepository;
    }

    public ProfileComparisonResponse compare(
            String studentEmail,
            Long graduateId) {

        UserEntity student = userRepository
                .findByEmail(studentEmail)
                .orElseThrow(() -> new IllegalArgumentException(
                        "사용자를 찾을 수 없습니다."));

        if (!"student".equals(student.getMembershipType())) {
            throw new IllegalArgumentException(
                    "재학생만 프로필을 비교할 수 있습니다.");
        }

        UserEntity graduate = userRepository
                .findById(graduateId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "졸업생을 찾을 수 없습니다."));

        if (!"graduate".equals(graduate.getMembershipType())) {
            throw new IllegalArgumentException(
                    "졸업생 프로필이 아닙니다.");
        }

        List<String> studentTechStacks = parseTechStack(student.getTechStack());

        List<String> graduateTechStacks = parseTechStack(graduate.getTechStack());

        List<String> studentCertificates = uniqueValues(
                studentCertificateRepository
                        .findByUserId(student.getId())
                        .stream()
                        .map(certificate -> certificate.getCertificateName())
                        .toList());

        List<String> graduateCertificates = uniqueValues(
                graduateCertificateRepository
                        .findByUserId(graduateId)
                        .stream()
                        .map(certificate -> certificate.getCertificateName())
                        .toList());

        List<String> commonTechStacks = findCommon(
                graduateTechStacks,
                studentTechStacks);

        List<String> missingTechStacks = findMissing(
                graduateTechStacks,
                studentTechStacks);

        List<String> commonCertificates = findCommon(
                graduateCertificates,
                studentCertificates);

        List<String> missingCertificates = findMissing(
                graduateCertificates,
                studentCertificates);

        int studentProjectCount = Math.toIntExact(
                studentProjectRepository
                        .countByUserId(student.getId()));

        int graduateExperienceCount = Math.toIntExact(
                graduateExperienceRepository
                        .countByUserId(graduateId));

        int studentActivityCount = Math.toIntExact(
                studentActivityRepository
                        .countByUserId(student.getId()));

        int graduateActivityCount = Math.toIntExact(
                graduateActivityRepository
                        .countByUserId(graduateId));

        ProfileComparisonResponse.CountComparison projectExperience = createCountComparison(
                studentProjectCount,
                graduateExperienceCount);

        ProfileComparisonResponse.CountComparison activity = createCountComparison(
                studentActivityCount,
                graduateActivityCount);

        int completedCategoryCount = 0;
        int comparableCategoryCount = 0;

        if (!graduateTechStacks.isEmpty()) {

            comparableCategoryCount++;

            if (missingTechStacks.isEmpty()) {
                completedCategoryCount++;
            }
        }

        if (!graduateCertificates.isEmpty()) {

            comparableCategoryCount++;

            if (missingCertificates.isEmpty()) {
                completedCategoryCount++;
            }
        }

        if (projectExperience.isComparable()) {

            comparableCategoryCount++;

            if (projectExperience.isSufficient()) {
                completedCategoryCount++;
            }
        }

        if (activity.isComparable()) {

            comparableCategoryCount++;

            if (activity.isSufficient()) {
                completedCategoryCount++;
            }
        }

        return new ProfileComparisonResponse(
                graduate.getId(),
                graduate.getName(),
                commonTechStacks,
                missingTechStacks,
                commonCertificates,
                missingCertificates,
                projectExperience,
                activity,
                completedCategoryCount,
                comparableCategoryCount);
    }

    private ProfileComparisonResponse.CountComparison createCountComparison(
            int studentCount,
            int graduateCount) {

        int gap = Math.max(
                graduateCount - studentCount,
                0);

        boolean comparable = graduateCount > 0;

        boolean sufficient = comparable && gap == 0;

        return new ProfileComparisonResponse.CountComparison(
                studentCount,
                graduateCount,
                gap,
                comparable,
                sufficient);
    }

    private List<String> parseTechStack(
            String techStack) {

        if (techStack == null
                || techStack.isBlank()) {

            return List.of();
        }

        return uniqueValues(
                Arrays.asList(
                        techStack.split("[,\\n]")));
    }

    private List<String> uniqueValues(
            List<String> values) {

        Map<String, String> uniqueValues = new LinkedHashMap<>();

        for (String value : values) {

            String normalizedValue = normalize(value);

            if (!normalizedValue.isEmpty()) {

                uniqueValues.putIfAbsent(
                        normalizedValue,
                        value.trim());
            }
        }

        return new ArrayList<>(
                uniqueValues.values());
    }

    private List<String> findCommon(
            List<String> graduateValues,
            List<String> studentValues) {

        Set<String> studentValueSet = studentValues.stream()
                .map(this::normalize)
                .collect(Collectors.toSet());

        return graduateValues.stream()
                .filter(value -> studentValueSet.contains(
                        normalize(value)))
                .toList();
    }

    private List<String> findMissing(
            List<String> graduateValues,
            List<String> studentValues) {

        Set<String> studentValueSet = studentValues.stream()
                .map(this::normalize)
                .collect(Collectors.toSet());

        return graduateValues.stream()
                .filter(value -> !studentValueSet.contains(
                        normalize(value)))
                .toList();
    }

    private String normalize(String value) {

        if (value == null) {
            return "";
        }

        return Normalizer
                .normalize(
                        value,
                        Normalizer.Form.NFKC)
                .trim()
                .replaceAll("\\s+", "")
                .toLowerCase(Locale.ROOT);
    }
}
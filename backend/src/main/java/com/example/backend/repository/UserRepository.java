package com.example.backend.repository;

import com.example.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUserId(String userId);

    Optional<UserEntity> findByUserIdAndEmail(
            String userId,
            String email);

    boolean existsByEmail(String email);

    boolean existsByUserId(String userId);

    // 졸업생 전체 조회
    List<UserEntity> findByMembershipType(String membershipType);

    // 졸업생 검색 및 계열 필터
    @Query("""
                SELECT u FROM UserEntity u
                WHERE u.membershipType = 'graduate'
                AND (
                    :keyword IS NULL
                    OR LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(u.company) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(u.school) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(u.department) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(u.position) LIKE LOWER(CONCAT('%', :keyword, '%'))
                )
                AND (
                    :majorCategory IS NULL
                    OR u.majorCategory = :majorCategory
                )
            """)
    List<UserEntity> searchGraduates(
            @Param("keyword") String keyword,
            @Param("majorCategory") String majorCategory);
}
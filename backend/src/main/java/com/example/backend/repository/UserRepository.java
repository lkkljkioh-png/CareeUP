package com.example.backend.repository;

import com.example.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/*
save(user);
findById(id);
findAll();
delete(user);
count();
 */

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUserId(String userId);

    Optional<UserEntity> findByUserIdAndEmail(String userId, String email);

    boolean existsByEmail(String email);

    boolean existsByUserId(String userId);
    
}
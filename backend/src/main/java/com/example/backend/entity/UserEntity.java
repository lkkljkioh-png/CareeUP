package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "school")
    private String school;

    @Column(name = "department")
    private String department;

    @Column(name = "major_category")
    private String majorCategory;

    @Column(name = "grade")
    private String grade;

    @Column(name = "graduation_year")
    private String graduationYear;

    @Column(name = "company")
    private String company;

    @Column(name = "position")
    private String position;

    @Column(name = "desired_job")
    private String desiredJob;

    @Column(name = "tech_stack")
    private String techStack;

    @Column(name = "message")
    private String message;

    private String membershipType;

    private String gender;
}
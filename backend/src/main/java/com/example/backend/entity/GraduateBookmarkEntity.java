package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "graduate_bookmarks", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "student_id", "graduate_id" })
})
@Getter
@Setter
@NoArgsConstructor
public class GraduateBookmarkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 즐겨찾기를 등록한 재학생 ID
    @Column(name = "student_id", nullable = false)
    private Long studentId;

    // 즐겨찾기에 등록된 졸업생 ID
    @Column(name = "graduate_id", nullable = false)
    private Long graduateId;
}
package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final JwtFilter jwtFilter;

        public SecurityConfig(JwtFilter jwtFilter) {
                this.jwtFilter = jwtFilter;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http)
                        throws Exception {

                http
                                .cors(Customizer.withDefaults())
                                .csrf(csrf -> csrf.disable())

                                .httpBasic(httpBasic -> httpBasic.disable())

                                .formLogin(form -> form.disable())

                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))

                                .authorizeHttpRequests(auth -> auth

                                                // 기존 회원가입 / 로그인
                                                .requestMatchers(
                                                                "/api/users/login",
                                                                "/api/users/signup",
                                                                "/api/users/check-user",
                                                                "/api/users/reset-password")
                                                .permitAll()

                                                // Q&A 조회는 누구나 가능
                                                .requestMatchers(HttpMethod.GET, "/api/questions/**").permitAll()

                                                // 나머지는 로그인 필요
                                                .anyRequest().authenticated())

                                .addFilterBefore(
                                                jwtFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
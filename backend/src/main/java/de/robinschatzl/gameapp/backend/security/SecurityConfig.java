package de.robinschatzl.gameapp.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        return new InMemoryUserDetailsManager(
                User.builder()
                        .username("Jule")
                        .password("$argon2id$v=19$m=16384,t=2,p=1$DxasBe3TzKqOJUUtbd3hcQ$fuYWxxi9Iu8DVa06V+cl/kKUxnXFVqmpT2UNOpz8Bmw")
                        .roles()
                        .build(),
                User.builder()
                        .username("Robin")
                        .password("$argon2id$v=19$m=16384,t=2,p=1$W7wQEYYfoan8j2FuEdrayA$LYbRYSTZtpcj8c0UvjVWCIFdDn0IyHR0Env8l/y/BZ0")
                        .roles()
                        .build()
        );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .httpBasic().and()
                .authorizeHttpRequests()
                .requestMatchers("/api/user").permitAll()
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .and().build();
    }
}
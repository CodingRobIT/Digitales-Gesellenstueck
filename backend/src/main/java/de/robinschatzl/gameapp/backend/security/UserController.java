package de.robinschatzl.gameapp.backend.security;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder passwordEncoder;


    @GetMapping("/me")
    public MongoUser getMyUserData(Authentication authentication) {
        String username = authentication.getName();
        return userService.findUserByUsername(username);
    }

    @GetMapping("/{username}")
    public MongoUser loadMongoUserByName(@PathVariable String username) {
        return userService.findUserByUsername(username);
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PostMapping("/signup")
    public MongoUser signUp(@RequestBody @Valid MongoUser user) {
        if (mongoUserRepository.findMongoUserByUsername(user.username()).isPresent()) {
            String errorMessage = "Username already exists!";
            throw new IllegalArgumentException(errorMessage);
        }
        String encodedPassword = passwordEncoder.encode(user.password());
        MongoUser newUser = new MongoUser(null, user.username(), encodedPassword);
        return mongoUserRepository.save(newUser);
    }
}
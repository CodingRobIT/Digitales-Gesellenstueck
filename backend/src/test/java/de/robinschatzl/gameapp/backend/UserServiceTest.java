package de.robinschatzl.gameapp.backend;

import de.robinschatzl.gameapp.backend.security.MongoUser;
import de.robinschatzl.gameapp.backend.security.MongoUserRepository;
import de.robinschatzl.gameapp.backend.security.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    private UserService userService;
    @Mock
    private MongoUserRepository mongoUserRepository;

    @BeforeEach
    void setup() {
        userService = new UserService(mongoUserRepository);
    }

    @Test
    void findUserByUsername() {
        MongoUser mongoUser = new MongoUser(UUID.randomUUID().toString(),
                "username", "password");
        when(mongoUserRepository.findMongoUserByUsername(mongoUser.username())).thenReturn(Optional.of(mongoUser));

        userService.findUserByUsername(mongoUser.username());

        verify(mongoUserRepository).findMongoUserByUsername(mongoUser.username());
    }
}
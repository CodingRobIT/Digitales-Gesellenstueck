package de.robinschatzl.gameapp.backend.security;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserService {

    private final MongoUserRepository mongoUserRepository;
    private final PasswordEncoder encoder;

    public UserService(MongoUserRepository mongoUserRepository, PasswordEncoder encoder) {
        this.mongoUserRepository = mongoUserRepository;
        this.encoder = encoder;
    }

    public MongoUser findUserByUsername(String username) {
        return mongoUserRepository.findMongoUserByUsername(username).orElseThrow(NoSuchElementException::new);
    }

    public MongoUser createMongoUser(MongoUser mongoUser) {

        if (mongoUserRepository.findMongoUserByUsername(mongoUser.username()).isPresent()) {
            throw new IllegalArgumentException("The username already exists.");
        } else {
            String encodedPassword = encoder.encode(mongoUser.password());
            MongoUser encodedUser = new MongoUser(mongoUser.id(), mongoUser.username(), encodedPassword);
            return mongoUserRepository.save(encodedUser);
        }
    }
}

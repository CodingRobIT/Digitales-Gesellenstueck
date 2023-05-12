package de.robinschatzl.gameapp.backend.security;

import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserService {

    private final MongoUserRepository mongoUserRepository;

    public UserService(MongoUserRepository mongoUserRepository) {
        this.mongoUserRepository = mongoUserRepository;
    }

    public MongoUser findUserByUsername(String username) {
        return mongoUserRepository.findMongoUserByUsername(username).orElseThrow(NoSuchElementException::new);
    }

}

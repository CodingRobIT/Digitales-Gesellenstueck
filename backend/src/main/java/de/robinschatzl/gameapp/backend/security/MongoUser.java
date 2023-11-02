package de.robinschatzl.gameapp.backend.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document("mongoUsers")
public record MongoUser(
        @MongoId
        String id,
        @NotBlank
        @Size(min = 2, max = 40)
        String username,
        @NotBlank
        @Size(min = 4, max = 128)
        String password,
        Integer fakeId
) {
}

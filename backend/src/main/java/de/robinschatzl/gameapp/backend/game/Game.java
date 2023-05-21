package de.robinschatzl.gameapp.backend.game;

import de.robinschatzl.gameapp.backend.security.MongoUser;
import org.springframework.data.annotation.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record Game(

        @Id
        String id,
        @NotBlank(message = "Title is required")
        @Size(min = 2, max = 100)
        String title,
        String publisher,
        String genre,
        String note,
        String imageUrl,
        String UserId
) {
    public Game withUserId(MongoUser mongoUser) {
        return new Game(
                this.id,
                this.title,
                this.publisher,
                this.genre,
                this.note,
                this.imageUrl,
                mongoUser.id()
        );
    }

}
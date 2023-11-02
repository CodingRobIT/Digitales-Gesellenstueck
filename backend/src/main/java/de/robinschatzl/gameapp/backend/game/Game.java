package de.robinschatzl.gameapp.backend.game;

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
        String imageUrl
) {
}
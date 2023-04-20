package de.robinschatzl.gameapp.backend.game;

import org.springframework.data.annotation.Id;

public record Game(

    @Id
    String id,
    String titel,
    String publisher,
    String genre,
    String node
) {
}
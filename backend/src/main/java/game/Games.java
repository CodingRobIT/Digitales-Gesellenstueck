package game;

import org.springframework.data.annotation.Id;

public record Games(

    @Id
    String id,
    String titel,
    String publisher,
    String genre,
    String node
) {
}

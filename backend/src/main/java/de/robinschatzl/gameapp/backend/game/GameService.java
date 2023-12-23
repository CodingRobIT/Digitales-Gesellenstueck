package de.robinschatzl.gameapp.backend.game;

import de.robinschatzl.gameapp.backend.security.MongoUser;
import de.robinschatzl.gameapp.backend.security.MongoUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class GameService {

    private final GameRepoInterface gameRepoInterface;
    private final MongoUserDetailsService mongoUserDetailsService

    public Game addGame(Game gameToAdd) {
        return gameRepoInterface.save(gameToAdd);
    }

    public Game getGameById(String gameId) {
        MongoUser mongoUser = mongoUserDetailsService.getAuthenticatedUser();

        Game game = gameRepoInterface.findById(gameId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Spiel nicht gefunden."));

        if (!mongoUser.id().equals(game.userId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Zugriff verweigert.");
        }

        return game;
    }

    public void deleteGame(String gameId) {
        MongoUser mongoUser = mongoUserDetailsService.getAuthenticatedUser();

        Game game = gameRepoInterface.findById(gameId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Spiel nicht gefunden."));

        if (!mongoUser.id().equals(game.userId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Nicht autorisiert, dieses Spiel zu löschen.");
        }

        gameRepoInterface.delete(game);
    }

    public Game editGame(Game gameToEdit) {
        // check if games with ID exist if not throws an exception
        gameRepoInterface.findById(gameToEdit.id())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "The game with the specified ID does not exist."));

        // if game with id exist it returns teh game
        return gameRepoInterface.save(gameToEdit);
    }

    public List<Game> getAllGamesByUserId() {
        // get authenticated user
        MongoUser mongoUser = mongoUserDetailsService.getAuthenticatedUser();

        // checks if user is authenticated
        if (mongoUser == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "No authenticated user found.");
        }

        List<Game> games = new ArrayList<>();
        for (Game game : gameRepoInterface.findAll()) {
            if (mongoUser.id().equals(game.userId())) {
                games.add(game);
            }
        }

        // checks if game is from user
        if (games.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "No game fpr user found.");
        }

        return games;
    }

}
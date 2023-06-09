package de.robinschatzl.gameapp.backend.game;

import de.robinschatzl.gameapp.backend.security.MongoUser;
import de.robinschatzl.gameapp.backend.security.MongoUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class GameService {

    private final GameRepoInterface gameRepoInterface;
    private final MongoUserDetailsService mongoUserDetailsService;

    public List<Game> getAllGames() {
        return gameRepoInterface.findAll();
    }

    public Game addGame(Game gameToAdd) {
        return gameRepoInterface.save(gameToAdd);
    }

    public Game getGameById(String id) {
        return gameRepoInterface.findById(id).orElseThrow(() -> new NoSuchElementException("Game with id " + id + " not found"));
    }

    public void deleteGame(String id) {
        gameRepoInterface.deleteById(id);
    }

    public Game editGame(Game gameToEdit) {
        return gameRepoInterface.save(gameToEdit);
    }

    public List<Game> getAllGamesByUserId() {
        List<Game> games = new ArrayList<>();
        MongoUser mongoUser = mongoUserDetailsService.getAuthenticatedUser();
        for (Game game : gameRepoInterface.findAll()) {
            if (mongoUser.id().equals(game.userId())) {
                games.add(game);
            }
        }
        return games;
    }
}
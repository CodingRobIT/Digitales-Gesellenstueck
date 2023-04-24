package de.robinschatzl.gameapp.backend.game;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class GameService {

    private final GameRepoInterface gameRepoInterface;

    public List<Game> getAllGames() {
        return gameRepoInterface.findAll();
    }

    public Game addGame(Game gameToAdd) {
        return gameRepoInterface.save(gameToAdd);
    }

    public Game getGameById(String id) {
        return gameRepoInterface.findById(id).orElseThrow();
    }


    public void deleteGame(String id) {
        gameRepoInterface.deleteById(id);
    }
}

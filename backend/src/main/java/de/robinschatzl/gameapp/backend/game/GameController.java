package de.robinschatzl.gameapp.backend.game;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping
    public Game addGame(@RequestBody Game gameToAdd) {
        return gameService.addGame(gameToAdd);
    }

    @GetMapping("{id}")
    public Game getGameById(@PathVariable String id) {
        return gameService.getGameById(id);
    }

    @DeleteMapping
    public void deleteGame(@PathVariable String id){
        gameService.deleteGame(id);
    }
}

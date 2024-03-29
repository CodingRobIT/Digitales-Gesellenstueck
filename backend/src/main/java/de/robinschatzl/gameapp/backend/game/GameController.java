package de.robinschatzl.gameapp.backend.game;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    @GetMapping
    public List<Game> getAllGamesByUserId() {
        return gameService.getAllGamesByUserId();
    }

    @PostMapping
    public Game addGame(@RequestBody @Valid Game gameToAdd) {
        return gameService.addGame(gameToAdd);
    }

    @GetMapping("{id}")
    public Game getGameById(@PathVariable String id) {
        return gameService.getGameById(id);
    }

    @DeleteMapping("{id}")
    public void deleteGame(@PathVariable String id){
        gameService.deleteGame(id);
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    public Game editGame(@PathVariable String id,@RequestBody @Valid Game gameToEdit) {
        return gameService.editGame(gameToEdit);
    }

}
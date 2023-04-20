package de.robinschatzl.gameapp.backend.game;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepoInterface extends MongoRepository <Game, String> {
}

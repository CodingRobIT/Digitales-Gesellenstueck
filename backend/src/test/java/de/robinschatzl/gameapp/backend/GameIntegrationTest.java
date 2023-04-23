package de.robinschatzl.gameapp.backend;

import de.robinschatzl.gameapp.backend.game.Game;
import de.robinschatzl.gameapp.backend.game.GameRepoInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
class GameIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    GameRepoInterface gameRepoInterface;

    @Test
    @DirtiesContext
    void getAllGames_ShouldReturnAllGames() throws Exception {
        mockMvc.perform(get("/api/games"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }

    @Test
    @DirtiesContext
    void getGame_ShouldReturnAllGamesAdded() throws Exception {
        Game game1 = new Game("1", "FFXI" ,"Square Enix", "MMORPG", "PC and PS2");
        gameRepoInterface.save(game1);
        Game game2 = new Game("2", "Doom", "N/A", "N/A","");
        gameRepoInterface.save(game2);
        Game game3 = new Game("3" , "Mario World", "Nintendo" , "Jump'n run", "");
        gameRepoInterface.save(game3);

        mockMvc.perform(get("/api/games"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                   [
                                   {
                                   "id": "1",
                                   "title": "FFXI",
                                   "publisher": "Square Enix",
                                   "genre": "MMORPG",
                                   "note": "PC and PS2"
                                   },
                                   {
                                   "id": "2",
                                   "title": "Doom",
                                   "publisher": "N/A",
                                   "genre": "N/A",
                                   "note": ""
                                   },
                                   {
                                   "id": "3",
                                   "title": "Mario World",
                                   "publisher": "Nintendo",
                                   "genre": "Jump'n run",
                                   "note": ""
                                   }
                                   ]
                                   """
                ));
    }

    @Test
    @DirtiesContext
    void addGame_shouldReturnAddedgame() throws Exception {
        mockMvc.perform(post("/api/games")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                        "id": "1",
                        "title": "MGS",
                        "publisher": "Hideo Kojima",
                        "genre": "N/A",
                        "note": "Nice"
                        }
                        """
                ))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "id": "1",
                                "title": "MGS",
                                "publisher": "Hideo Kojima",
                                "genre": "N/A",
                                "note": "Nice"
                                }
                                """
                ));
    }
}

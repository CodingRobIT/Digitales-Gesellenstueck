package de.robinschatzl.gameapp.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.robinschatzl.gameapp.backend.game.Game;
import de.robinschatzl.gameapp.backend.game.GameRepoInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
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

    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllGames_ShouldReturnAllGames() throws Exception {
        mockMvc.perform(get("/api/games"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }

    @DirtiesContext
    @Test
    void getAllGames_Unauthorized_ShouldReturnStatusCode401() throws Exception {
        mockMvc.perform(get("/api/games"))
                .andExpect(status().isUnauthorized());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getGame_ShouldReturnAllGamesAdded() throws Exception {
        Game game1 = new Game("1", "FFXI", "Square Enix", "MMORPG", "PC and PS2", "","01");
        gameRepoInterface.save(game1);
        Game game2 = new Game("2", "Doom", "N/A", "N/A", "", "","01");
        gameRepoInterface.save(game2);
        Game game3 = new Game("3", "Mario World", "Nintendo", "Jump'n run", "", "","01");
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
                                "note": "PC and PS2",
                                "imageUrl": "",
                                "userId": "01"                                
                                },
                                {
                                "id": "2",
                                "title": "Doom",
                                "publisher": "N/A",
                                "genre": "N/A",
                                "note": "",
                                "imageUrl": "",
                                "userId": "01"
                                },
                                {
                                "id": "3",
                                "title": "Mario World",
                                "publisher": "Nintendo",
                                "genre": "Jump'n run",
                                "note": "",
                                "imageUrl": "",
                                "userId": "01"
                                }
                                ]
                                """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void addGame_shouldReturnAddedgame() throws Exception {
        mockMvc.perform(post("/api/games")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "1",
                                "title": "MGS",
                                "publisher": "Hideo Kojima",
                                "genre": "N/A",
                                "note": "Nice",
                                "imageUrl": ""
                                }
                                """)
                        .with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "id": "1",
                                "title": "MGS",
                                "publisher": "Hideo Kojima",
                                "genre": "N/A",
                                "note": "Nice",
                                "imageUrl": ""
                                }
                                """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getGameById_ShouldReturnAddedGame() throws Exception {
        Game testGame = new Game("42", "Die Antwort auf alles", "", "", "", "","01");
        gameRepoInterface.save(testGame);

        mockMvc.perform(get("/api/games/42"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "id": "42",
                                "title": "Die Antwort auf alles",
                                "publisher": "",
                                "genre": "",
                                "note": "",
                                "imageUrl": "",
                                "userId": "01"
                                }
                                """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void deleteById_shouldExpectSuccessfulDelete() throws Exception {
        String saveResult = mockMvc.perform(
                        post("/api/games")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        """
                                                {
                                                "id": "42",
                                                "title": "Die Antwort auf alles",
                                                "publisher": "",
                                                "genre": "",
                                                "note": "",
                                                "imageUrl": "",
                                                "userId": "01"
                                                }
                                                """
                                )
                                .with(csrf())
                )
                .andReturn()
                .getResponse()
                .getContentAsString();

        Game saveResultGame = objectMapper.readValue(saveResult, Game.class);
        String id = saveResultGame.id();

        mockMvc.perform(delete("/api/games/" + id)
                        .with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/games"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void editGame_ById_shouldReturnEditedGame() throws Exception {
        mockMvc.perform(put("/api/games/465/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "465",
                                "title": "ICO"
                                }
                                """
                        )
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "465",
                        "title": "ICO"
                        }
                        """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void editGame_ById_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(put("/api/games/32123/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "id": "247",
                                        "title": "BadRequest Game",
                                        "note": "id stimmt nicht mit id in url überein, somit sollte Status 400 > BadRequest kommen"
                                        }
                                        """
                        )
                        .with(csrf())
                )
                .andExpect(status().isBadRequest());
    }

    @Test
    @DirtiesContext
    void addGame_expect401_whenAnonymousUser() throws Exception {
        mockMvc.perform(post("/api/games/add")
                        .with(csrf())
                )
                .andExpect(status().isUnauthorized());
    }

    @DirtiesContext
    @Test
    void editGame_ById_ShouldReturn403() throws Exception {
        mockMvc.perform(put("/api/games/32123/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "id": "247",
                                        "title": "Forbidden Game",
                                        "note": "AnonymousUser kann nicht editieren somit status Code 403"
                                        }
                                        """
                        ))
                .andExpect(status().isForbidden());
    }
}
package de.robinschatzl.gameapp.backend;

import de.robinschatzl.gameapp.backend.game.Game;
import de.robinschatzl.gameapp.backend.game.GameRepoInterface;
import de.robinschatzl.gameapp.backend.game.GameService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class GameServiceTest {

    private GameService gameService;

    @Mock
    private GameRepoInterface gameRepoInterfaceMock;

    @Autowired
    private MockMvc mockMvc;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        gameService = new GameService(gameRepoInterfaceMock);
    }

    @Test
    @DirtiesContext
    void testGetAllGames() {
        //GIVEN
        Game game1 = new Game("1", "FFXI" ,"Square Enix", "MMORPG", "PC and PS4","","01");
        Game game2 = new Game("2", "Doom", "N/A", "Shooter","","","01");

        List<Game> expectedGames = Arrays.asList(game1, game2);

        when(gameRepoInterfaceMock.findAll()).thenReturn(expectedGames);

        //WHEN
        List<Game> actualGames = gameService.getAllGames();

        //THEN
        assertEquals(expectedGames.size(), actualGames.size());
        for (int i = 0; i < expectedGames.size(); i++) {
            assertEquals(expectedGames.get(i), actualGames.get(i));
        }
        verify(gameRepoInterfaceMock, times(1)).findAll();
    }

    @Test
    @DirtiesContext
    void testGetAllGamesWithBiggerLibrary() {
        //GIVEN
        Game game1 = new Game("1", "FFXI" ,"Square Enix", "MMORPG", "PC and PS4","","01");
        Game game2 = new Game("2", "Doom", "N/A", "Shooter","","","01");
        Game game3 = new Game("3" , "Mario World", "Nintendo" , "Jump'n run", "","","01");
        Game game4 = new Game("4" , "Mario & Luigi", "Nintendo" , "Jump'n run", "","","01");
        Game game5 = new Game("5" , "Super Mario Land", "Nintendo" , "Jump'n run", "","","01");

        List<Game> expectedGames = Arrays.asList(game1, game2, game3, game4, game5);

        when(gameRepoInterfaceMock.findAll()).thenReturn(expectedGames);

        //WHEN
        List<Game> actualGames = gameService.getAllGames();

        //THEN
        assertEquals(expectedGames.size(), actualGames.size());
        for (int i = 0; i < expectedGames.size(); i++) {
            assertEquals(expectedGames.get(i), actualGames.get(i));
        }
        verify(gameRepoInterfaceMock, times(1)).findAll();
    }

    @Test
    @DirtiesContext
    void testGetAllGames_expectedEmptyList_WhenDataBaseIsEmpty() {
        //GIVEN
        final GameRepoInterface gameRepoInterface = mock(GameRepoInterface.class);
        final GameService gameService = new GameService(gameRepoInterface);

        when(gameRepoInterface.findAll())
                .thenReturn(Collections.emptyList());

        //WHEN
        List<Game> actual = gameService.getAllGames();
        List<Game> expected = new ArrayList<>();

        //THEN
        verify(gameRepoInterface).findAll();
        assertEquals(actual, expected);
    }

    @DirtiesContext
    @Test
    void testAddGame_ShouldRespondAddedGame() {
        //GIVEN
        final GameRepoInterface gameRepoInterface = mock(GameRepoInterface.class);
        final GameService gameService = new GameService(gameRepoInterface);

        Game doom = new Game("666", "Doom", "id Software", "Ego-Shooter", "wurde am 10. Dezember 1993 erstmals von id Software veröffentlicht","","01");
        when(gameRepoInterface.save(doom))
                .thenReturn(doom);

        //WHEN
        Game actual = gameService.addGame(doom);

        //THEN
        verify(gameRepoInterface).save(doom);
        assertEquals(actual, doom);
    }

    @DirtiesContext
    @Test
    void getGameById_ShoueldReturnOneGame_WhenOneGameIsAdded() {
        //GIVEN
        Game gameTest1 = new Game("0815", "Kein Plan", "Robin Schatzl", "Lost in Java", "","","01");

        when(gameRepoInterfaceMock.findById("0815")).thenReturn(Optional.of(gameTest1));

        //WHEN
        Game actual = gameService.getGameById("0815");

        //THEN
        Game expected = new Game("0815", "Kein Plan", "Robin Schatzl", "Lost in Java", "","","01");
        verify(gameRepoInterfaceMock).findById("0815");
        assertEquals(expected, actual);
    }

    @DirtiesContext
    @Test
    void getGameById_ShouldReturnException_WhenGameDoseNotExist() {
        //GIVEN
        when(gameRepoInterfaceMock.findById("1")).thenThrow(NoSuchElementException.class);

        //WHEN
        try {
            gameService.getGameById("1");
            fail();
        }
        //THEN
        catch (NoSuchElementException Ignored) {
            verify(gameRepoInterfaceMock).findById("1");
        }
    }

    @DirtiesContext
    @Test
    void getGameByID_ShouldReturnException_WhenGameDoseNotExist_Alternate_Version() {
        Assertions.assertThrows(NoSuchElementException.class, () -> gameService.getGameById("1"));
    }

    @DirtiesContext
    @Test
    void deleteGameById_shouldDeleteGameById() {
        //GIVEN
        Game testGameToDelete = new Game("88" ,"Delete me","","", "","","01");
        gameRepoInterfaceMock.save(testGameToDelete);

        //WHEN
        gameService.deleteGame("88");

        //THEN
        verify(gameRepoInterfaceMock).deleteById("88");
    }

    @DirtiesContext
    @Test
    void editGame_ShouldReturnEditedGame_WhenValidIdProvided() {
        //GIVEN
        Game editedGame = new Game("1", "Same game new Style","","","","","01");

        when(gameRepoInterfaceMock.save(editedGame)).thenReturn(editedGame);

        //WHEN
        Game actual = gameService.editGame(editedGame);

        //THEN
        verify(gameRepoInterfaceMock).save(editedGame);
        assertEquals(editedGame, actual);
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void editGame_WithMismatchingIds_ShouldReturnBadRequest400() throws Exception {
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
                        .with(csrf()))
                .andExpect(status().isBadRequest());
    }
}
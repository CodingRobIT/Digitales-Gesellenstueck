package de.robinschatzl.gameapp.backend;

import de.robinschatzl.gameapp.backend.game.Game;
import de.robinschatzl.gameapp.backend.game.GameRepoInterface;
import de.robinschatzl.gameapp.backend.game.GameService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc
@SpringBootTest
class GameServiceTest {

    private GameService gameService;

    @Mock
    private GameRepoInterface gameRepoInterfaceMock;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        gameService = new GameService(gameRepoInterfaceMock);
    }

    @Test
    @DirtiesContext
    void testGetAllGames() {
        //GIVEN
        Game game1 = new Game("1", "FFXI" ,"Square Enix", "MMORPG", "PC and PS4");
        Game game2 = new Game("2", "Doom", "N/A", "Shooter","");

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
        Game game1 = new Game("1", "FFXI" ,"Square Enix", "MMORPG", "PC and PS4");
        Game game2 = new Game("2", "Doom", "N/A", "Shooter","");
        Game game3 = new Game("3" , "Mario World", "Nintendo" , "Jump'n run", "");
        Game game4 = new Game("4" , "Mario & Luigi", "Nintendo" , "Jump'n run", "");
        Game game5 = new Game("5" , "Super Mario Land", "Nintendo" , "Jump'n run", "");

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

        Game doom = new Game("666", "Doom", "id Software", "Ego-Shooter", "wurde am 10. Dezember 1993 erstmals von id Software veröffentlicht");
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
        Game gameTest1 = new Game("0815", "Kein Plan", "Robin Schatzl", "Lost in Java", "");

        when(gameRepoInterfaceMock.findById("1")).thenReturn(Optional.of(gameTest1));

        //WHEN
        Game actual = gameService.getGameById("1");

        //THEN
        Game expected = new Game("0815", "Kein Plan", "Robin Schatzl", "Lost in Java", "");
        verify(gameRepoInterfaceMock).findById("1");
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
}
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
        Game game1 = new Game("1", "FFXI" ,"Square Enix", "MMORPG", "PC and PS4");
        Game game2 = new Game("2", "Doom", "N/A", "Shooter","");

        List<Game> expectetGames = Arrays.asList(game1, game2);

        when(gameRepoInterfaceMock.findAll()).thenReturn(expectetGames);

        List<Game> actualGames = gameService.getAllGames();

        assertEquals(expectetGames.size(), actualGames.size());

        for (int i = 0; i < expectetGames.size(); i++) {
            assertEquals(expectetGames.get(i), actualGames.get(i));
        }
        verify(gameRepoInterfaceMock, times(1)).findAll();
    }

    @Test
    @DirtiesContext
    void getAllGames_expectedEmptyList_WhenDataBaseIsEmpty() {
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
}

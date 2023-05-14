package de.robinschatzl.gameapp.backend;

import de.robinschatzl.gameapp.backend.security.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser
@SpringBootTest
@AutoConfigureMockMvc
class MongoUserIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    MongoUserRepository mongoUserRepository;

    @Test
    @WithMockUser(username = "testUser")
    void getMe_shouldReturnAuthenticatedUsername() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("testUser"));
    }

    @Test
    void login_shouldReturnStatusOk() throws Exception {
        mockMvc.perform(post("/api/users/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {
                            "username": "testUser",
                            "password": "testPassword"
                        }
                        """
                        ))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void logout_shouldReturnStatusOk() throws Exception {
        mockMvc.perform(post("/api/users/logout")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "testUser")
    void login_shouldFail_whenUserIsUnauthorized() throws Exception {
        mockMvc.perform(post("/api/users/login"))
                .andExpect(status().isForbidden())
                .andExpect(content().string(""));
    }


    @Test
    @WithMockUser(username = "testUser")
    void logout_shouldLogoutUser() throws Exception {
        mockMvc.perform(post("/api/users/logout")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    @WithMockUser
    void signIn_shouldReturnANewUser() throws Exception {
        mockMvc.perform(post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "username": "testUser", "password": "1234abc"}
                                 """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"username":  "testUser"}
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.password").isNotEmpty());
    }

}

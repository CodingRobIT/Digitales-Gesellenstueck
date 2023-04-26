package de.robinschatzl.gameapp.backend;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockHttpServletRequest;

class ReactRoutingForwardingTest {

    private final ReactRoutingForwarding.ReactRoutingPathResourceResolver resolver =
            new ReactRoutingForwarding.ReactRoutingPathResourceResolver();

    @Test
    void testGetResource_nonExistingFile() throws IOException {
        // given
        var resourcePath = "/non-existing/file.html";
        var location = new ClassPathResource("static/");
        var mockHttpServletRequest = mock(MockHttpServletRequest.class);
        when(mockHttpServletRequest.getRequestURI()).thenReturn(resourcePath);

        // when
        var result = resolver.getResource(resourcePath, location);

        // then
        assertThat(Collections.singletonList(result)).isEqualTo(Collections.singletonList(new ClassPathResource(ReactRoutingForwarding.DEFAULT_STARTING_PAGE)));
    }
}
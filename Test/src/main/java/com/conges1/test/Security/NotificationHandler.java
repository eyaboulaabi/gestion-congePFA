package com.conges1.test.Security;



import org.springframework.stereotype.Component;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.conges1.test.Modeles.User;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class NotificationHandler extends TextWebSocketHandler {

    private final Map<Long, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        User authenticatedUser = (User) session.getAttributes().get("authenticatedUser");
        if (authenticatedUser != null) {
            userSessions.put(authenticatedUser.getId(), session);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        User authenticatedUser = (User) session.getAttributes().get("authenticatedUser");
        if (authenticatedUser != null) {
            userSessions.remove(authenticatedUser.getId());
        }
    }

    public void sendNotificationToUser(Long userId, String message) throws IOException {
        WebSocketSession session = userSessions.get(userId);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                // Handle the IOException here
                e.printStackTrace();
            }
        }
    }
}

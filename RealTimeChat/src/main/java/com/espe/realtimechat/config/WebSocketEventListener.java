package com.espe.realtimechat.config;

import com.espe.realtimechat.chat.ChatMessage;
import com.espe.realtimechat.chat.MessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    private final SimpMessageSendingOperations messagingTemplate;

    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            logger.info("Disconnected from: {}", username);

            // Crear la instancia de ChatMessage usando el constructor y setters
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(MessageType.LEAVE);
            chatMessage.setSender(username);

            // Enviar el mensaje a la sala pública
            messagingTemplate.convertAndSend("/topic/public", chatMessage);

            // Eliminar la sesion del usuario para evitar referencias anteriores
            headerAccessor.getSessionAttributes().remove("username");
            logger.info("Sesiones activas después de desconectar: {}", headerAccessor.getSessionAttributes());

        }
    }
}

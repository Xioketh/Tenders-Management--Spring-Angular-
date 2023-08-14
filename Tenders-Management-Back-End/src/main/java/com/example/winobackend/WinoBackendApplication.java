package com.example.winobackend;

import com.example.winobackend.Service.EmailSendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class WinoBackendApplication {

    @Autowired
    private EmailSendService emailSender;

    public static void main(String[] args) {
        SpringApplication.run(WinoBackendApplication.class, args);
    }


}

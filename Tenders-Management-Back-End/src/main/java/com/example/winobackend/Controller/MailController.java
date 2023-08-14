package com.example.winobackend.Controller;

import com.example.winobackend.Model.Mail;
import com.example.winobackend.Service.EmailSendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api/v1")
@CrossOrigin
public class MailController {

    @Autowired
    private EmailSendService emailSender;


    @PostMapping({"/sendmail"})
    public Mail receiveString(@RequestBody Mail data) {
        String body = data.getBody();
        String subject = data.getSubject();
        String sendMail = data.getSendMail();
        //String sendMail="duranasinghe984@gmail.com";


        emailSender.sendEmail(sendMail, subject, body);

        System.out.println(sendMail);
        return data;
    }


//@PostMapping("/sendmail")
//public String receiveString() {
//    String body = "dd";
//    String subject = "dd";
//    String sendMail = "duranasinghe984@gmail.com";
//    //String sendMail="duranasinghe984@gmail.com";
//
//
//    emailSender.sendEmail(sendMail, subject, body);
//
//    System.out.println(sendMail);
//    return "ok";
//}

}

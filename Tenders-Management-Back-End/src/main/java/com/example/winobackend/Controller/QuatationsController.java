package com.example.winobackend.Controller;


import com.example.winobackend.Model.Quatations;
import com.example.winobackend.Repository.QuatationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
public class QuatationsController{

    @Autowired
    private QuatationsRepository quatationsRepository;


    @PostMapping("/quatations")
    public Quatations placeQuatation(@RequestBody Quatations quatations){

        return quatationsRepository.save(quatations);
    }

    @GetMapping("/quatations")
    public List<Quatations> getAllQuatations() {

        return quatationsRepository.findAll();
    }

    @GetMapping("/quatations/{id}")
    public List<Quatations> getId(@PathVariable String id){

        List <Quatations> quatations=quatationsRepository.findAllByReqOrderId(id);

        return quatations;
    }


    @PutMapping("/quatations/{id}")
    public List<Quatations> updateOrder(@PathVariable String id , @RequestParam String Status) {
        System.out.println("ok for now");
        List<Quatations>  list = quatationsRepository.findAllByReqOrderId(id);

        for (Quatations quatations:list) {
            quatations.setStatus(Status);
            quatationsRepository.save(quatations);
        }

        return list;
    }

    @GetMapping("/roleQuatations")
    public List<Quatations> getQuatationsByRole(@RequestParam("role") String role) {

        return quatationsRepository.findAllByRole(role);
    }



}


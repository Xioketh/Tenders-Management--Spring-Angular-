package com.example.winobackend.Controller;


import com.example.winobackend.Exception.ResourceNotFoundException;
import com.example.winobackend.Model.Outstanding;
import com.example.winobackend.Model.ReqOrders;
import com.example.winobackend.Repository.OutstandingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
public class OutstandingController {

    @Autowired
    private OutstandingRepository outstandingRepository;


    @PostMapping("/outstand")
    public Outstanding setOut(@RequestBody Outstanding outstanding) {

        return outstandingRepository.save(outstanding);
    }

    @GetMapping("/outstand")
    public List<Outstanding> getAllOutstand() {
        return outstandingRepository.findAll();
    }

    @GetMapping("/getSelectedOutstand")
    public List<Outstanding> getSelectedOutstand(@RequestParam("status") String status) {
        return outstandingRepository.findAllByStatus(status);
    }

    @GetMapping("/getOutstandingByRoleAndStatus")
    public List<Outstanding> getOutstandingByRoleAndStatus(
            @RequestParam("role") String role,
            @RequestParam("status") String status) {
        return outstandingRepository.findByRoleAndStatus(role, status);
    }

    @PutMapping("/updateOutStatus/{id}")
    public ResponseEntity<Outstanding> updateOrder(@PathVariable Long id, @RequestBody Outstanding outstanding) {


        Outstanding out = outstandingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No Orders are exist" + id));


        out.setStatus(outstanding.getStatus());
        out.setChequeId(outstanding.getChequeId());

        Outstanding updatedOutstand = outstandingRepository.save(out);
        return ResponseEntity.ok(updatedOutstand);
    }


    @GetMapping("/outstanding/chequeNotNull")
    public List<Outstanding> getOutstandingWithChequeIdNotNull() {
        return outstandingRepository.findByChequeIdNotNull();
    }

}

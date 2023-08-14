package com.example.winobackend.Controller;


import com.example.winobackend.Exception.ResourceNotFoundException;
import com.example.winobackend.Model.RecievedOrders;
import com.example.winobackend.Model.ReqOrders;
import com.example.winobackend.Repository.RecievedordersRepository;
import com.example.winobackend.Service.RecievedOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class RecievedOrdersController {

    @Autowired
    private RecievedordersRepository recievedordersRepository;

    @Autowired
    private RecievedOrdersService recievedOrdersService;


    @GetMapping("/recievedOrder")
    public List<RecievedOrders> getAllOrders() {

        return recievedordersRepository.findAll();
    }

    @PostMapping("/recievedOrder")
    public RecievedOrders placeOrder(@RequestBody RecievedOrders orders) {

        return recievedordersRepository.save(orders);
    }

    @PutMapping("/recievedOrder/{id}")
    public ResponseEntity<RecievedOrders> updateOrder(@PathVariable Long id, @RequestBody RecievedOrders orders) {


        RecievedOrders order = recievedordersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No Orders are exist" + id));

        order.setStatus(orders.getStatus());

        RecievedOrders updatedOrders = recievedordersRepository.save(order);
        return ResponseEntity.ok(updatedOrders);
    }

    @GetMapping("/countRecievedOrders")
    public long countOrders() {
        return recievedOrdersService.countOrders();
    }

    @GetMapping("/getRecievedOrderByRole")
    public List<RecievedOrders> getRecievedOrderByRole(@RequestParam("role") String role) {
        return recievedordersRepository.findAllByRole(role);
    }

    @GetMapping("/null-status")
    public List<RecievedOrders> getReceivedOrdersWithNullStatus() {
        return recievedordersRepository.findByStatusIsNull();
    }

    @GetMapping("/not-null-status")
    public List<RecievedOrders> getReceivedOrdersWithNotNullStatus() {
        return recievedordersRepository.findByStatusIsNotNull();
    }

}

package com.example.winobackend.Controller;

import com.example.winobackend.Exception.ResourceNotFoundException;
import com.example.winobackend.Model.ReqOrders;
import com.example.winobackend.Repository.ReqOrdersRepository;
import com.example.winobackend.Service.ReqOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
public class ReqOrdersController {

    private final JdbcTemplate jdbcTemplate;
    String specificValue="Accepted";

    @Autowired
    private ReqOrdersRepository orderRepository;

    @Autowired
    private ReqOrderService reqOrderService;


    public ReqOrdersController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/orders")
    public List<ReqOrders> getAllOrders() {

        return orderRepository.findAll();
    }

    @PostMapping("/orders")
    public ReqOrders placeOrder(@RequestBody ReqOrders orders) {

        return orderRepository.save(orders);
    }

    @PutMapping("/orders/{id}")
    public ResponseEntity<ReqOrders> updateOrder(@PathVariable Long id, @RequestBody ReqOrders orderData) {


        ReqOrders order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No Orders are exist" + id));

//        order.setCompanyName(orderData.getCompanyName());
//        order.setCategory(orderData.getCategory());
//        order.setEmailID(orderData.getEmailID());
//        order.setPhoneNO(orderData.getPhoneNO());
//        order.setDate(orderData.getDate());
      order.setQuatationRecieved(orderData.getQuatationRecieved());
        order.setOrderStatus(orderData.getOrderStatus());

        ReqOrders updatedOrders = orderRepository.save(order);
        return ResponseEntity.ok(updatedOrders);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<ReqOrders> getOrderById(@PathVariable Long id){
        ReqOrders reqItems=orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request Order not Exist"));
        return ResponseEntity.ok(reqItems);
    }

    @GetMapping("/getLastId")
    public Object getLastValue() {
        String query = "SELECT id FROM orders ORDER BY id DESC LIMIT 1";
        return jdbcTemplate.queryForObject(query, Object.class);
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        ReqOrders reqItems = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request Order not Exist"));

        orderRepository.delete(reqItems);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/placedOrders")
    public List<ReqOrders> getOrdersByRole(@RequestParam("role") String role) {
        return reqOrderService.getOrdersByRole(role);
    }


    @GetMapping("/accepted")
    public List<ReqOrders> getAcceptedOrders() {
        return orderRepository.findByOrderStatus("Accepted");
    }

}
package com.example.winobackend.Controller;


import com.example.winobackend.Exception.ResourceNotFoundException;
import com.example.winobackend.Model.ReqOrders;
import com.example.winobackend.Model.Suppliers;

import com.example.winobackend.Repository.SuppliersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
public class SuppliersController {

    @Autowired
    private SuppliersRepository suppliersRepository;

    @GetMapping("/suppliers")
    public List<Suppliers> getAllSuppliers(){

        return suppliersRepository.findAll();
    }

    @PostMapping("/suppliers")
    public Suppliers addSupplier( @RequestBody Suppliers suppliers){

        return suppliersRepository.save(suppliers);
    }

    @PutMapping("/suppliers/{id}")
    public ResponseEntity<Suppliers> updateSupplier(@PathVariable Long id, @RequestBody Suppliers supplierData){


        Suppliers suppliers = suppliersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No suppliers are exist" +id));

        suppliers.setAddress(supplierData.getAddress());
        suppliers.setName(supplierData.getName());
        suppliers.setTell(supplierData.getTell());
        suppliers.setEmail(supplierData.getEmail());

        Suppliers updatedSupplier = suppliersRepository.save(suppliers);
        return ResponseEntity.ok(updatedSupplier );
    }

    @DeleteMapping("/suppliers/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSupplier(@PathVariable Long id){
        Suppliers suppliers = suppliersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No suppliers are exist" +id));

        suppliersRepository.delete(suppliers);
        Map<String,Boolean> response=new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

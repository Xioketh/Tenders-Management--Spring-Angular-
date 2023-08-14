package com.example.winobackend.Service;

import com.example.winobackend.Repository.RecievedordersRepository;
import com.example.winobackend.Repository.ReqOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecievedOrdersService {

    @Autowired
    private RecievedordersRepository recievedordersRepository;

    public long countOrders() {
        return recievedordersRepository.count();
    }
}

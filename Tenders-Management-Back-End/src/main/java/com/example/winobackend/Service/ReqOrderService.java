package com.example.winobackend.Service;


import com.example.winobackend.Model.ReqOrders;
import com.example.winobackend.Repository.ReqOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReqOrderService {

    @Autowired
    private ReqOrdersRepository reqOrdersRepository;


//    public long getCountOfSpecificValue(String columnName, String value) {
//        return reqOrdersRepository.countByColumnNameAndValue(columnName, value);
//    }

    public List<ReqOrders> getOrdersByRole(String role) {
        return reqOrdersRepository.findAllByRole(role);
    }
}

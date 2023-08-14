package com.example.winobackend.Controller;


import com.example.winobackend.Exception.ResourceNotFoundException;
import com.example.winobackend.Model.ReqItems;
import com.example.winobackend.Model.ReqOrders;
import com.example.winobackend.Repository.ReqItemsRepository;
import com.example.winobackend.dto.ItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class ReqItemsController {


    @Autowired
    private ReqItemsRepository reqItemsRepository;

    public ReqItemsController( ReqItemsRepository reqItemsRepository) {
        this.reqItemsRepository = reqItemsRepository;
    }

    @PostMapping("/ReqItems")
    public ReqItems placeItems(@RequestBody ReqItems reqItems){
        return reqItemsRepository.save(reqItems);
    }


    @GetMapping("/ReqItems/{Id}")
    public List<ReqItems> getDataByID (@PathVariable("Id") String id){
        List<ReqItems> items  = reqItemsRepository.findReqItemsByReqOrderId(id);
        return items;
    }

}






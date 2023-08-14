package com.example.winobackend.Repository;

import com.example.winobackend.Model.ReqItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReqItemsRepository extends JpaRepository<ReqItems,Long> {

    List<ReqItems> findReqItemsByReqOrderId(String id);

    ReqItems findReqItemsByReqOrderIdIs(String id);


}
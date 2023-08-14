package com.example.winobackend.Repository;

import com.example.winobackend.Model.ReqOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReqOrdersRepository extends JpaRepository<ReqOrders,Long> {

    List<ReqOrders> findAllByRole(String role);

    List<ReqOrders> findByOrderStatus(String orderStatus);


//    List<ReqOrders> findByColumnName(String value);

//    @Query("SELECT COUNT(e) FROM ReqOrders e WHERE e.orderStatus = :Accepted")
//    long countByColumnNameAndValue(String specificValue, String value);

}

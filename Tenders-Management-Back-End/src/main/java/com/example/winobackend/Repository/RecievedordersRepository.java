package com.example.winobackend.Repository;

import com.example.winobackend.Model.RecievedOrders;
import com.example.winobackend.Model.ReqOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecievedordersRepository extends JpaRepository<RecievedOrders,Long> {

    List<RecievedOrders> findAllByRole(String role);

    List<RecievedOrders> findByStatusIsNull();

    List<RecievedOrders> findByStatusIsNotNull();
}

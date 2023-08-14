package com.example.winobackend.Repository;

import com.example.winobackend.Model.Quatations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuatationsRepository extends JpaRepository<Quatations,Long> {

    List<Quatations> findAllByReqOrderId(String id);


    List<Quatations> findAllByRole(String role);
}

package com.example.winobackend.Repository;


import com.example.winobackend.Model.Outstanding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutstandingRepository extends JpaRepository<Outstanding,Long> {

    List<Outstanding> findAllByStatus(String status);

    List<Outstanding> findByRoleAndStatus(String role, String status);

    @Query("SELECT o FROM Outstanding o WHERE o.chequeId IS NOT NULL")
    List<Outstanding> findByChequeIdNotNull();
}

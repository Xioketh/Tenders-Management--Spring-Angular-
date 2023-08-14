package com.example.winobackend.Repository;

import com.example.winobackend.Model.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SuppliersRepository extends JpaRepository<Suppliers,Long> {

}

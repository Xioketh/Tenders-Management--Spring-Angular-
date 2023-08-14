package com.example.winobackend.Model;

import javax.persistence.*;

@Entity
@Table(name = "outstanding")
public class Outstanding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="orderID")
    private String orderID;

    @Column(name="role")
    private String role;

    @Column(name="totAmount")
    private String totAmount;

    @Column(name="status")
    private String status;

    @Column(name="chequeId")
    private String chequeId;

    public Outstanding(){}

    public Outstanding(String orderID, String role, String totAmount, String status, String chequeId) {
        this.orderID = orderID;
        this.role = role;
        this.totAmount = totAmount;
        this.status = status;
        this.chequeId = chequeId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderID() {
        return orderID;
    }

    public void setOrderID(String orderID) {
        this.orderID = orderID;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTotAmount() {
        return totAmount;
    }

    public void setTotAmount(String totAmount) {
        this.totAmount = totAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getChequeId() {
        return chequeId;
    }

    public void setChequeId(String chequeId) {
        this.chequeId = chequeId;
    }
}

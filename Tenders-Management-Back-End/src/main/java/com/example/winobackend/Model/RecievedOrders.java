package com.example.winobackend.Model;

import org.springframework.data.jpa.repository.Temporal;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "RecievedOrders")
public class RecievedOrders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long OrderId;

    @Column(name="reqOrderId")
    private String reqOrderId;

    @Column(name="placedDate")
    private String placedDate;

    @Column(name="totAmount")
    private String totAmount;

    @Column(name="status")
    private String status;

    @Column(name="outstand")
    private String outstand;

    @Column(name="role")
    private String role;

    public RecievedOrders(){}

    public RecievedOrders(String reqOrderId, String placedDate, String totAmount, String status, String outstand, String role) {
        this.reqOrderId = reqOrderId;
        this.placedDate = placedDate;
        this.totAmount = totAmount;
        this.status = status;
        this.outstand = outstand;
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getOrderId() {
        return OrderId;
    }

    public void setOrderId(Long orderId) {
        OrderId = orderId;
    }

    public String getReqOrderId() {
        return reqOrderId;
    }

    public void setReqOrderId(String reqOrderId) {
        this.reqOrderId = reqOrderId;
    }

    public String getPlacedDate() {
        return placedDate;
    }

    public void setPlacedDate(String placedDate) {
        this.placedDate = placedDate;
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

    public String getOutstand() {
        return outstand;
    }

    public void setOutstand(String outstand) {
        this.outstand = outstand;
    }
}

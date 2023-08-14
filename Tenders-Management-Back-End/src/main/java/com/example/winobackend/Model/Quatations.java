package com.example.winobackend.Model;

import javax.persistence.*;

@Entity
@Table(name = "Quatations")
public class Quatations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="price")
    private String price;

    @Column(name="reqOrderId")
    private String reqOrderId;

    @Column(name="item")
    private String item;

    @Column(name="status")
    private String status;

    @Column(name="qty")
    private String qty;

    @Column(name="role")
    private String role;

    public Quatations(){

    }

    public Quatations(String price, String reqOrderId, String item, String status, String qty, String role) {
        this.price = price;
        this.reqOrderId = reqOrderId;
        this.item = item;
        this.status = status;
        this.qty = qty;
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getReqOrderId() {
        return reqOrderId;
    }

    public void setReqOrderId(String reqOrderId) {
        this.reqOrderId = reqOrderId;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }
}

package com.example.winobackend.Model;

import javax.persistence.*;

@Entity
@Table(name = "ReqItems")
public class ReqItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="reqOrderId")
    private String reqOrderId;

    @Column(name="item")
    private String item;

    @Column(name="quantity")
    private String qty;

    @Column(name="role")
    private String role;


    public ReqItems(){

    }

    public ReqItems(String reqOrderId, String item, String qty, String role) {
        this.reqOrderId = reqOrderId;
        this.item = item;
        this.qty = qty;
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getQty() {
        return qty;
    }

    public void setQty(String qty) {
        this.qty = qty;
    }
}

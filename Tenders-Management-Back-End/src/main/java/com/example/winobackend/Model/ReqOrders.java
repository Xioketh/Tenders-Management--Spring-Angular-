package com.example.winobackend.Model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="orders")
public class ReqOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="C_Name")
    private String companyName;

    @Column(name="Category")
    private String Category;

    @Column(name="mail_ID")
    private String emailID;

    @Column(name="role")
    private String role;

    @Column(name="phone_NO")
    private String phoneNO;

    @Column(name="date")
    private Date date;

    @Column(name="quatationRecieved")
    private String quatationRecieved;

    @Column(name="orderStatus")
    private String orderStatus;

    public ReqOrders(){

    }

    public ReqOrders(String companyName, String category, String emailID, String role, String phoneNO, Date date, String quatationRecieved, String orderStatus) {
        this.companyName = companyName;
        Category = category;
        this.emailID = emailID;
        this.role = role;
        this.phoneNO = phoneNO;
        this.date = date;
        this.quatationRecieved = quatationRecieved;
        this.orderStatus = orderStatus;
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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCategory() {
        return Category;
    }

    public void setCategory(String category) {
        Category = category;
    }

    public String getEmailID() {
        return emailID;
    }

    public void setEmailID(String emailID) {
        this.emailID = emailID;
    }

    public String getPhoneNO() {
        return phoneNO;
    }

    public void setPhoneNO(String phoneNO) {
        this.phoneNO = phoneNO;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getQuatationRecieved() {
        return quatationRecieved;
    }

    public void setQuatationRecieved(String quatationRecieved) {
        this.quatationRecieved = quatationRecieved;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
}

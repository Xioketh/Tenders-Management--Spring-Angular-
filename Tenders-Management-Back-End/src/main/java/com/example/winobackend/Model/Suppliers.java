package com.example.winobackend.Model;

import javax.persistence.*;

@Entity
@Table(name="suppliers")

public class Suppliers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "Address")
    private String Address;

    @Column(name = "Tell")
    private String Tell;

    @Column(name = "Email")
    private String email;


    public Suppliers(){

    }

    public Suppliers(String name, String address, String tell, String email) {
        name =name;
        Address = address;
        Tell = tell;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getTell() {
        return Tell;
    }

    public void setTell(String tell) {
        Tell = tell;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

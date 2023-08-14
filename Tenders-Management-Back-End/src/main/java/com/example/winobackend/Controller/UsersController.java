package com.example.winobackend.Controller;

import com.example.winobackend.Exception.ResourceNotFoundException;
import com.example.winobackend.Model.Suppliers;
import com.example.winobackend.Model.Users;
import com.example.winobackend.Repository.UsersRepository;
import com.example.winobackend.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Optional;

@RestController
//@RequestMapping("/api/v1")
@CrossOrigin
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UsersService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }


    @GetMapping("/Users/{userName}")
    public Optional<Users> getDataByEmail(@PathVariable("userName") String uname){

        Optional<Users> users= usersRepository.findById(uname);
        return users;
    }

    @GetMapping({"/userName}/exists"})
    public boolean checkIfUserNameExists(@PathVariable String userName) {
        return userService.isUserNameExists(userName);
    }


    @PostMapping({"/registerNewUser"})
    public Users registerNewUser(@RequestBody Users user) {

        return userService.registerNewUser(user);
    }

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }


    @PutMapping({"/updatePassword/{id}"})
    public ResponseEntity<Users> updateSupplier(@PathVariable String id, @RequestBody Users usersData){


        Users users = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No suppliers are exist" +id));

        users.setUserPassword(getEncodedPassword(usersData.getUserPassword()));


        Users updatedUser = usersRepository.save(users);
        return ResponseEntity.ok(updatedUser );
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

}
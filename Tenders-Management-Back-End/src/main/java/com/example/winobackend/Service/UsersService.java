package com.example.winobackend.Service;


import com.example.winobackend.Model.Role;
import com.example.winobackend.Model.Users;
import com.example.winobackend.Repository.RoleRepository;
import com.example.winobackend.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UsersService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleRepository.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleRepository.save(userRole);

        Users adminUser = new Users();
        adminUser.setUserName("admin");
        adminUser.setUserPassword(getEncodedPassword("admin"));
//        adminUser.setUserFirstName("admin");
//        adminUser.setUserLastName("admin");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        usersRepository.save(adminUser);

//        Users user = new Users();
//        user.setUserName("raj123");
//        user.setUserPassword(getEncodedPassword("raj@123"));
//        user.setUserFirstName("raj");
//        user.setUserLastName("sharma");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        usersRepository.save(user);
    }

    public Users registerNewUser(Users user) {
        Role role = roleRepository.findById("User").get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        return usersRepository.save(user);
    }

    public boolean isUserNameExists(String userName) {
        return usersRepository.checkIfUserNameExists(userName);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}

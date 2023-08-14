package com.example.winobackend.Repository;

import com.example.winobackend.Model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<Users,String> {

    @Query(value = "SELECT EXISTS(SELECT 1 FROM users WHERE user_name = ?1) AS user_exists", nativeQuery = true)
    public boolean checkIfUserNameExists(String userName);

}

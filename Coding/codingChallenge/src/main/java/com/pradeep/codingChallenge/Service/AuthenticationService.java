package com.pradeep.codingChallenge.Service;

import com.pradeep.codingChallenge.Entity.Employee;
import com.pradeep.codingChallenge.Repository.EmployeeRepo;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private EmployeeRepo employeeRepo;

    public ResponseEntity<Employee> loadUser(String username, String password) {
        Employee employee = employeeRepo.findByName(username);
        if(employee != null && employee.getPassword().equals(password)) {
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    private Boolean checkPass(String plainPassword, String hashedPassword) {
        System.out.println(plainPassword);
        System.out.println(BCrypt.hashpw(plainPassword, BCrypt.gensalt()));
        System.out.println(hashedPassword);
        return (BCrypt.hashpw(plainPassword, BCrypt.gensalt()) == hashedPassword);
    }

}

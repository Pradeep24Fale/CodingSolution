package com.pradeep.codingChallenge.Contoller;

import com.pradeep.codingChallenge.Entity.Employee;
import com.pradeep.codingChallenge.Entity.EmployeeModel;
import com.pradeep.codingChallenge.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // getEmployee
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() throws Exception {
        return employeeService.getAllEmployees();
    }
    // get employee by ID

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") long id) throws Exception {
        return employeeService.getEmployee(id);
    }
    // create employee

    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeModel employee) {
        return employeeService.createEmployee(employee);
    }
    // update employee
    @PutMapping("/employee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    // delete employee

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable("id") long id) {
            return employeeService.deleteEmployee(id);
    }

}

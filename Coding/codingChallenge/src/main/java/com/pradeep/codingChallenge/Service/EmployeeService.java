package com.pradeep.codingChallenge.Service;

import com.pradeep.codingChallenge.Entity.Employee;
import com.pradeep.codingChallenge.Entity.EmployeeModel;
import com.pradeep.codingChallenge.Repository.EmployeeRepo;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employees = (List<Employee>) this.employeeRepo.findAll();

            if (employees.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Employee> getEmployee(long id) {
        Optional<Employee> employee = employeeRepo.findById(id);
        if (employee.isPresent()) {
            return new ResponseEntity<>(employee.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Employee> createEmployee(EmployeeModel employee) {
        try {
            Employee checkEmployee = employeeRepo.findByName(employee.getName());
            if (checkEmployee == null) {
                Employee emp = new Employee();
                emp.setName(employee.getName());
                emp.setPassword(employee.getPassword());
                emp.setReviewEmpId(employee.getReviewEmpId());
                emp.setReviewStatus(0); // not reviewed
                emp.setAdmin(employee.getAdmin());
                if (employee.getReviewEmpId() != null) {
                    Optional<Employee> empTobeReview = employeeRepo.findById(employee.getReviewEmpId());
                    Employee _employee1 = empTobeReview.get();
                    _employee1.setReviewStatus(2); // assigned
                    employeeRepo.save(_employee1);
                    emp.setEmpStatus(1); // busy
                } else {
                    emp.setEmpStatus(0); // free
                }
                Employee _employee = employeeRepo
                        .save(emp);
                return new ResponseEntity<>(_employee, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Employee> updateEmployee(long id, Employee employee) {
        Optional<Employee> employeeData = employeeRepo.findById(id);

        if (employeeData.isPresent()) {
            Employee _employee = this.updateEmployee(employeeData, employee);
            return new ResponseEntity<>(employeeRepo.save(_employee), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> deleteEmployee(long id) {
        try {
            employeeRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Employee updateEmployee(Optional<Employee> employeeData, Employee employee) {
        Employee _employee = employeeData.get();
        _employee.setName(employee.getName());
        _employee.setAdmin(employee.getAdmin());
        if(employee.getAdmin() == 1) {
            _employee.setReviewEmpId(null);
            _employee.setReviewStatus(0);
            _employee.setEmpStatus(0);
            if(employee.getReviewEmpId() != null && employee.getEmpStatus() == 1) {
                Optional<Employee> empTobeReview = employeeRepo.findById(employee.getReviewEmpId());
                Employee _employeeToReview = empTobeReview.get();
                _employeeToReview.setReviewStatus(0); // Not Assign
                employeeRepo.save(_employeeToReview);
            }
        } else {
            if (_employee.getEmpStatus() != 1) {
                _employee.setReviewEmpId(employee.getReviewEmpId());
            }
            if (employee.getReviewEmpId() != null) {
                Optional<Employee> empTobeReview = employeeRepo.findById(employee.getReviewEmpId());
                Employee _employeeTobeReview = empTobeReview.get();
                _employeeTobeReview.setReviewStatus(2); // assigned
                employeeRepo.save(_employeeTobeReview);
                _employee.setEmpStatus(1); // busy
            } else {
                _employee.setEmpStatus(0); // free
            }
        }
        return _employee;

    }

    private String hashPassword(String plainTextPassword) {
        return BCrypt.hashpw(plainTextPassword, BCrypt.gensalt());
    }

}

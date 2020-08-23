package com.pradeep.codingChallenge.Repository;

import com.pradeep.codingChallenge.Entity.Employee;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends CrudRepository<Employee, Long> {

    @Override
    @Query("select employee from Employee employee")
    Iterable<Employee> findAll();

    @Query("select employee from Employee employee where employee.name = ?1")
    Employee findByName(String name);
}

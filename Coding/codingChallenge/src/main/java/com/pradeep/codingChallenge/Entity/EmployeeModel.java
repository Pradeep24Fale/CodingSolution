package com.pradeep.codingChallenge.Entity;

public class EmployeeModel {
    private Long empId;
    private String name;
    private String password;
    private Long reviewEmpId; // employee to be review
    private int reviewStatus; // completed, not assign, in-progress

    private int empStatus; // free, busy.
    private int admin;

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getReviewEmpId() {
        return reviewEmpId;
    }

    public void setReviewEmpId(Long reviewEmpId) {
        this.reviewEmpId = reviewEmpId;
    }

    public int getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(int reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public int getEmpStatus() {
        return empStatus;
    }

    public void setEmpStatus(int empStatus) {
        this.empStatus = empStatus;
    }

    public int getAdmin() {
        return admin;
    }

    public void setAdmin(int admin) {
        this.admin = admin;
    }
}

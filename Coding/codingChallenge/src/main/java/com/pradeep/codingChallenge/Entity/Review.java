package com.pradeep.codingChallenge.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "reviewId")
public class Review {
    private Long reviewId;
    private String title;
    private String subtitle;
    private int priority;
    private Set<EmployeeReview> empReview = new HashSet<>();

    public Review() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String question) {
        this.title = question;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "review")
    @JsonIgnore
    public Set<EmployeeReview> getEmpReview() {
        return empReview;
    }

    public void setEmpReview(Set<EmployeeReview> empReview) {
        this.empReview = empReview;
    }
}

package com.pradeep.codingChallenge.Service;

import com.pradeep.codingChallenge.Entity.EmpReviewsModel;
import com.pradeep.codingChallenge.Entity.Employee;
import com.pradeep.codingChallenge.Entity.EmployeeReview;
import com.pradeep.codingChallenge.Entity.Review;
import com.pradeep.codingChallenge.Repository.EmployeeRepo;
import com.pradeep.codingChallenge.Repository.EmployeeReviewRepo;
import com.pradeep.codingChallenge.Repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private EmployeeReviewRepo employeeReviewRepo;
    
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            List<Review> reviews = (List<Review>) this.reviewRepo.findAll();

            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Review> getReview(long id) {
        Optional<Review> review = reviewRepo.findById(id);
        if(review.isPresent()) {
            return new ResponseEntity<>(review.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<Review> createReview(Review review) {
        try {
            Review rev = new Review();
            rev.setTitle(review.getTitle());
            rev.setSubtitle(review.getSubtitle());
            rev.setPriority(review.getPriority());
            Review _review = reviewRepo
                    .save(rev);
            return new ResponseEntity<>(_review, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public ResponseEntity<Review> updateReview(long id, Review review) {
        Optional<Review> reviewData = reviewRepo.findById(id);

        if (reviewData.isPresent()) {
            Review _review = reviewData.get();
            _review.setTitle(review.getTitle());
            _review.setSubtitle(review.getSubtitle());
            _review.setPriority(review.getPriority());
            return new ResponseEntity<>(reviewRepo.save(_review), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> deleteReview(long id) {
        try {
            reviewRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public ResponseEntity<HttpStatus> employeeFeedBack(long empId, long reviewEmpId, List<EmpReviewsModel> empReviewsModels) {
        try {
            if(empId != reviewEmpId) {
                Optional<Employee> reviewer = employeeRepo.findById(empId);
                Optional<Employee> empTobeReview = employeeRepo.findById(reviewEmpId);
                List<EmployeeReview> employeeReviews = new ArrayList<>();
                if (reviewer.isPresent() && empTobeReview.isPresent()) {
                    Employee _employee = reviewer.get();
                    _employee.setEmpStatus(0);
                    _employee.setReviewEmpId(null);
                    employeeRepo.save(_employee);

                    Employee _employee1 = empTobeReview.get();
                    _employee1.setReviewStatus(1); // Reviewed
                    employeeRepo.save(_employee1);

                    for (EmpReviewsModel element : empReviewsModels) {
                        Optional<Review> review = reviewRepo.findById(element.getReviewId());
                        EmployeeReview employeeReview = new EmployeeReview();
                        employeeReview.setAnswer(element.getAnswer());
                        employeeReview.setEmployee(empTobeReview.get());
                        employeeReview.setReview(review.get());
                        employeeReviews.add(employeeReview);
                    }
                    employeeReviewRepo.saveAll(employeeReviews);
                    return new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

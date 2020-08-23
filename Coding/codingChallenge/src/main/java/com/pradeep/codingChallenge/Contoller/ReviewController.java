package com.pradeep.codingChallenge.Contoller;

import com.pradeep.codingChallenge.Entity.EmpReviewsModel;
import com.pradeep.codingChallenge.Entity.Review;
import com.pradeep.codingChallenge.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // getReview
    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllReviews() throws Exception {
        return reviewService.getAllReviews();
    }
    // get review by ID

    @GetMapping("/review/{id}")
    public ResponseEntity<Review> getReview(@PathVariable("id") long id) throws Exception {
        return reviewService.getReview(id);
    }
    // create review

    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }
    // update review
    @PutMapping("/review/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable("id") long id, @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }

    // delete review

    @DeleteMapping("/review/{id}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable("id") long id) {
        return reviewService.deleteReview(id);
    }

    @PostMapping("/feedback/{empId}/{reviewEmpId}")
    public ResponseEntity<HttpStatus> employeeFeedBack(@PathVariable("empId") long empId, @PathVariable("reviewEmpId") long reviewEmpId , @RequestBody List<EmpReviewsModel> empReviewsModels) {
        return reviewService.employeeFeedBack(empId, reviewEmpId, empReviewsModels);
    }

}

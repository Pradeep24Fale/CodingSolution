package com.pradeep.codingChallenge.Repository;

import com.pradeep.codingChallenge.Entity.EmployeeReview;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeReviewRepo extends CrudRepository<EmployeeReview, Long> {
}

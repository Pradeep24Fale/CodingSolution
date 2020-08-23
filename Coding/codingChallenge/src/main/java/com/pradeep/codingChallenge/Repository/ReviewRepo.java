package com.pradeep.codingChallenge.Repository;

import com.pradeep.codingChallenge.Entity.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepo extends CrudRepository<Review, Long> {
}

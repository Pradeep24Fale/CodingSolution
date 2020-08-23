package com.pradeep.codingChallenge.Contoller;

import com.pradeep.codingChallenge.Entity.AuthenticationRequest;
import com.pradeep.codingChallenge.Service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.loadUser(authenticationRequest.getUsername(), authenticationRequest.getPassword());
    }

}

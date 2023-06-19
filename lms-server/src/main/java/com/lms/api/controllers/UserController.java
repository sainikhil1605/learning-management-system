package com.lms.api.controllers;

import com.lms.api.config.JwtTokenUtil;
import com.lms.api.models.DAOUser;
import com.lms.api.models.JwtResponse;
import com.lms.api.models.UserDTO;
import com.lms.api.services.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody UserDTO userDTO){
        UserDTO user= jwtUserDetailsService.save(userDTO);

        return ResponseEntity.ok(jwtTokenUtil.getToken(user));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO){
        try {
            Authentication authentication;
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDTO principal= (UserDTO) authentication.getPrincipal();
            return ResponseEntity.ok(jwtTokenUtil.getToken(principal));

        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.badRequest().body("Invalid Credentials");
        }

    }
}

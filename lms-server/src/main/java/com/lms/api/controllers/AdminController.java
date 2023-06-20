package com.lms.api.controllers;

import com.lms.api.models.AdminDTO;
import com.lms.api.models.DAOAdmin;
import com.lms.api.services.AdminService;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
    @Autowired
    private AdminService   adminService;
    @PostMapping()
//    @EnableMethodSecurity(prePostEnabled = true)
    public ResponseEntity<?> createAdmin(@RequestBody  AdminDTO adminDTO){
        try {
            return  ResponseEntity.ok(adminService.save(adminDTO)) ;
            }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping()
    public  ResponseEntity<?> getAllAdmins(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           @RequestParam(defaultValue = "adminId,asc") String[] sort){
        try {
            return ResponseEntity.ok(adminService.getAllAdmins(page,size,sort));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

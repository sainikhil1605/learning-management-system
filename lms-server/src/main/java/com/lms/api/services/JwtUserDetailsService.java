package com.lms.api.services;

import com.lms.api.models.DAOUser;
import com.lms.api.models.JwtResponse;
import com.lms.api.models.UserDTO;
import com.lms.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public UserDTO loadUserByUsername(String username){
        DAOUser user = userRepository.findByEmail(username);
        return UserDTO.builder().email(user.getEmail()).password(user.getPassword()).roles(user.getRoles()).shouldResetPassword(user.isShouldResetPassword()).build();

    }
    public UserDTO save(UserDTO userDTO){
        DAOUser newUser = DAOUser.builder().email(userDTO.getEmail()).password(new BCryptPasswordEncoder().encode(userDTO.getPassword())).roles(userDTO.getRoles()).shouldResetPassword(userDTO.isShouldResetPassword()).build();
        DAOUser user = userRepository.save(newUser);
        return UserDTO.builder().email(user.getEmail()).password(user.getPassword()).roles(user.getRoles()).shouldResetPassword(user.isShouldResetPassword()).build();
    }

}

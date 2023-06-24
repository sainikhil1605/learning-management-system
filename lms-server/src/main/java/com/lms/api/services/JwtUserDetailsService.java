package com.lms.api.services;

import com.lms.api.models.user.DAOUser;
import com.lms.api.models.user.UserDTO;
import com.lms.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    public UserDTO save(UserDTO userDTO) {
        DAOUser newUser = DAOUser.builder().email(userDTO.getEmail()).password(new BCryptPasswordEncoder().encode(userDTO.getPassword())).roles(userDTO.getRoles()).shouldResetPassword(userDTO.isShouldResetPassword()).build();
        DAOUser user = userRepository.save(newUser);
        return UserDTO.builder().email(user.getEmail()).password(user.getPassword()).roles(user.getRoles()).shouldResetPassword(user.isShouldResetPassword()).build();
    }

}

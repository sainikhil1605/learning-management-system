package com.lms.api.services;

import com.lms.api.models.admin.AdminDTO;
import com.lms.api.models.admin.DAOAdmin;
import com.lms.api.models.user.DAOUser;
import com.lms.api.repositories.AdminRepository;
import com.lms.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public DAOAdmin save(AdminDTO adminDTO){
        DAOUser user=userRepository.save(DAOUser.builder().email(adminDTO.getEmail()).password(passwordEncoder.encode(adminDTO.getPassword())).roles(adminDTO.getRoles()).shouldResetPassword(adminDTO.isShouldResetPassword()).build());
        DAOAdmin admin=DAOAdmin.builder().firstName(adminDTO.getFirstName()).lastName(adminDTO.getLastName()).adminUserId(user).build();
        return adminRepository.save(admin);
    }
    private Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }
    public Collection<DAOAdmin> getAllAdmins(int page, int size, String[] sort) {
        ArrayList<DAOAdmin> admins = new ArrayList<>();
        try {
            List<Order> orders = new ArrayList<>();

            if (sort[0].contains(",")) {
                // will sort more than 2 columns
                for (String sortOrder : sort) {
                    // sortOrder="column, direction"
                    String[] _sort = sortOrder.split(",");
                    orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
                }
            } else {
                // sort=[column, direction]
                orders.add(new Order(getSortDirection(sort[1]), sort[0]));
            }

            Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

            for (DAOAdmin admin : adminRepository.findAll(pageable)) {
                admin.getAdminUserId().setPassword(null);
                admins.add(admin);
            }
            return admins;
        }catch (Exception e){
            throw e;
        }
    }
}

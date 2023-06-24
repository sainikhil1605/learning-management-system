package com.lms.api.repositories;

import com.lms.api.models.user.DAOUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<DAOUser, Long> {
    DAOUser findByEmail(String email);
}

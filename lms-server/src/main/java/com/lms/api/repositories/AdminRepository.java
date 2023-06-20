package com.lms.api.repositories;

import com.lms.api.models.DAOAdmin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AdminRepository extends JpaRepository<DAOAdmin,Long> {
    Page<DAOAdmin> findAll(Pageable pageable);
}

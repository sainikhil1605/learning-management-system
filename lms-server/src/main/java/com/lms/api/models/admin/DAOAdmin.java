package com.lms.api.models.admin;


import com.lms.api.models.user.DAOUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "admin")
public class DAOAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long adminId;
    private String firstName;
    private String lastName;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_user_id", referencedColumnName = "id")
    private DAOUser adminUserId;


}

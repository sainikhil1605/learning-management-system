package com.lms.api.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user")
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class DAOUser {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String roles;
    @Column
    private boolean shouldResetPassword;

}

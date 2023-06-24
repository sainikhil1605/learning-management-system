package com.lms.api.models.user;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user",uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class DAOUser {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="id")
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

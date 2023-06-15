package com.lms.api.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="user")
@AllArgsConstructor
@ToString
@Getter
@Setter
@NoArgsConstructor
public class DAOUser {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String roles;


}

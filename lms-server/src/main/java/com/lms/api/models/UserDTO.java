package com.lms.api.models;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class UserDTO {
    private long id;
    private String username;
    private String password;
    private String roles;
}

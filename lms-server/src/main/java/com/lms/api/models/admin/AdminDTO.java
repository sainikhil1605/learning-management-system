package com.lms.api.models.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
    private long adminId;
    private long adminUserId;
    private String email;
    private String password;
    private String roles;
    private boolean shouldResetPassword=true;
    private String firstName;
    private String lastName;
}

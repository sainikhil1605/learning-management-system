package com.lms.api.models.institution;

import com.lms.api.models.admin.DAOAdmin;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "institution")
@AllArgsConstructor
@NoArgsConstructor
public class DAOInstitution
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long institutionId;
    private String institutionName;
    private String institutionAddress;
    private String institutionContact;
    private String institutionEmail;
    private String institutionWebsite;
    private String institutionType;
    private String institutionDescription;
    private String institutionCreatedBy;
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="institutionAdmin", referencedColumnName = "adminId")
    private DAOAdmin institutionAdmin;

}

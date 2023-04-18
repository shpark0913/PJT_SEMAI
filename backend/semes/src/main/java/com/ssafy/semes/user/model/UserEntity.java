package com.ssafy.semes.user.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
public class UserEntity implements Serializable {
    private static final long serialVersionUID = -4253749884585192245L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx", nullable = false)
    private long userIdx;

    @Column(name = "user_name", length = 20, nullable = false)
    private String userName;

    @Column(name = "user_role", length = 10, nullable = false, columnDefinition ="varchar(10) DEFAULT '사용자'")
    private String userRole;

    @Column(name = "user_id",length = 20,nullable = false)
    private String userId;

    @Column(name = "user_pwd",length = 20,nullable = false)
    private String userPwd;

}

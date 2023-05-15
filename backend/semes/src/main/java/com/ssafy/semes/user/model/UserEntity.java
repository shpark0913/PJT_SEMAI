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
    /** 유저 고유 번호  UserEntity PK */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx", nullable = false)
    private long userIdx;

    /** 유저 일므   <br>
     * Column  user_name <br>
     * varchar(20) <br>
     * notNull <br>
     */
    @Column(name = "user_name", length = 20, nullable = false)
    private String userName;

    /** 유저 권한   <br>
     * Column  user_role <br>
     * varchar(10) <br>
     * notNull <br>
     * DEFAULT '사용자'
     */
    @Column(name = "user_role", length = 10, nullable = false, columnDefinition ="varchar(10) DEFAULT '사용자'")
    private String userRole;

    /** 유저 아이디   <br>
     * Column  user_id <br>
     * varchar(20) <br>
     * notNull <br>
     */
    @Column(name = "user_id",length = 20,nullable = false)
    private String userId;

    /** 유저 비밀번호   <br>
     * Column  user_pwd <br>
     * varchar(20) <br>
     * notNull <br>
     */
    @Column(name = "user_pwd",length = 20,nullable = false)
    private String userPwd;

}

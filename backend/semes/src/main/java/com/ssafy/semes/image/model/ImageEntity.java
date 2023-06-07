package com.ssafy.semes.image.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ssafy.semes.common.Directory;
import org.hibernate.annotations.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id", nullable = false)
    private Long fileId;

    @Column(name = "origin_name",length = 100,nullable = false)
    private String originName;

    @Column(name = "file_dir",length = 50,nullable = false)
    private String fileDir;

    @Column(name = "save_name",length = 200,nullable = false)
    private String saveName;
    @Column(name = "status",nullable = false, columnDefinition="tinyint(1) default 1")
    @Comment("0 : 삭제, 1: 기본, 2:학습용 데이터")
    private int status;

    public String markingUrl(){
        StringBuilder sb = new StringBuilder();
        return sb.append('/').append(Directory.getBaseDirectories()[status].getPath())
                .append('/').append(fileDir)
                .append('/').append(saveName).toString();
    }
    public String originUrl(){
        StringBuilder sb = new StringBuilder();
        return sb.append('/').append(Directory.getBaseDirectories()[status].getPath())
                .append('/').append(Directory.WHEEL_ORIGIN)
                .append('/').append(saveName).toString();
    }
}

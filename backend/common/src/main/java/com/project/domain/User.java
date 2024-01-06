package com.project.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class User {
    private Integer stuId; //学生号
    private String password; //密码
    private String name; //自定义用户名
    private Double money; //用户余额
    private String photo; //用户头像
    private Double totalScore; //用户总评分
    private Integer count; //用火狐被评价次数
}
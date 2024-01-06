package com.project.dao;

import com.project.domain.User;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserDao {
    @Insert("insert into users values(#{stuId},#{password},#{name},#{money},#{photo},#{totalScore},#{count})")
    void addUser(User user);
    /**
     * 更改用户信息
     * @return 如果更改成功，则返回 1，否则返回 0
     */
    @Update("update users set password = #{newPwd} where stu_id = #{stuId} and password = #{oldPwd}")
    Integer setPwd(Integer stuId,String oldPwd,String newPwd);
    @Update("update users set money = money + #{money} where stu_id = #{stuId}")
    Integer setMoney1(@Param("money") Integer money,@Param("stuId") Integer stuId);

    @Update("update users set money = money - #{money} where stu_id = #{stuId}")
    Integer setMoney2(Integer money,Integer stuId);

    @Select("select * from users where stu_id = #{stuId} and password=#{password}")
    User getUser(@Param("stuId") Integer stuId,@Param("password") String password);
    @Select("select * from users where stu_id = #{stuId}")
    User getUser2(Integer stuId);
    @Select("select money from users where stu_id = #{stuId}")
    Integer getMoney(Integer stuId);

    @Update("update users set name = #{newName} where stu_id = #{stuId}")
    Integer updateName(@Param("stuId") Integer stuId,@Param("newName") String newName);

    @Update("update users set photo = #{photo} where stu_id = #{stuId}")
    Integer updatePhoto(@Param("stuId") Integer stuId,@Param("photo") String photo);



}

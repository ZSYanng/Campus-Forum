package com.project.dao;

import com.project.domain.Evaluation;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EvalDao {
    @Insert("insert into evaluation values(#{point},#{text},#{pic},#{orderId},#{client},#{server})")
    void addEval(Evaluation evaluation);

    @Select("select * from evaluation where server = #{server}")
    List<Evaluation> getEval(Integer server);

    @Update("update users set count = count + 1 where stuId = #{stuId}")
    Integer updateCount(Integer stuId);

    @Update("update users set totalScore = totalScore + #{score} where stuId = #{stuId}")
    Integer updateScore(@Param("stuId") Integer stuId, @Param("score") Double score);
}

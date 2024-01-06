package com.project.controller;

import com.project.domain.PayBean;
import com.project.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/pay")
@CrossOrigin
public class PayController {
    @Autowired
    private PayService payService;

    @RequestMapping
    @ResponseBody
    public String pay(PayBean payBean, HttpServletRequest request){
        return payService.pay(payBean, request.getParameter("money"));
    }
    @RequestMapping("/success")
    public void success(HttpServletResponse response){
        try {
            response.sendRedirect("http://localhost:3000/homepage");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

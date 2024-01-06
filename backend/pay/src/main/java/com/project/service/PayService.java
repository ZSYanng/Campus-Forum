package com.project.service;

import cn.hutool.json.JSONUtil;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.project.domain.PayBean;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PayService {
    private final String appId = "2021000122693720";
    private final String privateKey = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2mMY3XpiYmQ/jtl5f7VlLZ6KaSWTVW1+EaDch81j+S1m88oM6LQugtGeCWb+gEnH0Ls45RZhbHxqqpcOdwl1fQSrEoD5SJGs8OzL2WcesxuRPhwAfdtqibFRjdIrNjn+Y4tg2UWS7s8jya3fitVvq1N/5rBBgvSqHBsTmBgX23yJpvlDf9hczAEKGx5s3CkmuBOFvWVf3S3ngKWC//n1y0+pZgEwmbUXjqhpKEMsUnv1FUuDPfgCd9fbedEmwbmpAWs5c2CHvzHm/X+uhrqsmckl8quSpL0sVayxda+toRtrBHaRgWLTfnXGlRmMhdzbTlXXNW5vHUU9YLmaz4Xl/AgMBAAECggEAWquMKex4O7YttLZXMK0sXQwuKwzs3CFOUfJqBhrPgx6phfCqhxXdI0TR7WFhjTv7h/RCBSBw4jaUyE4dz9W3BdjXQuILcECTW0pOKRQ12a69qlvwDK+5K1Q9p1E0p5Pt+l4SXQ6XxbklvHLvCg1igj6IpXLygwcL+ha7aTludsJI+GEjZmhToHTSDqE3HMVUPq1xpR/EufxZ306RRO+CHpZRjee7VKC2Ug1WA5x1DsKDqDrzh9/OcYpRiKebhDuAwrfCkaAMGA6Id98ASWP5g84g/hcm6OkldHuuahlM6xCMTtVYteWMYBaIn0qxsr7GdtD7UpdpMkIFyD8hX78ZiQKBgQDplmqFqeZ1RvN00XTmrIrlOlmajIMf5VgZevV1XdhQfK1QqX87zQkgy2BeBCYCVk4dq6valYrCzKN+NA4Mpmsegh7rakBwG2BCpIbLjlubWTbhcxGEy4ciK9mHjdESfrIw56cdc6cEIbI7UA5VfLYTNcQKB4VWaK3f49wfEOR12wKBgQDIHeCfM5veXLn5FKnAEMiPCIGG2iQbR9Xw7/b1EiwJJwOd6Pqkl0DNEgdrkineS8Rfy4Fwo1nXiNWG43Q/UlhnXFbDnsEXKFR0SZZYX4Bxw9+rLzEqsA3i/2nE7H4yhFvNJsEU48F16z8SUkQ7Ebm+MluicszXN6yBUS6v1GLmLQKBgQCxrtWAr2i6tSnkJqBCB+Xv0J7wTQpBbPfDCiFFEgnFz9EWlphOKP1UkN/RJF61UGlDcJ7dOvu+imOjUH2Padf58QkMElrJ7Ekg6H4QwU01sntoq1scJKW6fJiP4HS1GOL7CHu6j4rwPaGSNKdyp9bobfGdn3Lx89avhGigyPzAGQKBgC4Tww6lIXSXwTJ68YMJ2kQk3z4fqESny7kIZ8KSBpWs6AZKCLwxH3iYeCDqrL1EkNjF0O4QjrU0CoZehPu3iCd0eX3dZfRhEuEbuIRsqPSI901BNn7vvqLP0JjJI12aYFDiZX7b2kW+fu1HB/LZ5/zFN5g1+rhrV0sHWEqgCo2ZAoGAeLYAUHV4TIa0lBxeQDhPnh0mr65CXqNVT48b6Uc1MmHf3WbnrrOkR/FAvL3zpA1D77TOtFcWeJv3OnQv+WtiL9+BacZQQu7RmIIXiZQ38wA7uYFrkkaK3UdJ414KDCeLHr6BwX5fQmocFeZQFMJ8w/ovBYo2eW3rG3KxvWuWn/E=";
    private final String publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsdg5llKmsb4LD+OcPVrRPcU841lpmjy/rMYMR8UX4OR5ykBvr8+ZBHzxkWSY9U3CARihpNrUf6gD6O6veqHVIgRbbXFkSJ7hPP/HKZYA0NfTAhRT0elalGkvdBCfjyrSg/e7eA69l8cTf0Rq6TLZEBqj4B/wgtfyYa84S6c4/pnHaadVoLHn4HHwKahQtM6grSCbloIPclpcSyYgvaJXjprgOWOw6fH+S7lqjG5OoTZJWPnwB5CNzNPn6WJsj5uyo7cs2PRnSx6AleNkHOX5JKuAyMHvavVzCojct5qODiYur5oN/8UlbiaR1SlYKkv5HoidARZ3pf3MgAHGzRoapQIDAQAB";
    private final String notifyUrl = "http://localhost:8091/pay/success";
    private final String returnUrl = "http://localhost:8091/pay/success";
    private final String signType = "RSA2";
    private final String charset = "utf-8";
    private final String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
    private final String format = "json";
    public String pay(PayBean payBean,String money){
        payBean.setOut_trade_no(UUID.randomUUID().toString().replaceAll("-",""));
        payBean.setSubject("订单名称");
        payBean.setTotal_amount(money);

        AlipayClient alipayClient = new DefaultAlipayClient(gatewayUrl, appId, privateKey, format, charset, publicKey, signType);
        //PC网页支付使用AlipayTradePagePayRequest传参，下面调用的是pageExecute方法
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(returnUrl);
        alipayRequest.setNotifyUrl(notifyUrl);
        alipayRequest.setBizContent(JSONUtil.toJsonStr(payBean));

        // 调用SDK生成表单
        String result = null;
        try {
            result = alipayClient.pageExecute(alipayRequest).getBody();
        } catch (AlipayApiException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}

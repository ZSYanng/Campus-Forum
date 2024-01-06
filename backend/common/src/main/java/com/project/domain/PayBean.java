package com.project.domain;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PayBean implements Serializable {
    private String out_trade_no;
    private String subject;
    private String total_amount;
    private String product_code = "FAST_INSTANT_TRADE_PAY";
}

import React, { useEffect, useState } from "react";
import styles from "./ChargeMoneyCard.module.css";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Upload,
  message,
  Button,
  Rate,
  Form,
  InputNumber,
} from "antd";
import axios from "axios";

export default function ChargeMoneyCard(props) {
  const [money, setMoney] = useState();

  const changeMoney = (e) => {
    setMoney(e);
  };

  const submitCharge = () => {
    var formData = new FormData();
    formData.append("money", money);
    var formData_set = new FormData();
    formData_set.append("money", money);
    formData_set.append("type", 1);
    formData_set.append("user", localStorage.getItem("stuId"));
    console.log(formData_set.get("user"));
    axios({
      method: "post",
      url: "http://localhost:8091/pay",
      data: formData,
    })
      .then(function (res) {
        console.log(res.data);
        axios({
          method: "post",
          url: "http://localhost:8081/user/setMoney",
          data: formData_set,
        })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });

        let divForm = document.getElementsByTagName("divform");
        if (divForm.length) {
          document.body.removeChild(divForm[0]);
        }
        const div = document.createElement("divform");
        div.innerHTML = res.data; // res.data就是sb支付宝返回给你的form
        document.body.appendChild(div);
        document.forms[0].setAttribute("target", "_blank"); // 加了_blank可能出问题所以我注释了
        document.getElementsByName("punchout_form")[0].submit();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className={styles.maskbox}>
      <div className={styles.commentCard}>
        <div className={styles.closeBox}>
          <div className={styles.titleBox}>充值订单</div>
          <button className={styles.cardCloseBtn} onClick={props.showMoneyCard}>
            <CloseOutlined />
          </button>
        </div>
        <div className={styles.commentBox}>
          <Row>
            <Col span={6}>
              <div className={styles.commentTitle}>用户账号</div>
            </Col>
            <Col span={18}>
              <div className={styles.scoreBox}>
                <div>{localStorage.getItem("stuId")}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <div className={styles.commentTitle}>剩余金额</div>
            </Col>
            <Col span={18}>
              <div className={styles.scoreBox}>
                <div>￥ 123</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles.commentTitle1}>
              <span>充值金额</span>
            </Col>
            <Col span={18}>
              <div>
                <InputNumber
                  onChange={changeMoney}
                  addonBefore="￥"
                ></InputNumber>
                <div style={{ color: "#6f6f6f", fontSize: '10px' }}>虚拟货币:账户余额=1:1</div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className={styles.commentSubmit}>
                <Button onClick={submitCharge}>提交</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

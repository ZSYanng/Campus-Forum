import styles from "./OrderInfo.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { Breadcrumb, Tag, Row, Col, Rate, Button, Carousel } from "antd";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const OrderInfo = (props) => {
  const releasedOrderNum = 4;
  const acceptedOrderNum = 11;
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});
  const [score, setScore] = useState(0);

  const checkComment = () => {
    navigate('/comment', { state: { client_id: props.client_id.toString() } });
  }

  useEffect(() => {
    axios({
      url: 'http://localhost:8011/user/info',
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        orderId: props.order_id
      }
    }).then(function (response) {
      var state = JSON.parse(response.data.data);
      setDetail(state)
    })
      .catch(function (err) {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    if (detail.mark && detail) {
      setScore(detail.mark)
    }
  }, [detail])


  return (
    <div className={styles.maskbox}>
      <div className={styles.orderInfoCard}>
        <div className={styles.closeBox}>
          <Breadcrumb />
          <button className={styles.cardCloseBtn} onClick={props.showInfo}>
            <CloseOutlined />
          </button>
        </div>
        <div className={styles.mainBox}>
          <div className={styles.infoBox2}>
            <Carousel autoplay className={styles.picsBox}>
              {/* {
                detail.picture.map(item => (
                  <image src={item} className={styles.picsStyle}></image>
                ))
              } */}
              <img src={detail.picture} className={styles.picsStyle} />
            </Carousel>
            <div className={styles.orderTitle}>
              {detail.title}  ￥{detail.reward}
            </div>
            <div className={styles.descriptBox}>
              {detail.description}
            </div>
          </div>
          <div className={styles.infoBox3}>
            <div className={styles.infoBox1}>
              <div className={styles.sellerInfo}>
                <img src={detail.photo} className={styles.sellerAvatar} />
                <div className={styles.basicInfo}>
                  <Row>
                    <Col span={6}>卖家</Col>
                    <Col span={18}>{detail.name}</Col>
                  </Row>
                  <Row>
                    <Col span={6}>评分</Col>
                    <Col span={18}>
                      <Rate disabled value={score} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      发布订单{releasedOrderNum}个，接受订单{acceptedOrderNum}
                      个。
                    </Col>
                  </Row>
                </div>
                <Button onClick={checkComment}>查看评价</Button>
              </div>
            </div>
            <div className={styles.btnBox}>
              <Button className={styles.btnStyle}>聊天</Button>
              <Button className={styles.btnStyle}>购买</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

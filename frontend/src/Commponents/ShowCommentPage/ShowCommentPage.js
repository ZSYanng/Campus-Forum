import { Col, Layout, Row, Rate, Button, Radio, Card } from "antd";
import styles from "./ShowCommentPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewOrder } from "../NewOrder/NewOrder";
import { CommentPage } from "../Comment/CommentPage";
import { ShowCommentCard } from "./ShowCommentCard";
import { useLocation } from "react-router-dom";
import HeaderNav from "../MainPage/HeaderNav/HeaderNav";

const { Header, Content } = Layout;


export const ShowCommentPage = () => {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [commentDetail, setCommentDetail] = useState([]);

  const [userDetail, setUserDetail] = useState({});
  const [photo, setPhoto] = useState('./默认头像.jpg')
  const [score, setScore] = useState(5);

  const location = useLocation();
  const state = location.state;

  //测试获取评价的数组
  useEffect(() => {
    axios({
      method: 'get',
      url: "http://localhost:8051/eval/get",
      params: {
        client: state.client_id
      }
    })
      .then(function (res) {
        if (res.data.data !== null) {
          setCommentDetail(res.data.data)
          console.log(res.data.data[0].pic.substring(59));
        }
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });

    axios({
      url: "http://localhost:8081/user/all",
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      params: {
        stuId: state.client_id,
      },
    })
      .then(function (response) {
        // console.log(response.data.data);
        setUserDetail(response.data.data)
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    if (userDetail.photo) {
      setPhoto(userDetail.photo)
    }
    if (userDetail.totalScore === null || userDetail.count === null) {
      setScore(5);
    }
    else {
      setScore(userDetail.totalScore / userDetail.count)
    }
  }, [userDetail])

  const showNewOrderHandler = () => {
    setShowNewOrder((prevState) => !prevState);
  };

  const [showCommentPage, setShowCommentPage] = useState(false);
  const showCommentPageHandler = () => {
    setShowCommentPage((prevState) => !prevState);
  };

  const [showContent, setShowContent] = useState(1);

  const selectContentHandler = (e) => {
    console.log(e.target.value);
    setShowContent(e.target.value);
  };

  const CommentedBox = () => {
    return (
      <div className={styles.contentBox1}>
        {
          commentDetail.map(item => (
            <ShowCommentCard text={item.text} price={item.reward} point={item.point}
              pic={'.' + item.pic.substring(59)} client={item.client} orderId={item.orderId} key={item.orderId}></ShowCommentCard>
          ))
        }
      </div>
    );
  };



  return (
    <>
      <Layout>
        <HeaderNav></HeaderNav>

        <Content className={styles.contentStyle}>
          <div className={styles.contentBox}>
            <div className={styles.infoBox}>
              <img src={photo} className={styles.userAvatar} />
              <div className={styles.basicInfo}>
                <Row>
                  <Col span={6}>用户名</Col>
                  <Col span={18}>{state.client_id}</Col>
                </Row>
                <Row>
                  <Col span={6}>评分</Col>
                  <Col span={18}>
                    <Rate disabled value={score} />
                  </Col>
                </Row>

              </div>
            </div>

            <div className={styles.orderBox}>
              <div className={styles.selectNav}>对TA的评价</div>
              <CommentedBox />
            </div>
          </div>
        </Content>
      </Layout>
      {showNewOrder && <NewOrder showCard={showNewOrderHandler} />}
      {showCommentPage && <CommentPage showCard={showCommentPageHandler} />}
    </>
  );
};

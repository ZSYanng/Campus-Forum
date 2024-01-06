import { Col, Layout, Row, Rate, Button, Radio, Card, Cascader } from "antd";
import styles from "./PersonalPage.module.css";
import { PlusOutlined, PayCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { OrderCard } from "../MainPage/OrderCard";
import { NewOrder } from "../NewOrder/NewOrder";
import { CommentPage } from "../Comment/CommentPage";
import axios from "axios";
import CommitedCard from "./CommitedCard";
import NotCommitCard from "./NotCommitCard";
import WaitingCard from "./WaitingCard";
import HeaderNav from "../MainPage/HeaderNav/HeaderNav";
import ChargeMoneyCard from "./ChargeMoneyCard";
import EditInfoCard from "./EditInfoCard";

const { Header, Content, Footer, Sider } = Layout;

export const PersonalPage = () => {

  const [personalMsg, setPersonalMsg] = useState({});
  const [pic, setPic] = useState('./默认头像.jpg')
  const [score, setScore] = useState(5);
  const [edit, setEdit] = useState(false);

  const [client, setClient] = useState();
  const [server, setServer] = useState();
  const [orderId, setOrderId] = useState();

  const changeEdit = () => {
    setEdit((prevState) => !prevState);
  };

  useEffect(() => {
    axios({
      url: "http://localhost:8011/user/select/client",
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        client: localStorage.getItem("stuId"),
        status: 3,
        type: 3,
      },
    })
      .then(function (response) {
        // console.log(response);
        setDeatil(response.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    updateUser();
  }, []);


  //更新用户信息
  const updateUser = () => {
    axios({
      url: "http://localhost:8081/user/all",
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      params: {
        stuId: localStorage.getItem("stuId"),
      },
    })
      .then(function (response) {
        console.log(response.data.data);
        setPersonalMsg(response.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    updateUser();
  }, [edit])

  useEffect(() => {
    if (personalMsg.photo) {
      setPic(personalMsg.photo)
    }
    if (personalMsg.totalScore === null || personalMsg.count === null) {
      setScore(5);
    }
    else {
      setScore(personalMsg.totalScore / personalMsg.count);
    }
  }, [personalMsg])

  const [showNewOrder, setShowNewOrder] = useState(false);
  const [detail, setDeatil] = useState([]);

  const [type_update, setType_update] = useState();
  const [status_update, setStatus_update] = useState();
  const [position_update, setPosition_update] = useState();
  const [path_update, setPath_update] = useState();

  const showNewOrderHandler = () => {
    setShowNewOrder((prevState) => !prevState);
  };

  const [showCommentPage, setShowCommentPage] = useState(false);
  const showCommentPageHandler = () => {
    setShowCommentPage((prevState) => !prevState);
  };

  const commentCommit = () => {
    showCommentPageHandler();
  }

  const [showContent, setShowContent] = useState("sellOver");

  // 是否展示二维码
  const [showMoneyCard, setshowMoneyCard] = useState(false);

  const showMoneyCardHandler = () => {
    setshowMoneyCard((prevState) => !prevState);
  };

  const [showEditCard, setShowEditCard] = useState(false);
  const showEditCardHandler = () => {
    setShowEditCard(prevState => !prevState);
  }

  const selectContentHandler = (e) => {
    console.log(e);

    var type;
    var position;
    var status;

    var path;

    if (e[0] === "order") {
      type = 1;
    } else if (e[0] === "flea") {
      type = 3;
    } else if (e[0] === "info") {
      type = 2;
    }

    if (e[1] === "sell" || e[1] === "send" || e[1] == "sendInfo") {
      position = "client";
    } else {
      position = "server";
    }

    if (e[2] === "sellOver") {
      status = "2,3";
    } else if (e[2] === "stillSell") {
      status = "1";
    } else if (e[2] === "buyOver") {
      status = "3";
    } else if (e[2] === "stillBuy") {
      status = "1,2";
    } else if (e[2] === "stillSend") {
      status = "1";
    } else if (e[2] === "employerDoing") {
      status = "2";
    } else if (e[2] === "sendOver") {
      status = "3";
    } else if (e[2] === "stillInfo") {
      status = "1";
    } else if (e[2] === "anwsering") {
      status = "2";
    } else if (e[2] === "infoOver") {
      status = "3";
    } else if (e[2] === "myAnswering") {
      status = "2";
    } else if (e[2] === "myFinishInfo") {
      status = "3";
    } else if (e[2] === "myFinish") {
      status = "3";
    } else if (e[2] === "myDoing") {
      status = "2";
    }

    setType_update(type);
    setStatus_update(status);
    setPosition_update(position);

    if (position === "server") {
      path = "http://localhost:8011/user/select/server";
    } else if (position === "client") {
      path = "http://localhost:8011/user/select/client";
    }
    setPath_update(path);

    axios({
      url: path,
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        [position]: localStorage.getItem("stuId"),
        status: status,
        type: type,
      },
    })
      .then(function (response) {
        console.log(response.data.data);
        setDeatil(response.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });

    setShowContent(e[2]);
  };

  const deleteOrder = (order_id, status) => {
    axios({
      url: "http://localhost:8011/user/delete",
      method: "delete",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        orderId: order_id,
        status: status,
        client: localStorage.getItem("stuId"),
      },
    })
      .then(function (response) {
        console.log(response);
        updatePage();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const updatePage = () => {
    console.log(123);
    //删除完之后更新page
    axios({
      url: path_update,
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        [position_update]: localStorage.getItem("stuId"),
        status: status_update,
        type: type_update,
      },
    })
      .then(function (response) {
        console.log(response.data.data);
        setDeatil(response.data.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const OrderCardBox = () => {
    return (
      <div className={styles.contentBox1}>
        {detail.map((item) => (
          <WaitingCard
            description={item.description}
            price={item.reward}
            picture={item.picture}
            client_id={item.client_id}
            order_id={item.order_id}
            deleteOrder={deleteOrder}
            status={item.status}
          ></WaitingCard>
        ))}
      </div>
    );
  };

  const CommitedCardBox = () => {
    return (
      <div className={styles.contentBox1}>
        {detail.map((item) => (
          <CommitedCard
            name={item.title}
            description={item.description}
            price={item.reward}
            picture={item.picture}
            client_id={item.client_id}
            order_id={item.order_id}
          ></CommitedCard>
        ))}
      </div>
    );
  };

  const comleteOrder = (type, server_id, client_id, reward, order_id) => {
    console.log(type, server_id, client_id, reward, order_id);
    axios({
      url: "http://localhost:8011/user/completeorder",
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        type: type,
        server: server_id,
        client: client_id,
        reward: reward,
        orderId: order_id,
      },
    })
      .then(function (response) {
        console.log(response);
        updatePage();
      })
      .catch(function (err) {
        console.log(err);
      });
    setClient(client_id);
    setServer(server_id);
    setOrderId(order_id);
    updatePage();
    showCommentPageHandler();
  };


  const NotCommitCardBox = () => {
    return (
      <div className={styles.contentBox1}>
        {detail.map((item) => (
          <NotCommitCard
            name={item.title}
            description={item.description}
            price={item.reward}
            picture={item.picture}
            client_id={item.client_id}
            server_id={item.server_id}
            order_id={item.order_id}
            comleteOrder={comleteOrder}
            task_type={item.task_type}
          ></NotCommitCard>
        ))}
      </div>
    );
  };

  const navOptions = [
    {
      value: "flea",
      label: "跳蚤市场",
      children: [
        {
          value: "sell",
          label: "我卖的东西",
          children: [
            {
              // 已经卖出的商品，不用展示别人的评价
              value: "sellOver",
              label: "成功卖出",
            },
            {
              // 还在售卖的商品
              value: "stillSell",
              label: "售卖中",
            },
          ],
        },
        {
          value: "buy",
          label: "我买的东西",
          children: [
            {
              // 确认收货
              value: "buyOver",
              label: "已完成",
            },
            {
              // 还未确认收货，确认收货后需要评价（强制）
              value: "stillBuy",
              label: "未完成",
            },
          ],
        },
      ],
    },
    {
      // 任务
      value: "order",
      label: "任务",
      children: [
        {
          // 我发布的任务
          value: "send",
          label: "我发布的任务",
          children: [
            {
              // 还没人接
              value: "stillSend",
              label: "等待接单",
            },
            {
              // 已接单未完成，需要确认并评价
              value: "employerDoing",
              label: "未完成",
            },
            {
              // 已完成，不需要展示评价
              value: "sendOver",
              label: "已完成",
            },
          ],
        },
        {
          // 我接的任务
          value: "myTake",
          label: "我接的任务",
          children: [
            {
              // 正在进行中，展示信息
              value: "myDoing",
              label: "进行中",
            },
            {
              // 我已经完成的任务
              value: "myFinish",
              label: "已完成",
            },
          ],
        },
      ],
    },
    {
      // 信息
      value: "info",
      label: "信息",
      children: [
        {
          // 我发布的信息
          value: "sendInfo",
          label: "我发布的咨询",
          children: [
            {
              // 还没人接的信息
              value: "stillInfo",
              label: "等待回答",
            },
            {
              // 已接单未完成，需要确认并评价
              value: "anwsering",
              label: "未完成",
            },
            {
              // 已完成，不需要展示评价
              value: "infoOver",
              label: "已完成",
            },
          ],
        },
        {
          // 我接的信息回答
          value: "myInfo",
          label: "我的回答",
          children: [
            {
              // 正在进行中，展示信息
              value: "myAnswering",
              label: "进行中",
            },
            {
              // 我已经完成的任务
              value: "myFinishInfo",
              label: "已完成",
            },
          ],
        },
      ],
    },
  ];

  const SelectShowBox = () => {
    if (
      showContent === "stillSend" ||
      showContent === "stillSell" ||
      showContent === "stillInfo"
    ) {
      return <OrderCardBox />;
    } else if (
      showContent === "sellOver" ||
      showContent === "buyOver" ||
      showContent === "myDoing" ||
      showContent === "myFinish" ||
      showContent === "sendOver" ||
      showContent === "infoOver" ||
      showContent === "myAnswering" ||
      showContent === "myFinishInfo"
    ) {
      return <CommitedCardBox />;
    } else {
      return <NotCommitCardBox />;
    }
  };

  return (
    <>
      <Layout>
        <HeaderNav />

        <Content className={styles.contentStyle}>
          <div className={styles.contentBox}>
            <div className={styles.infoBox}>
              <img src={pic} className={styles.userAvatar} />
              <div className={styles.basicInfo}>
                <Row>
                  <Col span={6}>用户名</Col>
                  <Col span={12}>{personalMsg.name}</Col>
                  <Col span={6}>
                    <Button className={styles.editBtn} type='link' size="small" onClick={showEditCardHandler}>
                      <EditOutlined />
                      编辑
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>评分</Col>
                  <Col span={18}>
                    <Rate disabled value={score} />
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>我的余额</Col>
                  <Col span={18}>￥ {personalMsg.money}</Col>
                </Row>
              </div>
              <div className={styles.btnBox}>
                <Button
                  className={styles.releaseBtn}
                  onClick={showNewOrderHandler}
                >
                  <PlusOutlined /> 发布订单
                </Button>
                <Button
                  className={styles.releaseBtn}
                  onClick={showMoneyCardHandler}
                >
                  <PayCircleOutlined />
                  充值
                </Button>
              </div>
            </div>

            <div className={styles.orderBox}>
              <div className={styles.selectNav}>
                <Cascader
                  defaultValue={["flea", "sell", "sellOver"]}
                  options={navOptions}
                  onChange={selectContentHandler}
                  className={styles.chooseNav}
                />
              </div>
              {<SelectShowBox />}
            </div>
          </div>
        </Content>
      </Layout>
      {showNewOrder && (
        <NewOrder showCard={showNewOrderHandler} updatePage={updatePage} />
      )}
      {showCommentPage && <CommentPage showCard={showCommentPageHandler} client={client} server={server} orderId={orderId} />}

      {showMoneyCard && (
        <ChargeMoneyCard showMoneyCard={showMoneyCardHandler} />
      )}

      {showEditCard && (<EditInfoCard showEditCard={showEditCardHandler} name={personalMsg.name} changeEdit={changeEdit} />)}


    </>
  );
};

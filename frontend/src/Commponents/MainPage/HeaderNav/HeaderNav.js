import styles from "./HeaderNav.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderNav(params) {
  const { Header } = Layout;
  const [login, setLogin] = useState(localStorage.getItem("stuId") === null);
  const [name, setName] = useState("请登录");
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    if (key === "1") {
      navigate("/mainpage");
    }

    if (key === "2") {
      navigate("/personal");
    }
    if (key === "3") {
      // navigate('/chat')
    }
    // if (key === "4") {
    //   navigate("/comment", {
    //     state: { client_id: localStorage.getItem("stuId") },
    //   });
    // }
  };
  useEffect(() => {
    if (localStorage.getItem("stuId") !== null) {
      setName("你好!" + localStorage.getItem("stuId"));
    }
  }, []);
  const items = [
    {
      key: 1,
      label: <div>回到主页</div>,
    },
    {
      key: 2,
      label: <div>个人主页</div>,
    },
    {
      key: 3,
      label: <div>我的消息</div>,
    },
    {
      key: 4,
      label: <div>我的评价</div>,
    },
  ];
  return (
    <Header
      className={styles.header}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
      theme="light"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="LOGO.png" style={{ width: "80px" }} />
      </div>
      {/* <Menu mode="horizontal"
              items={mainNavItems}
          /> */}

      {/* <div className={styles.loginBox}> 修改密码</div> */}
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        disabled={login}
        trigger={["click"]}
        className={styles.dropdownBox}
      >
        <Button type="link" className={styles.selectBtn}>
          <UserOutlined /> {name}
        </Button>
      </Dropdown>
      {/* <div className={styles.loginBox}>
        {" "}
        <UserOutlined /> 请登录
      </div> */}
    </Header>
  );
}

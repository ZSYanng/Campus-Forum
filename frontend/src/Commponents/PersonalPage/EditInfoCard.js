import styles from "./EditInfoCard.module.css";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Row, Input, Col, Upload, Button, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditInfoCard(props) {
  const [picture, setPicture] = useState("");
  const [cnt, setCnt] = useState(1);
  const [name, setName] = useState(props.name)
  const uploadProps = {
    onChange(info) {
      setPicture("");
      // 获取文件名用于造假
      // console.log(info.file.name);
      if (info.file.status === "error") {
        setCnt(cnt + 1);
        if (picture === "") {
          setPicture(picture + "./" + info.file.name);
        } else {
          setPicture(picture + "-" + "./" + info.file.name);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.success(`${info.file.name} file uploaded successfully`);
        }
      }
    },
    showUploadList: true,
  };

  const changeName = (e) => {
    setName(e.target.value);
  }

  const submitChange = () => {
    if (name !== props.name) {
      axios({
        method: 'get',
        url: "http://localhost:8081/user/setName",
        params: {
          stuId: localStorage.getItem('stuId'),
          newName: name
        }
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    if (picture !== "") {
      axios({
        method: 'get',
        url: "http://localhost:8081/user/setPhoto",
        params: {
          stuId: localStorage.getItem('stuId'),
          photo: picture
        }
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        })
    }
    message.success(`编辑成功!`);
    props.showEditCard();
    props.changeEdit();
  }

  return (
    <div className={styles.maskbox}>
      <div className={styles.commentCard}>
        <div className={styles.closeBox}>
          <div className={styles.titleBox}>编辑资料</div>
          <button className={styles.cardCloseBtn} onClick={props.showEditCard}>
            <CloseOutlined />
          </button>
        </div>
        <div className={styles.commentBox}>
          <Row>
            <Col span={6} style={{ fontWeight: 'bolder' }}>用户名</Col>
            <Col span={12}>
              <Input defaultValue={props.name} placeholder="用户名不能为空！" onChange={changeName} />
            </Col>
          </Row>
          <Row>
            <Col span={6} style={{ fontWeight: 'bolder' }}>上传头像</Col>
            <Col span={18}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Col>
          </Row>
          <div className={styles.submitBtnBox}>
            <Button style={{ width: '7vw' }} onClick={submitChange}>提交</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

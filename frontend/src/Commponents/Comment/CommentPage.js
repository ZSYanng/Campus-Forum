import styles from "./CommentPage.module.css";
import { Row, Col, Upload, message, Button, Rate, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const CommentPage = (props) => {
  const [score, setScore] = useState(0);
  const statementRef = useRef(null);

  useEffect(() => {
    console.log(props);
  }, [])

  const [picture, setPicture] = useState("");
  const [video, setVideo] = useState("");
  const [cnt, setCnt] = useState(1);
  const [piclist, setPiclist] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  // 获取到评分
  const getScore = (event) => {
    console.log(event);
    setScore(event);
  };

  // 按回车获取评论内容
  const getText = (event) => {
    console.log(event.target.value);
  };

  const setFileChange = (info) => {
    setPiclist(info.fileList)
  }
  const submitComment = () => {
    let formData = new FormData();
    // formData.append(1, 1);
    // console.log(formData.get('1'))
    var statement1 = statementRef.current.resizableTextArea.textArea.value;
    // console.log(statement1);
    // console.log(score);
    // console.log(piclist)
    piclist.forEach((pic) => {
      formData.append("file", pic.originFileObj)
    })
    formData.append("text", statement1);
    formData.append("point", score);
    formData.append("orderId", props.orderId);
    formData.append("client", props.client);
    formData.append("server", props.server);
    // console.log(picture);
    axios({
      method: 'post',
      url: "http://localhost:8051/eval/add",
      data: formData
    })
      .then(function (res) {
        if (res.data.message === '评论成功') {
          alert('评论成功')
          props.showCard();

        }
      })
      .catch(function (err) {
        console.log(err);
      })
  };

  return (
    <div className={styles.maskbox}>
      <div className={styles.commentCard}>
        <div className={styles.closeBox}>
          <div className={styles.titleBox}>上传评价</div>
          <button className={styles.cardCloseBtn} onClick={props.showCard}>
            <CloseOutlined />
          </button>
        </div>
        <div className={styles.commentBox}>
          <Row>
            <Col span={6}>
              <div className={styles.commentTitle}>评分</div>
            </Col>
            <Col span={18}>
              <div className={styles.scoreBox}>
                {/* <Slider max={10} min={0} defaultValue={10} className={styles.scoreSlider} onAfterChange={getScore}/> */}
                <Rate defaultValue={5} allowHalf onChange={getScore} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles.commentTitle1}>
              <span>评价</span>
            </Col>
            <Col span={18}>
              <TextArea
                maxLength={100}
                showCount
                className={styles.commentText}
                placeholder="请输入评价(100字以内)"
                onPressEnter={getText}
                ref={statementRef}
                name='text'
              ></TextArea>
            </Col>
          </Row>

          <Row>
            <Col span={6} className={styles.commentTitle}>
              <span>上传图片</span>
            </Col>
            <Col span={18}>
              <div className={styles.scoreBox}>
                <Upload onChange={setFileChange}>
                  <Button icon={<UploadOutlined />}>点击上传</Button>
                </Upload>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={styles.commentSubmit}>
                <Button onClick={submitComment}>提交</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

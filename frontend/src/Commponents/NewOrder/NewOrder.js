import styles from "./NewOrder.module.css";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Cascader,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import { useState } from "react";
import axios from 'axios'

export const NewOrder = (props) => {
  return (
    <div className={styles.maskbox}>
      <div className={styles.orderCard}>
        <div className={styles.closeBox}>
          <button className={styles.cardCloseBtn} onClick={props.showCard}>
            <CloseOutlined />
          </button>
        </div>
        <OrderForm showCard={props.showCard} updatePage={props.updatePage} />
      </div>
    </div>
  );
};

const OrderForm = (props) => {

  const [tag, setTag] = useState('book');
  const [price, setPrice] = useState(100);
  const [detail, setDetail] = useState('');
  const [name, setName] = useState();
  const [type, setType] = useState(3);

  const tagOptions = [
    {
      label: "跳蚤市场",
      value: "flea",
      children: [
        {
          label: "书本文具",
          value: "book",
        },
        {
          label: "电子数码",
          value: "3c",
        },
        {
          label: "零食饮料",
          value: "food",
        },
        {
          label: "生活用品",
          value: "life",
        },
        {
          label: "住宿/转租",
          value: "rent",
        },
        {
          label: "课程/家教",
          value: "lesson",
        },
        {
          label: "交通工具",
          value: "traffic",
        },
        {
          label: "其他",
          value: "other",
        },
      ],
    },
    {
      label: "任务发布",
      value: "order",
      children: [
        {
          label: "取外卖",
          value: "takeout",
        },
        {
          label: "拿快递",
          value: "express",
        },
        {
          label: "跑腿",
          value: "errand",
        },
        {
          label: "志愿者招募",
          value: "voluntary",
        },
        {
          label: "乐跑/体测",
          value: "sport",
        },
      ],
    },
    {
      label: "信息交流",
      value: "info",
      children: [
        {
          label: "作业求助",
          value: "homework",
        },
        {
          label: "信息咨询",
          value: "communicate",
        },
      ],
    },
  ];

  const tagOnChange = (e) => {
    //返回的是一个数组，索引值为级联层数  
    console.log(e);
    if (e[0] === 'order') {
      setType(1);
    }
    else if (e[0] === 'flea') {
      setType(3);
    }
    else if (e[0] === 'info') {
      setType(2);
    }
    console.log(e[1]);
    setTag(e[1]);

  };

  const { TextArea } = Input;

  const [picture, setPicture] = useState("");
  const [cnt, setCnt] = useState(1);
  const uploadProps = {
    onChange(info) {
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

  const padZero = (number) => {
    return number < 10 ? '0' + number : number;
  }

  const formatDateToYYYYMMDDHHMMSS = (date) => {
    var year = date.getFullYear();
    var month = padZero(date.getMonth() + 1);
    var day = padZero(date.getDate());
    var hours = padZero(date.getHours());
    var minutes = padZero(date.getMinutes());
    var seconds = padZero(date.getSeconds());

    var formattedDate =
      year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    return formattedDate;
  }

  const commitOrder = () => {
    let formData = new FormData();
    formData.append('client', localStorage.getItem('stuId'));
    formData.append('date', formatDateToYYYYMMDDHHMMSS(new Date()));
    formData.append('description', detail);
    formData.append('reward', price);
    formData.append('type', type);
    formData.append('label', tag);
    formData.append('picture', picture);
    formData.append('title', name);
    axios({
      method: 'post',
      url: "http://localhost:8011/user/add",
      data: formData
    })
      .then(function (res) {
        console.log(res);
        props.updatePage();
        props.showCard();
      })
      .catch(function (err) {
        console.log(err);
      })

  }

  const changeName = (e) => {
    setName(e.target.value);
  }

  const changePrice = (e) => {
    setPrice(e);
  }

  const changeDetail = (e) => {
    setDetail(e.target.value)
  }
  return (
    <div className={styles.orderForm}>
      <Form
        labelCol={{
          span: 3,
          offset: 2,
        }}
        wrapperCol={{
          span: 15,
          offset: 1,
        }}
      >
        <Form.Item
          label={<p>名称</p>}
          name="orderName"
          rules={[
            {
              required: true,
              message: "名称不能为空！",
            },
          ]}
        >
          <Input placeholder="请输入订单的名称" style={{ width: "80%" }} onChange={changeName} />
        </Form.Item>

        <Form.Item
          label={<p>选择标签</p>}
          name="tags"
          rules={[
            {
              required: true,
              message: "请选择标签！",
            },
          ]}
        >
          <Cascader
            style={{
              width: "100%",
            }}
            options={tagOptions}
            defaultValue={[["flea", "book"]]}
            onChange={tagOnChange}
          // 当前可以选择最多3个标签，如果要改成只能选1个，将下面两行注释掉即可
          // multiple
          // maxTagCount="3"
          />
        </Form.Item>

        <Form.Item
          label={<p>标价</p>}
          name="price"
          rules={[
            {
              required: true,
              message: "标价不能为空！",
            },
          ]}
        >
          <InputNumber addonAfter="￥" style={{ width: "80%" }} onChange={changePrice} />
        </Form.Item>

        <Form.Item label={<p>描述</p>} name="description">
          <TextArea
            showCount
            maxLength={100}
            style={{
              height: 120,
              marginBottom: 24,
              width: "100%",
            }}
            placeholder="简单的描述详情"
            onChange={changeDetail}
          />
        </Form.Item>

        <Form.Item label={<p>上传图片</p>} name="uploadPics">
          <div style={{ width: "40%" }}>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </div>
        </Form.Item>

        <Form.Item className={styles.releaseBtn}>
          <Button htmlType='submit' style={{ width: "10vw" }} onClick={commitOrder}>发布</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

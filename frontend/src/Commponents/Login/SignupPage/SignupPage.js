import { Form, Input, Button, Row, Col, Space, message } from "antd";
import { useState, useEffect } from "react";
import styles from './SignupPage.module.css'
import axios from 'axios';
import qs from 'qs';

const SignupPage = () => {

    return <>
        {/* <div>这是注册页面</div> */}

        <SignupForm />
    </>

}


const SignupForm = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [formRef] = Form.useForm();

    const [enableSendCode, setenableSendCode] = useState(true);
    const [time, setTime] = useState(59);
    const regex = /^\d{8}$/;


    const clickGetCode = () => {
        const isMatch = regex.test(formRef.getFieldValue().stuId);
        if (isMatch) {
            CountTime();
            console.log(formRef.getFieldValue());
            axios({
                url: 'http://localhost:8081/user/getcode',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    stuId: formRef.getFieldValue().stuId
                }
            }).then(function (response) {
                console.log(response);
            })
                .catch(function (err) {
                    console.log(err);
                })
        }
        else {
            messageApi.open({
                type: 'error',
                content: '请正确输入8位SID！！',
            })



        }

    }

    const CountTime = () => {
        let t = 59;
        setenableSendCode(false);
        var timeClock;
        timeClock = setInterval(() => {
            t--;
            setTime(t);
            if (t === 0) {
                setenableSendCode(true);
                clearInterval(timeClock)
            }
        }, 1000)
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // axios.get('http://localhost:8081/user/register', values)
        //     .then(function (response) {
        //         console.log("response: ", response);
        //     })
        //     .catch(err => console.log(err))
        axios({
            url: 'http://localhost:8081/user/register',
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(values
            )
        }).then(function (response) {
            console.log(response);
            if (response.data.message !== '注册成功') {
                messageApi.open({
                    type: 'error',
                    content: response.data.message,
                })
            }
            else {
                messageApi.open({
                    type: 'success',
                    content: response.data.message,
                })
            }
        })
            .catch(function (err) {
                console.log(err);
            })
    }

    let sendBtn
    if (enableSendCode) {
        sendBtn = <Button onClick={() => { clickGetCode() }} className={styles.sendBtn}>发送验证码</Button>
    }
    else {
        sendBtn = <Button disabled className={styles.sendBtn}>{time}秒后可重新发送</Button>
    }

    return <>
        {contextHolder}
        <div className={styles.signupBox}>



            <div className={styles.loginIntro}>

                <Row>
                    <Col span={20} offset={4}><div className={styles.introTitle}>欢迎使用接单平台！</div></Col>
                </Row>
                <Row align={"middle"}>
                    <Col span={3} offset={4}><img src='./闲置.svg' /></Col>
                    <Col span={16}><div className={styles.intro1}>闲置物品交易</div></Col>
                </Row>
                <Row align={"middle"}>
                    <Col span={3} offset={4}><img src='./作业.svg' /></Col>
                    <Col span={16}><div className={styles.intro1}>作业求助</div></Col>
                </Row>
                <Row align={"middle"}>
                    <Col span={3} offset={4}><img src='./外卖-2.svg' /></Col>
                    <Col span={16}><div className={styles.intro1}>外卖、跑腿</div></Col>
                </Row>
            </div>

            <div className={styles.signupForm}>
                <Form
                    onFinish={onFinish}
                    size="middle"
                    form={formRef}
                    labelCol={{
                        span: 5,
                        // offset: 2,
                    }}
                    wrapperCol={{
                        span: 18
                    }}

                >
                    {/* <Space direction="vertical"> */}
                    <Form.Item
                        label={<p>学号</p>}
                        name="stuId"
                        rules={[
                            {
                                required: true,
                                message: '学号不能为空！',
                            },
                            {
                                pattern: /^\d{8}$/,
                                message: 'SID格式错误！',
                            }
                        ]}
                    >
                        <Input placeholder="请输入8位SID" style={{ width: "100%" }} />

                    </Form.Item>

                    <Form.Item
                        label={<p>密码</p>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '密码不能为空！',

                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={<p>确认密码</p>}
                        name="confirmPwd"
                        rules={[
                            {
                                required: true,
                                message: '请再次输入密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不同，请重新输入！'));
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label={<p>用户名</p>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '用户名不能为空！',
                            }
                        ]}
                    >
                        <Input placeholder="给自己起一个名字" />
                    </Form.Item>

                    <Form.Item
                        label={<p>验证码</p>}
                        name="code"
                        rules={[
                            // {
                            //     required: true,
                            //     message: "验证码不能为空！",
                            // },
                            {
                                pattern: /^\d{6}$/,
                                message: "验证码为6位数字，请正确输入！"
                            }
                        ]}
                    >
                        <Row>
                            <Col span={12}><Input /></Col>
                            <Col span={8} offset={4}>{sendBtn}</Col>
                        </Row>


                    </Form.Item>



                    <Form.Item className={styles.signupBtn}>
                        <Button htmlType='submit' style={{ width: "10vw" }}>注册</Button>
                    </Form.Item>

                    {/* </Space> */}



                </Form>
            </div>








        </div></>

}

export default SignupPage;
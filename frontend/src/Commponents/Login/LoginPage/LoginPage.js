import { Button, Col, Divider, Form, Input, Row, Space, message } from 'antd';
import styles from './LoginPage.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/skeleton/Title';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, NavLink } from 'react-router-dom';

const LoginPage = () => {
    return <>
        {/* <div>this is login page.</div> */}
        <LoginForm />

    </>

}

const LoginForm = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        //下面已经与后端进行数据传输，准备好后直接取消注释即可

        axios({
            url: 'http://localhost:8081/user/login',
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(values)
        }).then(function (response) {
            console.log(response);
            if (response.data.code === 400) {
                message.error('登录失败，请检查密码或者用户名！')
            }
            else if (response.data.code === 200) {
                message.success('登录成功')
                // let t = 3;
                // var timeClock = setInterval(() => {
                //     t--;
                //     if (t === 0) {
                //         clearInterval(timeClock)
                //     }
                // }, 1000)
                localStorage.setItem('stuId', response.data.data)
                console.log(localStorage.getItem('stuId'));
                navigate('/mainpage')
            }
        })
            .catch(function (err) {
                console.log(err);
            })



    };
    return <div className={styles.loginBox}>
        <Space>
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

            <div className={styles.loginForm}>
                <Form
                    onFinish={onFinish}
                    labelCol={{
                        span: 6,
                    }}
                    // wrapperCol={{
                    //     span: 18,
                    // }}
                    size="large"
                // style={{
                //     maxWidth: 600,
                // }}
                >
                    <Space direction='vertical' className={styles.formSpace}>
                        <Form.Item label={<p><UserOutlined /> 学号</p>} name="stuId"
                            rules={
                                [{
                                    required: true,
                                    message: '账号不能为空！',
                                }]
                            }
                        >
                            <Input style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item label={<p><LockOutlined /> 密码</p>} name="password" rules={
                            [{
                                required: true,
                                message: '密码不能为空！',
                            }]
                        }>
                            <Input.Password style={{ width: "100%" }} />

                        </Form.Item>

                        <Form.Item className={styles.pwdForget}>
                            <NavLink to='findPwd' >忘记密码？</NavLink>
                        </Form.Item>

                        <Form.Item className={styles.loginBtn}>
                            <Button htmlType='submit' className={styles.loginBtn1}>立即登录</Button>
                        </Form.Item>

                        <Form.Item className={styles.signupLink}>
                            <NavLink to='/register'>没有账号？马上注册</NavLink>
                        </Form.Item>

                    </Space>


                </Form>

            </div>

        </Space>

    </div>


}

export default LoginPage;
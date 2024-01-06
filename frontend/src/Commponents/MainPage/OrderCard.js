import { Card, Button } from 'antd';
import styles from './OrderCard.module.css'
import { MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { OrderInfo } from '../OrderInfo/OrderInfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const OrderCard = (props) => {

    const { Meta } = Card;
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const [order_id, setOrder_id] = useState(props.order_id);
    const [client_id, setClient_id] = useState(props.client_id);
    const [reward, setReward] = useState(props.reward);
    const [type, setType] = useState(props.type)
    const navigate = useNavigate();



    const showOrderInfoHandler = () => {
        setShowOrderInfo(prevState => !prevState);
    }

    const jumpToChat = () => {
        navigate('/chat', { state: { client: client_id.toString(), server: localStorage.getItem('stuId') } });
    }

    const takeOrder = () => {
        axios({
            url: 'http://localhost:8011/user/takeorder',
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                type: type,
                server: localStorage.getItem('stuId'),
                client: client_id,
                reward: reward,
                orderId: order_id
            }
        }).then(function (response) {
            alert(response.data.message)
            props.updatePage();
        })
            .catch(function (err) {
                console.log(err);
            });
    }

    return <>
        <Card

            className={styles.orderCard}
            cover={<img src={props.picture} className={styles.imgSize} />}
            actions={[
                <div>{client_id}</div>,
                <div onClick={takeOrder}>￥ {props.price}</div>,
                <div onClick={showOrderInfoHandler}><EllipsisOutlined />详情</div>,
                <Button onClick={jumpToChat} type='link' size='small'><MessageOutlined />聊天</Button>
            ]}
        >
            <Meta
                title={<div>{props.title} </div>}
                description={props.description}
            />
        </Card>
        {showOrderInfo && <OrderInfo showInfo={showOrderInfoHandler} order_id={order_id} client_id={client_id} server_id={localStorage.getItem('stuId')} />}
    </>

};


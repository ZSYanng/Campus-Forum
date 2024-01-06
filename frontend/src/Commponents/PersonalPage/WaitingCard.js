import styles from './CardStyle.module.css'
import { Button, Card } from 'antd'
import { useState } from 'react';

export default function WaitingCard(props) {
    const [order_id, setOrder_id] = useState(props.order_id)
    const [status, setStatus] = useState(props.status)
    const { Meta } = Card;

    const deleteOrder = () => {
        props.deleteOrder(order_id, status);
    }

    return (
        <Card

            className={styles.card}
            cover={<img src={props.picture} className={styles.imgSize} />}
            actions={[
                <div>￥ {props.price}</div>,

                <Button type='link' size='small' onClick={deleteOrder}>删除订单</Button>
            ]}
        >
            <Meta
                title={<div>{props.name} </div>}
                description={props.description}
            />
        </Card>
    )

};

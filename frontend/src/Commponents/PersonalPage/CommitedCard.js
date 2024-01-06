import { useState } from 'react';
import styles from './CardStyle.module.css'
import { Card } from 'antd'

export default function CommitedCard(props) {
    const { Meta } = Card;
    const [order_id, setOrder_id] = useState(props.order_id)
    return (
        <Card

            className={styles.card}
            cover={<img src={props.picture} className={styles.imgSize} />}
            actions={[
                <div>￥ {props.price}</div>,
                <div>{props.title}</div>
            ]}
        >
            <Meta
                description={props.description}
            />
        </Card>
    )

};

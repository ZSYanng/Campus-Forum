import styles from './CardStyle.module.css'
import { Card, Button } from 'antd'
import { useState } from 'react';

export default function NotCommitCard(props) {
  const { Meta } = Card;
  const [order_id, setOrder_id] = useState(props.order_id)
  const [server_id, setServer_id] = useState(props.server_id)
  const [client_id, setClient_id] = useState(props.client_id)
  const [status, setStatus] = useState(props.status)
  const [type, setType] = useState(props.task_type)
  const [reward, setReward] = useState(props.price)

  const comleteOrder = () => {
    props.comleteOrder(type, server_id, client_id, reward, order_id);
  }
  return (
    <Card
      className={styles.card}
      cover={<img src={props.picture} className={styles.imgSize} />}
      actions={[
        <div>￥ {reward}</div>,
        <Button type="link" size="small" onClick={comleteOrder}>确认收货</Button>,
      ]}
    >
      <Meta
        title={<div>{props.title}</div>}
        description={props.description}
      />
    </Card>
  )
};

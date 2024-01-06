import styles from './ShowCommentCard.module.css';
import { Avatar, Card, Rate } from 'antd';

export const ShowCommentCard = (props) => {

  const { Meta } = Card;
  return (
    <Card
      className={styles.commentCard}
      cover={<img src={props.pic} className={styles.imgSize} />}
      actions={[
        <div className={styles.commentUser}>{props.client}: </div>,
        <div>
          <Rate disabled value={props.point} className={styles.commentRate} />
        </div>,
      ]}
    >
      <Meta
        title={<div>订单号:{props.orderId}</div>}
        description={props.text}
      />
    </Card>
  );
};
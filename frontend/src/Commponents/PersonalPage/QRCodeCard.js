import styles from "./QRCodeCard.module.css";
import { QRCodeSVG } from "qrcode.react";
import { CloseOutlined } from "@ant-design/icons";
export default function QRCodeCard(params) {
  return (
    <div className={styles.maskbox}>
      <div className={styles.qrCodeBox}>
      <div className={styles.closeBox}>
          <button className={styles.cardCloseBtn} onClick={params.showQRCode}>
            <CloseOutlined />
          </button>
        </div>
        <div className={styles.qrCodeBox1}>
        <QRCodeSVG
          value="https://www.bilibili.com/"
          className={styles.qrCode}
        />
        </div>
      </div>
    </div>
  );
}

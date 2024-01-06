import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatPage.module.css'
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';


const ChatPage = () => {
  const [words, setWords] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const socketRef = useRef();
  const [currentObject, setCurrentObject] = useState('');

  const currentObjectRef = useRef(currentObject);
  useEffect(() => {
    currentObjectRef.current = currentObject;
  }, [currentObject]);


  useEffect(() => {
    const socketURL = "ws://localhost:8031/webserver/" + localStorage.getItem('stuId');
    socketRef.current = new WebSocket(socketURL);
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.users && data.users.length != 1) {
        let realUsers = data.users.filter((num) => {
          return num.username != localStorage.getItem('stuId');
        })
        setUsers(realUsers)
        // setCurrentObject(realUsers[0].username)
      }
      else {
        // console.log(currentObject);
        // console.log(data.from);
        if (currentObjectRef.current === data.from) {
          // console.log(localStorage.getItem('stuId') + '收到信息');
          setWords(prevWords => [...prevWords, { text: data.text, to: localStorage.getItem('stuId'), from: currentObject }]);
        }
      }

    };
    return () => socketRef.current.close();
  }, []);

  useEffect(() => {
    console.log(currentObject);
  }, [currentObject]);



  const handleInputChange = (event) => {
    setMessage(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      sendMessage();
      event.preventDefault();
    }
  }

  const sendMessage = () => {
    if (message.trim() !== '') {
      setWords(prevWords => [...prevWords, { text: message, from: localStorage.getItem('stuId'), to: currentObject }]);
      socketRef.current.send(JSON.stringify({ text: message, from: localStorage.getItem('stuId'), to: currentObject }));
      setMessage('');
    }
  }

  const { TextArea } = Input;

  const selectBubble = (word) => {
    if (word.sender === localStorage.getItem('stuId')) {
      return 'styles.btalk'
    } else {
      return 'styles.atalk'
    }

  }

  return <div className={styles.maskbox}>
    <div className={styles.talk_box}>
      <div className={styles.userBox}>
        {users.map(item => (
          <div className={styles.userNameBox} onClick={() => {
            setCurrentObject(item.username)
          }}
          >{item.username}</div>
        ))}
      </div>
      <div className={styles.talk_con} id="talk_con_id">
        <div className={styles.titleBox}>
          <div className={styles.chatName}>{currentObject}</div>

          <button className={styles.closeBtn}><CloseOutlined /></button>
        </div>
        <div className={styles.talk_show} id="words">
          <div className={styles.chatBegin}>---可以开始聊天啦！---</div>
          {words.map((word, index) => (
            word.from === localStorage.getItem('stuId') ?
              <div
                key={index}
                className={styles.btalk}
              >
                <span>{word.text}</span>
              </div>
              :
              <div
                key={index}
                className={styles.atalk}
              >
                <span>{word.text}</span>
              </div>

          ))}
        </div>
        <div className={styles.talk_send}>


          <TextArea
            rows={4}
            className="talk_word"
            value={message}
            showCount
            maxLength={50}
            onChange={handleInputChange}
            onPressEnter={handleKeyDown}
            bordered={false}
            placeholder='最多输入50字！'
          />
          <div className={styles.talk_btn}>
            <Button
              className={styles.sendBtn}
              onClick={sendMessage}
            >
              <SendOutlined />发送</Button>
          </div>

        </div>

        {/* <input
        type="button"
        value="发送"
        className="talk_sub"
        onClick={sendMessage}
      /> */}
      </div>

    </div>

  </div>
}

export default ChatPage;

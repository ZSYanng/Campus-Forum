package com.project;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint(value = "/webserver/{username}/{toUser}")
@Component
public class WebServer {
    public static final Map<String, Session> map = new ConcurrentHashMap<>();

    public static List<Message> list = new ArrayList<>();
    @OnOpen
    public void onOpen(Session session, @PathParam("username") String username, @PathParam("toUser") String toUser) {
        map.put(username,session);
        System.out.println(username);
        System.out.println(map.size());
        JSONObject result = new JSONObject();
        JSONArray array = new JSONArray();
        result.set("items", array);
        for(Message m : list){
            if(m.getFrom().equals(username) && m.getTo().equals(toUser)){
                JSONObject obj = new JSONObject();
                obj.set("from",username);
                obj.set("to",toUser);
                obj.set("text",m.getData());
                array.add(obj);
            }else if(m.getFrom().equals(toUser) && m.getTo().equals(username)){
                JSONObject obj = new JSONObject();
                obj.set("from",toUser);
                obj.set("to",username);
                obj.set("text",m.getData());
                array.add(obj);
            }
        }
        try {
            session.getBasicRemote().sendText(JSONUtil.toJsonStr(result));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @OnClose
    public void onClose(@PathParam("username") String username){
        //map.remove(username);
    }
    @OnMessage
    public void onMessage(String message,@PathParam("username") String username,@PathParam("toUser") String toUser){
        JSONObject obj = JSONUtil.parseObj(message);
        String text = obj.getStr("text");
        Session toSession = map.get(toUser);
        JSONObject jsonObject = new JSONObject();
        jsonObject.set("from", obj.getStr("from"));
        jsonObject.set("to",obj.getStr("to"));
        jsonObject.set("text", text);
        Message msg = new Message();
        msg.setTo(obj.getStr("to"));
        msg.setFrom(obj.getStr("from"));
        msg.setData(text);
        list.add(msg);
        if(toSession!=null){
        try {
            toSession.getBasicRemote().sendText(jsonObject.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        }
    }
    @OnError
    public void onError(Session session,Throwable error){
        error.printStackTrace();
    }
}

package com.ssafy.semes.util;

import ch.qos.logback.core.net.server.Client;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
public class SocketClient {

    public static SocketClient sockerClient = new SocketClient();
    private static Socket client;
    public static OutputStream sender;
    public static InputStream receiver;
    private SocketClient(){
        client = Client();
    }
    public static Socket getClient(){
        if(client == null){
            client = Client();
        }
        return client;
    }
    public static void setClient(Socket socket){
        client = socket;
    }
    public static Socket Client() {
        try (Socket client = new Socket()) {
            InetSocketAddress ipep = new InetSocketAddress("127.0.0.1", 9090);
            client.connect(ipep);
            sender = client.getOutputStream();
            receiver = client.getInputStream();
            return client;
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }
}

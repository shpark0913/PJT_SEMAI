package com.ssafy.semes.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.semes.util.JwtUtil;
import io.jsonwebtoken.Jwt;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
@Slf4j
public class UserInterceptor implements HandlerInterceptor {

    private static final String HEADER_AUTH = "accesstoken";
    ObjectMapper objectMapper = new ObjectMapper();
    final private JwtUtil jwtUtil= new JwtUtil();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
        final String token = request.getHeader(HEADER_AUTH);
        Map<String, Object> temp = new HashMap<>();
        if(token != null && jwtUtil.checkToken(token)){
            log.info("UserInterceptor Use Token : {}", token);
            log.info("UserInterceptor Role : {}", jwtUtil.getUserRole(token));
            if(jwtUtil.getUserRole(token).equals("USER")||jwtUtil.getUserRole(token).equals("ADMIN")) {
                return true;
            }
            else {
                response.setContentType("application/json");
                response.setCharacterEncoding("utf-8");
                temp.put("status", 404);
                temp.put("success", false);
                temp.put("message", "권한이 없습니다.");
            }

        }else{
            log.info("UserInterceptor InvalidToken : {}", token);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            temp.put("status", 401);
            temp.put("success", false);
            temp.put("message", "유효하지 않은 토큰입니다.");
        }
        String result = objectMapper.writeValueAsString(temp);
        response.getWriter().write(result);
        return false;
    }
}

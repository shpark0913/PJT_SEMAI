package com.ssafy.semes.config;

import com.ssafy.semes.interceptor.AdminInterceptor;
import com.ssafy.semes.interceptor.UserInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
//		System.out.println("CORS Setting");
//		default 설정.
//		Allow all origins.
//		Allow "simple" methods GET, HEAD and POST.
//		Allow all headers.
//		Set max age to 1800 seconds (30 minutes).
        registry.addMapping("/**").allowedOrigins("*")
//		.allowedOrigins("http://localhost:8080", "http://localhost:8081")
                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(),
                        HttpMethod.DELETE.name(), HttpMethod.HEAD.name(), HttpMethod.OPTIONS.name(),
                        HttpMethod.PATCH.name())
//			.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
                .maxAge(1800);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AdminInterceptor())
                .addPathPatterns("/**") // 해당 경로에 접근하기 전에 인터셉터가 가로챈다.
                .excludePathPatterns("/user/**")
                .excludePathPatterns("/user")
                .excludePathPatterns("/dashboard/**")
                .excludePathPatterns("/report/**");

        registry.addInterceptor(new UserInterceptor())
                .addPathPatterns("/dashboard/**")
                .addPathPatterns("/dashboard")
                .addPathPatterns("/report/**")
                .addPathPatterns("/report")
                .excludePathPatterns("/report/download");// 추후 제거 필


    }

}


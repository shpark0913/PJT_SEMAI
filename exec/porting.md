# 포팅 가이드(Porting Guide)

## Clone to Run

```bash
git clone https://lab.ssafy.com/s08-final/S08P31A301.git
```

 {var} ⇒ 변수

## Database(mysql 8)

1. install DBMS
    
    [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
    
    username : {myusername}
    
    password : {mypassword}
    
2. create database
    
    ```bash
    CREATE SCHEMA `{myscheme}` ;
    ```
    
3. run ddl
    - ddl
        
        ```bash
        /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
        /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
        /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
        /*!50503 SET NAMES utf8 */;
        /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
        /*!40103 SET TIME_ZONE='+00:00' */;
        /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
        /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
        /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
        /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
        
        --
        -- Table structure for table `image_entity`
        --
        
        DROP TABLE IF EXISTS `image_entity`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `image_entity` (
          `file_id` bigint NOT NULL AUTO_INCREMENT,
          `file_dir` varchar(50) NOT NULL,
          `origin_name` varchar(100) NOT NULL,
          `save_name` varchar(200) NOT NULL,
          `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
          `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 : 삭제, 1: 기본, 2:학습용 데이터',
          PRIMARY KEY (`file_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=2114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        --
        -- Table structure for table `ohtcheck_entity`
        --
        
        DROP TABLE IF EXISTS `ohtcheck_entity`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `ohtcheck_entity` (
          `oht_check_id` bigint NOT NULL AUTO_INCREMENT,
          `fl_bad_count` int NOT NULL,
          `fr_bad_count` int NOT NULL,
          `oht_check_end_datetime` datetime(6) DEFAULT NULL,
          `oht_check_start_datetime` datetime(6) NOT NULL,
          `rl_bad_count` int NOT NULL,
          `rr_bad_count` int NOT NULL,
          `oht_id` bigint DEFAULT NULL,
          PRIMARY KEY (`oht_check_id`),
          KEY `FK3fcbo60mk9eu1fnncdhh4l05i` (`oht_id`),
          CONSTRAINT `FK3fcbo60mk9eu1fnncdhh4l05i` FOREIGN KEY (`oht_id`) REFERENCES `ohtentity` (`oht_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        --
        -- Table structure for table `ohtentity`
        --
        
        DROP TABLE IF EXISTS `ohtentity`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `ohtentity` (
          `oht_id` bigint NOT NULL AUTO_INCREMENT,
          `oht_sn` varchar(10) NOT NULL,
          `change_date` datetime(6) DEFAULT NULL,
          `check_date` datetime(6) DEFAULT NULL,
          PRIMARY KEY (`oht_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        --
        -- Table structure for table `user_entity`
        --
        
        DROP TABLE IF EXISTS `user_entity`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `user_entity` (
          `user_idx` bigint NOT NULL AUTO_INCREMENT,
          `user_id` varchar(20) NOT NULL,
          `user_name` varchar(20) NOT NULL,
          `user_pwd` varchar(20) NOT NULL,
          `user_role` varchar(10) NOT NULL DEFAULT '사용자',
          PRIMARY KEY (`user_idx`)
        ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        --
        -- Table structure for table `wheel_check_confirm_entity`
        --
        
        DROP TABLE IF EXISTS `wheel_check_confirm_entity`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `wheel_check_confirm_entity` (
          `check_id` bigint NOT NULL AUTO_INCREMENT,
          `check_date` datetime(6) NOT NULL,
          `user_idx` bigint DEFAULT NULL,
          `wheel_chcek_id` bigint DEFAULT NULL,
          PRIMARY KEY (`check_id`),
          KEY `FK8rq1xxrsvaw1kqf7utsm5oq6g` (`user_idx`),
          KEY `FKh6ky1rksqtinp9veieaslgyog` (`wheel_chcek_id`),
          CONSTRAINT `FK8rq1xxrsvaw1kqf7utsm5oq6g` FOREIGN KEY (`user_idx`) REFERENCES `user_entity` (`user_idx`),
          CONSTRAINT `FKh6ky1rksqtinp9veieaslgyog` FOREIGN KEY (`wheel_chcek_id`) REFERENCES `wheel_check_entity` (`wheel_chcek_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        --
        -- Table structure for table `wheel_check_entity`
        --
        
        DROP TABLE IF EXISTS `wheel_check_entity`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `wheel_check_entity` (
          `wheel_chcek_id` bigint NOT NULL AUTO_INCREMENT,
          `bolt_good_count` int NOT NULL,
          `bolt_lose_count` int NOT NULL,
          `bolt_out_count` int NOT NULL,
          `wheel_check_date` datetime(6) NOT NULL,
          `wheel_check_result` int NOT NULL,
          `bolt_unclassified_count` int NOT NULL,
          `wheel_position` varchar(255) NOT NULL,
          `file_id` bigint DEFAULT NULL,
          `oht_check_id` bigint DEFAULT NULL,
          PRIMARY KEY (`wheel_chcek_id`),
          KEY `FKiy6so46kwduphuooh7ussc3dh` (`file_id`),
          KEY `FKn5tsf185etfgo3rfloyy0rfnt` (`oht_check_id`),
          CONSTRAINT `FKiy6so46kwduphuooh7ussc3dh` FOREIGN KEY (`file_id`) REFERENCES `image_entity` (`file_id`),
          CONSTRAINT `FKn5tsf185etfgo3rfloyy0rfnt` FOREIGN KEY (`oht_check_id`) REFERENCES `ohtcheck_entity` (`oht_check_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        
        --
        -- Table structure for table `wheel_info_entity`
        --
        
        DROP TABLE IF EXISTS `wheel_info_entity`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `wheel_info_entity` (
          `wheel_info_id` bigint NOT NULL AUTO_INCREMENT,
          `count` int NOT NULL,
          `label` int NOT NULL,
          PRIMARY KEY (`wheel_info_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
        
        /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
        /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
        /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
        /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
        /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
        /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
        /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
        
        -- Dump completed on 2023-05-04 11:14:13
        ```
        

## Back-end SpringBoot

1. install intelliJ
    
    [https://www.jetbrains.com/ko-kr/idea/download/#section=windows](https://www.jetbrains.com/ko-kr/idea/download/#section=windows)
    
2. open project
    
    <aside>
    💡 /backend/semes
    
    </aside>
    
3. Project setting
    1. file - Project settings - Project - SDK - java 11 버전 다운로드 및 설정(azul-11)
    2. file - Settings - ‘gradle’ 검색 - Gradle Projects - semes - Gradle JVM (azul-11)로 설정
    3. load gradle project
        
        ![Untitled](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3(Porting%20Guide)%205551d8d8ce2943ea9b76738bd94c0354/Untitled.png)
        
4. Edit application.yml
    
    spring.datasource.url
    
    ```bash
    spring:
      datasource:
    ...
    		username: {myusername}
        url: jdbc:mysql://localhost:3306/{myscheme}?allowMultiQueries=true&useUniCode=yes&characterEncoding=UTF-8&serverTimezone=Asia/Seoul
    		password: {mypassword}
    ... 
    ```
    
5. Run project
    
    ![Untitled](%E1%84%91%E1%85%A9%E1%84%90%E1%85%B5%E1%86%BC%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3(Porting%20Guide)%205551d8d8ce2943ea9b76738bd94c0354/Untitled%201.png)
    

## AI model server(Python, Fast API)

1. install python 3.9.* 파이썬 설치
    
    [https://www.python.org/downloads/release/python-3913/](https://www.python.org/downloads/release/python-3913/)`
    
2. install python packages 파이썬 패키지 설치
    
    ```bash
    # /ai
    
    pip insatll -r requirements.txt # or "python -m pip install -r .\requirements.txt"
    ```
    
3. run fast api [main.py](http://main.py) FastAPI 실행
    
    ```bash
    python -m uvicorn main:app --reload
    ```
    

## Front end (Node, react)

1. install Node.js (18.16.0)
    
    [https://nodejs.org/ko/download](https://nodejs.org/ko/download)
    
2. install node packages
    
    ```bash
    # /frontend
    npm install
    ```
    
3. create .env file
    
    ```bash
    # /frontend/.env
    
    REACT_APP_BASE_URL=http://semes.info:8888/dev/
    REACT_APP_IMG_URL=http://semes.info/dataset
    ```
    
4. run react app
    
    ```bash
    npm start
    ```
-- Drop the existing database if it exists
DROP DATABASE IF EXISTS teste;

-- Create a new database named "teste"
CREATE DATABASE teste;

-- Use the "teste" database
USE teste;

-- Tabela de Usuários

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    full_name VARCHAR(255),
    document VARCHAR(255) UNIQUE, 
    phone VARCHAR(255),
    reset_password_code VARCHAR(255),
    reset_password_date_time DATETIME,
    reset_password_tries INT DEFAULT 0,
    methods JSON,
    session_token VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME DEFAULT NULL
);

-- Tabela de Especialidades
CREATE TABLE specialties (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);

-- Tabela de Seguros
CREATE TABLE insurances (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);

-- Tabela de Profissionais
CREATE TABLE professionals (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) ,
    crm VARCHAR(255) ,
    rating FLOAT DEFAULT 0 ,
    rating_count INT DEFAULT 0,
    address VARCHAR(255) ,
    phone VARCHAR(255) ,
    profile_image_url TEXT DEFAULT NULL,
    slot_interval INT ,
    location POINT ,  
    owner_id VARCHAR(255) REFERENCES users(id) ,
    created_at DATETIME ,
    updated_at DATETIME ,
    visible BOOLEAN  DEFAULT TRUE,
    finished_Profile BOOLEAN  DEFAULT FALSE,
    search_words VARCHAR(255),
    deleted_at DATETIME DEFAULT NULL
);

-- Tabela de Serviços
CREATE TABLE services (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) ,
    price DECIMAL ,
    duration INT ,
    available BOOLEAN ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);

-- Tabela de Horários
CREATE TABLE schedules (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) ,
  professional_id VARCHAR(255) ,
  end_date DATETIME ,
  start_date DATETIME ,
  status VARCHAR(255) ,
  block BOOLEAN DEFAULT FALSE,
  sent_rate_notification BOOLEAN DEFAULT FALSE,
  created_at DATETIME ,
  updated_at DATETIME ,
  deleted_at DATETIME DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (professional_id) REFERENCES professionals(id)
);

-- Tabela de Regras de Agendamento
CREATE TABLE schedule_rules (
  id VARCHAR(255) PRIMARY KEY,
  professional_id VARCHAR(255) ,
  weekday INT ,
  start_time DATETIME ,
  end_time DATETIME ,
  created_at DATETIME ,
  updated_at DATETIME ,
  deleted_at DATETIME DEFAULT NULL,
  FOREIGN KEY (professional_id) REFERENCES professionals(id)
);

-- Tabela de Relação Profissional-Serviço
CREATE TABLE professional_services (
    id VARCHAR(255) PRIMARY KEY,
    professional_id VARCHAR(255) REFERENCES professionals(id),
    service_id VARCHAR(255) REFERENCES services(id) ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);

-- Tabela de Relação Profissional-Especialidade
CREATE TABLE professional_specialties (
    id VARCHAR(255) PRIMARY KEY,
    professional_id VARCHAR(255) REFERENCES professionals(id) ,
    specialty_id VARCHAR(255) REFERENCES specialties(id) ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);

-- Tabela de Relação Profissional-Seguro
CREATE TABLE professional_insurances (
    id VARCHAR(255) PRIMARY KEY,
    professional_id VARCHAR(255) REFERENCES professionals(id) ,
    insurance_id VARCHAR(255) REFERENCES insurances(id) ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);

CREATE TABLE devices (
    id VARCHAR(255) PRIMARY KEY,
    device_id VARCHAR(255) ,
    platform VARCHAR(50) ,
    fcm_token VARCHAR(255) ,
    build_number VARCHAR(50) ,
    user_id VARCHAR(255),
    locale VARCHAR(50),
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) 
);

 -- Create dynamic_notification table
CREATE TABLE dynamic_notification (
    id VARCHAR(255) PRIMARY KEY,
    key_name VARCHAR(255) ,
    title TEXT ,
    subtitle TEXT ,
    page TEXT ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);

-- Create notification table
CREATE TABLE notification (
    id VARCHAR(255) PRIMARY KEY,
    is_read BOOLEAN DEFAULT FALSE,
    user_id VARCHAR(255) ,
    dynamic_notification_id VARCHAR(255) ,
    `variables` JSON,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ,
    FOREIGN KEY (dynamic_notification_id) REFERENCES dynamic_notification(id) 
);

CREATE TABLE schedule_services (
    id VARCHAR(255) PRIMARY KEY,
    schedule_id VARCHAR(255) REFERENCES schedules(id) ,
    service_id VARCHAR(255) REFERENCES services(id) ,
    created_at DATETIME ,
    updated_at DATETIME ,
    deleted_at DATETIME DEFAULT NULL
);


CREATE TABLE ratings (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    professional_id VARCHAR(255) REFERENCES professionals(id),
    stars INT,
    comments TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (professional_id) REFERENCES professionals(id)
);

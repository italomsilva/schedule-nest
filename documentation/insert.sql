
INSERT INTO users (id, email, username, password, full_name, document, phone, reset_password_tries, methods, session_token, created_at, updated_at)
VALUES 
('1', 'user1@example.com', 'user1', 'password1', 'User One', '123456789', '123456789', 0, '["method1", "method2"]', 'session_token_1', NOW(), NOW()),
('2', 'user2@example.com', 'user2', 'password2', 'User Two', '987654321', '987654321', 0, '["method3", "method4"]', 'session_token_2', NOW(), NOW()),
('3', 'user3@example.com', 'user3', 'password3', 'User Three', '456789123', '456789123', 0, '["method5", "method6"]', 'session_token_3', NOW(), NOW());

-- Inserir especialidades
INSERT INTO specialties (id, name, created_at, updated_at)
VALUES 
('1', 'Cardiologia', NOW(), NOW()),
('2', 'Dermatologia', NOW(), NOW()),
('3', 'Ortopedia', NOW(), NOW());

-- Inserir seguros
INSERT INTO insurances (id, name, created_at, updated_at)
VALUES 
('1', 'Seguro1', NOW(), NOW()),
('2', 'Seguro2', NOW(), NOW()),
('3', 'Seguro3', NOW(), NOW());

-- Inserir profissionais
INSERT INTO professionals (id, name, crm, rating, rating_count, address, phone, profile_image_url, slot_interval, location, owner_id, created_at, updated_at, visible, finished_Profile, search_words)
VALUES 
('1', 'Dr. João Silva', '123456', 4.5, 20, 'Rua A, 123', '123456789', "https://lingobridge.s3.amazonaws.com/images/profile/043d2b8c-6448-4caa-bbc9-72cfcb1d168c", 30, POINT(40.7128, -74.0060), '1', NOW(), NOW(), TRUE, FALSE, 'joão silva cardiologia'),
('2', 'Dra. Maria Santos', '654321', 4.0, 15, 'Rua B, 456', '987654321', "https://lingobridge.s3.amazonaws.com/images/profile/043d2b8c-6448-4caa-bbc9-72cfcb1d168c", 45, POINT(34.0522, -118.2437), '2', NOW(), NOW(), TRUE, FALSE, 'maria santos dermatologia'),
('3', 'Dr. Pedro Oliveira', '789123', 4.8, 30, 'Rua C, 789', '456789123', "https://lingobridge.s3.amazonaws.com/images/profile/043d2b8c-6448-4caa-bbc9-72cfcb1d168c", 60, POINT(51.5074, -0.1278), '3', NOW(), NOW(), TRUE, FALSE, 'pedro oliveira ortopedia');

-- Inserir serviços
INSERT INTO services (id, name, price, duration, available, created_at, updated_at)
VALUES 
('1', 'Consulta', 100.00, 60, TRUE, NOW(), NOW()),
('2', 'Exame de Sangue', 50.00, 30, TRUE, NOW(), NOW()),
('3', 'Cirurgia', 1000.00, 120, TRUE, NOW(), NOW());

-- Inserir horários
INSERT INTO schedules (id, user_id, professional_id, end_date, start_date, status, block, sent_rate_notification, created_at, updated_at)
VALUES 
('1', '1', '1', '2024-05-15 18:00:00', '2024-05-15 08:00:00', 'booked', FALSE, FALSE, NOW(), NOW()),
('2', '2', '2', '2024-05-16 17:00:00', '2024-05-16 09:00:00', 'booked', FALSE, FALSE, NOW(), NOW()),
('3', '3', '3', '2024-05-17 16:00:00', '2024-05-17 10:00:00', 'booked', FALSE, FALSE, NOW(), NOW());

-- Inserir regras de agendamento
INSERT INTO schedule_rules (id, professional_id, weekday, start_time, end_time, created_at, updated_at)
VALUES 
    ('1', '1', 1, '2024-05-12 09:00:00', '2024-05-12 18:00:00', NOW(), NOW()),
    ('2', '2', 2, '2024-05-13 10:00:00', '2024-05-13 19:00:00', NOW(), NOW()),
    ('3', '3', 3, '2024-05-14 11:00:00', '2024-05-14 20:00:00', NOW(), NOW());
-- Inserir relação profissional-serviço
INSERT INTO professional_services (id, professional_id, service_id, created_at, updated_at)
VALUES 
('1', '1', '1', NOW(), NOW()),
('2', '2', '2', NOW(), NOW()),
('3', '3', '3', NOW(), NOW());

-- Inserir relação profissional-especialidade
INSERT INTO professional_specialties (id, professional_id, specialty_id, created_at, updated_at)
VALUES 
('1', '1', '1', NOW(), NOW()),
('2', '2', '2', NOW(), NOW()),
('3', '3', '3', NOW(), NOW());

-- Inserir relação profissional-seguro
INSERT INTO professional_insurances (id, professional_id, insurance_id, created_at, updated_at)
VALUES 
('1', '1', '1', NOW(), NOW()),
('2', '2', '2', NOW(), NOW()),
('3', '3', '3', NOW(), NOW());

-- Inserir dispositivos
INSERT INTO devices (id, device_id, platform, fcm_token, build_number, user_id, locale, created_at, updated_at)
VALUES 
('1', 'device1', 'iOS', 'fcm_token1', '1.0', '1', 'en-US', NOW(), NOW()),
('2', 'device2', 'Android', 'fcm_token2', '1.0', '2', 'en-US', NOW(), NOW()),
('3', 'device3', 'iOS', 'fcm_token3', '1.0', '3', 'en-US', NOW(), NOW());

-- Inserir notificações dinâmicas
INSERT INTO dynamic_notification (id, key_name, title, subtitle, page, created_at, updated_at)
VALUES 
('1', 'key1', 'Title 1', 'Subtitle 1', 'page1', NOW(), NOW()),
('2', 'key2', 'Title 2', 'Subtitle 2', 'page2', NOW(), NOW()),
('3', 'key3', 'Title 3', 'Subtitle 3', 'page3', NOW(), NOW());

-- Inserir notificações
INSERT INTO notification (id, is_read, user_id, dynamic_notification_id, `variables`, created_at, updated_at)
VALUES 
('1', FALSE, '1', '1', '{"var1": "value1"}', NOW(), NOW()),
('2', FALSE, '2', '2', '{"var2": "value2"}', NOW(), NOW()),
('3', FALSE, '3', '3', '{"var3": "value3"}', NOW(), NOW());

-- Inserir relação agendamento-serviço
INSERT INTO schedule_services (id, schedule_id, service_id, created_at, updated_at)
VALUES 
('1', '1', '1', NOW(), NOW()),
('2', '2', '2', NOW(), NOW()),
('3', '3', '3', NOW(), NOW());


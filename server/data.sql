
-- Insert dummy users with pre-hashed passwords
INSERT INTO users (email, password, role) VALUES
('sumair@mafna.com', '$2a$12$jwXx1o7UH4fugK3tldEki.YgYTs2aYzmM4PqZbtOVB6cTJLRwRAUW', 'admin');
INSERT INTO members (is_email_verified, user_id) VALUES  (1, 1);

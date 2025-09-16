
-- Drop the users table if it already exists
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(255) NOT NULL, -- Hashed passwords for security
    email VARCHAR(255) UNIQUE NOT NULL, -- Ensuring unique emails
    role ENUM('admin', 'member') NOT NULL DEFAULT 'member',
    last_otp INT DEFAULT NULL
);

-- Drop the members table if it already exists
DROP TABLE IF EXISTS members;

-- Create the members table
CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL, -- Foreign key linking to users table
    first_name VARCHAR(128) DEFAULT NULL,
    last_name VARCHAR(50) DEFAULT NULL,
    middle_name VARCHAR(32) DEFAULT NULL,
    phone VARCHAR(30) DEFAULT NULL,
    account_verified TINYINT(1) NOT NULL DEFAULT 0,
    is_email_verified TINYINT(1) DEFAULT 0,
    dob TIMESTAMP DEFAULT 0,
    is_searchable  TINYINT(1) NOT NULL DEFAULT 0,
    village VARCHAR(128) DEFAULT NULL,
    gender INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

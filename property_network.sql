DROP DATABASE IF EXISTS property_network;
CREATE DATABASE property_network;
USE property_network;

CREATE TABLE admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE agents (
    agent_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    agency_name VARCHAR(150),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE buyers (
    buyer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE listings (
    listing_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    property_type ENUM('house', 'apartment', 'condo', 'villa', 'flat') NOT NULL,
    status ENUM('available', 'pending', 'sold', 'archived') DEFAULT 'available',
    agent_id INT,
    admin_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE SET NULL,
    FOREIGN KEY (admin_id) REFERENCES admins(admin_id) ON DELETE SET NULL
);

CREATE TABLE listing_details (
    detail_id INT PRIMARY KEY AUTO_INCREMENT,
    feature_name VARCHAR(100) NOT NULL,
    feature_value VARCHAR(255),
    listing_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE
);

CREATE TABLE listing_photos (
    photo_id INT PRIMARY KEY AUTO_INCREMENT,
    photo_path VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    listing_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE
);

-- RM: appointment_id PK, appointment_date, note, status, listing_id FK, buyer_id FK
CREATE TABLE appointments (
    appointment_id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_date DATE NOT NULL,
    note TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    listing_id INT,
    buyer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE
);

CREATE TABLE messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    body TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    agent_id INT,
    buyer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE
);

CREATE TABLE notifications (
    notif_id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    buyer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    agent_id INT,
    buyer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE
);

-- RM: report_id PK, report_type, status, reason, listing_id FK, buyer_id FK, admin_id FK
CREATE TABLE reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    report_type VARCHAR(50),
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    listing_id INT,
    buyer_id INT,
    admin_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(admin_id) ON DELETE SET NULL
);

CREATE TABLE saved_listings (
    saved_id INT PRIMARY KEY AUTO_INCREMENT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    listing_id INT,
    buyer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE
);

CREATE TABLE listing_comparisons (
    compare_id INT PRIMARY KEY AUTO_INCREMENT,
    listing_ids JSON,
    buyer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE
);

CREATE TABLE saved_searches (
    search_id INT PRIMARY KEY AUTO_INCREMENT,
    keyword VARCHAR(255),
    filters_json JSON,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    buyer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE
);

-- RM: question_id PK, body, is_anonymous, tag, buyer_id FK, listing_id FK
CREATE TABLE qa_questions (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    body TEXT NOT NULL,
    tag VARCHAR(100),
    is_anonymous BOOLEAN DEFAULT FALSE,
    buyer_id INT,
    listing_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES buyers(buyer_id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES listings(listing_id) ON DELETE CASCADE
);

CREATE TABLE qa_answers (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    body TEXT NOT NULL,
    is_helpful BOOLEAN DEFAULT FALSE,
    question_id INT,
    agent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES qa_questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES agents(agent_id) ON DELETE CASCADE
);

-- ─── SAMPLE DATA ───────────────────────────────────────────

INSERT INTO admins (full_name, email, password) VALUES
('Admin', 'admin@propertynetwork.com', '$2b$10$IMTC5dmbsQcj0LETXWH3d.onoQW0Tk7M5ghytdS9NtkWif2lDGLEG');

INSERT INTO agents (full_name, email, phone, password, agency_name, is_verified) VALUES
('Violet Soun', 'violet@agency.com', '012345678', '$2b$10$IMTC5dmbsQcj0LETXWH3d.onoQW0Tk7M5ghytdS9NtkWif2lDGLEG', 'Phnom Penh Realty', TRUE),
('Ratana Neary', 'neary@agency.com', '098765432', '$2b$10$IMTC5dmbsQcj0LETXWH3d.onoQW0Tk7M5ghytdS9NtkWif2lDGLEG', 'Cambodia Properties', TRUE),
('Roththeany Sambath', 'theany@agency.com', '011223344', '$2b$10$IMTC5dmbsQcj0LETXWH3d.onoQW0Tk7M5ghytdS9NtkWif2lDGLEG', 'Golden Key Agency', FALSE);

INSERT INTO buyers (full_name, email, phone, password, profile_photo, status) VALUES
('Maya Chea', 'maya@gmail.com', '012111222', '$2b$10$IMTC5dmbsQcj0LETXWH3d.onoQW0Tk7M5ghytdS9NtkWif2lDGLEG', 'photos/maya.jpg', 'active'),
('Davan Noun', 'davan@gmail.com', '012333444', '$2b$10$IMTC5dmbsQcj0LETXWH3d.onoQW0Tk7M5ghytdS9NtkWif2lDGLEG', 'photos/davan.jpg', 'active'),
('Sreyleak Heng', 'sreyleak@gmail.com', '012555666', '$2b$10$IMTC5dmbsQcj0LETXWH3d.onoQW0Tk7M5ghytdS9NtkWif2lDGLEG', NULL, 'active');

INSERT INTO listings (title, description, price, city, address, property_type, status, agent_id, admin_id) VALUES
('Modern Condo in BKK1', '2 bedroom condo with city view', 85000.00, 'Phnom Penh', 'BKK1, Khan Chamkarmon', 'condo', 'available', 1, 1),
('Spacious Villa in Toul Kork', '4 bedroom villa with garden', 250000.00, 'Phnom Penh', 'Toul Kork, Khan Toul Kork', 'villa', 'available', 2, 1),
('Affordable Flat in Sen Sok', '1 bedroom flat near market', 45000.00, 'Phnom Penh', 'Sen Sok, Khan Sen Sok', 'flat', 'pending', 1, 1),
('Family House in Chbar Ampov', '3 bedroom house with parking', 120000.00, 'Phnom Penh', 'Chbar Ampov, Khan Chbar Ampov', 'house', 'available', 3, 1);

INSERT INTO listing_details (feature_name, feature_value, listing_id) VALUES
('bedrooms', '2', 1), ('bathrooms', '2', 1), ('floor_area', '85 sqm', 1),
('bedrooms', '4', 2), ('bathrooms', '3', 2), ('floor_area', '320 sqm', 2),
('bedrooms', '1', 3), ('floor_area', '45 sqm', 3);

INSERT INTO listing_photos (photo_path, display_order, listing_id) VALUES
('photos/listing1_main.jpg', 1, 1),
('photos/listing1_bedroom.jpg', 2, 1),
('photos/listing2_main.jpg', 1, 2),
('photos/listing3_main.jpg', 1, 3);

INSERT INTO appointments (appointment_date, note, status, listing_id, buyer_id) VALUES
('2026-06-20', 'Please call before arriving', 'pending', 1, 1),
('2026-06-22', 'Available in the morning only', 'confirmed', 2, 2),
('2026-06-25', NULL, 'pending', 4, 3);

INSERT INTO messages (body, is_read, agent_id, buyer_id) VALUES
('Hello, I am interested in the BKK1 condo. Is it still available?', TRUE, 1, 1),
('Yes it is still available! When would you like to visit?', TRUE, 1, 1),
('Can you tell me more about the villa in Toul Kork?', FALSE, 2, 2);

INSERT INTO notifications (type, message, is_read, buyer_id) VALUES
('message', 'You have a new message from Agent Violet', FALSE, 1),
('appointment', 'Your appointment for Modern Condo in BKK1 is confirmed', TRUE, 2),
('review', 'Your review has been posted successfully', FALSE, 3);

INSERT INTO reviews (rating, comment, agent_id, buyer_id) VALUES
(5, 'Violet was very professional and helpful throughout the process', 1, 1),
(4, 'Theany showed us many great options, very patient', 2, 2),
(3, 'Neary was okay but communication could be better', 3, 3);

INSERT INTO reports (report_type, reason, status, listing_id, buyer_id, admin_id) VALUES
('fake listing', 'The address does not exist when I visited', 'pending', 3, 1, 1),
('wrong price', 'The actual price is different from what is listed', 'pending', 4, 2, 1);

INSERT INTO saved_listings (listing_id, buyer_id) VALUES
(1, 1), (2, 1), (3, 2);

INSERT INTO listing_comparisons (listing_ids, buyer_id) VALUES
('[1, 2]', 1), ('[3, 4]', 2);

INSERT INTO saved_searches (keyword, filters_json, buyer_id) VALUES
('condo BKK1', '{"city": "Phnom Penh", "type": "condo", "max_price": 100000}', 1),
('villa Toul Kork', '{"city": "Phnom Penh", "type": "villa", "min_price": 200000}', 2);

INSERT INTO qa_questions (body, tag, is_anonymous, buyer_id, listing_id) VALUES
('What documents do I need to buy a property in Cambodia?', 'legal', FALSE, 1, 1),
('Is it safe to buy property near Sen Sok area?', 'location', TRUE, 2, 3),
('What is the average price per sqm in BKK1?', 'pricing', TRUE, 3, 1);

INSERT INTO qa_answers (body, is_helpful, question_id, agent_id) VALUES
('You will need a valid passport, sale and purchase agreement, and proof of funds.', TRUE, 1, 1),
('Sen Sok is a growing area with many new developments. Generally safe with good infrastructure.', TRUE, 2, 2),
('The average price in BKK1 ranges from $2,500 to $4,000 per sqm.', FALSE, 3, 1);

-- ─── VERIFY ────────────────────────────────────────────────

SELECT * FROM admins;
SELECT * FROM agents;
SELECT * FROM buyers;
SELECT l.listing_id, l.title, l.price, l.city, a.full_name AS agent_name
FROM listings l
JOIN agents a ON l.agent_id = a.agent_id
WHERE l.status = 'active';
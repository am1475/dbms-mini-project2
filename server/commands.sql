CREATE TABLE recharge_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(15),
    plan_type VARCHAR(50),
    price VARCHAR(20),
    validity VARCHAR(20),
    data VARCHAR(50),
    subscriptions TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

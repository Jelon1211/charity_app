CREATE TABLE donations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    donated_at BIGINT UNSIGNED NOT NULL,
    amount INT UNSIGNED NOT NULL,
    purpose JSON NOT NULL,
    source ENUM('dozbrajamy', 'web_dev') NOT NULL,
    created BIGINT UNSIGNED NOT NULL,
    modified BIGINT UNSIGNED NOT NULL,
    INDEX idx_donated_at (donated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS url_mappings (
    id SERIAL PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    original_url text NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)
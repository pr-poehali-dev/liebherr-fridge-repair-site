CREATE TABLE t_p32778253_liebherr_fridge_repa.orders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  model TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
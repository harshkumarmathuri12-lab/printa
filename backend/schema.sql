CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('customer', 'admin');
CREATE TYPE order_status AS ENUM ('draft', 'pending_payment', 'paid', 'in_production', 'shipped', 'cancelled');
CREATE TYPE print_job_status AS ENUM ('queued', 'processing', 'completed', 'failed');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES product_categories(id),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  base_price_cents INTEGER NOT NULL,
  preview_image_url TEXT NOT NULL,
  print_width_in NUMERIC(8, 3) NOT NULL,
  print_height_in NUMERIC(8, 3) NOT NULL,
  bleed_in NUMERIC(8, 3) NOT NULL DEFAULT 0.125,
  dpi INTEGER NOT NULL DEFAULT 300,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  option_type TEXT NOT NULL,
  option_value TEXT NOT NULL,
  price_delta_cents INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  thumbnail_url TEXT,
  fabric_json JSONB NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  template_id UUID REFERENCES templates(id),
  name TEXT NOT NULL,
  fabric_json JSONB NOT NULL,
  preview_image_key TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  design_id UUID REFERENCES designs(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  variant_config JSONB NOT NULL DEFAULT '{}',
  design_snapshot JSONB NOT NULL,
  preview_image_key TEXT,
  unit_price_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  status order_status NOT NULL DEFAULT 'pending_payment',
  subtotal_cents INTEGER NOT NULL,
  shipping_cents INTEGER NOT NULL DEFAULT 0,
  tax_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL,
  stripe_payment_intent_id TEXT,
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  design_id UUID REFERENCES designs(id),
  quantity INTEGER NOT NULL,
  variant_config JSONB NOT NULL,
  design_snapshot JSONB NOT NULL,
  preview_image_key TEXT,
  print_file_key TEXT,
  unit_price_cents INTEGER NOT NULL
);

CREATE TABLE print_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  status print_job_status NOT NULL DEFAULT 'queued',
  input_design JSONB NOT NULL,
  output_pdf_key TEXT,
  output_png_key TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_templates_product ON templates(product_id);
CREATE INDEX idx_designs_user ON designs(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_print_jobs_status ON print_jobs(status);

-- Run this in your Supabase SQL Editor to create the products table

CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    "desc" TEXT NOT NULL,
    "isNew" BOOLEAN DEFAULT false,
    image TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    stock BOOLEAN DEFAULT true,
    features JSONB DEFAULT '[]'::jsonb,
    "longDesc" TEXT,
    "oldPrice" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (so anyone visiting the website can see the gears)
CREATE POLICY "Allow public read access"
ON public.products
FOR SELECT
TO public
USING (true);

-- Allow anonymous insert, update, and delete (For the Admin Panel right now)
-- Note: In a production app with real authentication, you would restrict this to authenticated admins only.
CREATE POLICY "Allow public insert access"
ON public.products
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update access"
ON public.products
FOR UPDATE
TO public
USING (true);

CREATE POLICY "Allow public delete access"
ON public.products
FOR DELETE
TO public
USING (true);


-- COMBOS TABLE
CREATE TABLE IF NOT EXISTS public.combos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    "originalPrice" TEXT NOT NULL,
    "discountedPrice" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    image TEXT NOT NULL,
    items JSONB DEFAULT '[]'::jsonb,
    "isFeatured" BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.combos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on combos"
ON public.combos
FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert access on combos"
ON public.combos
FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update access on combos"
ON public.combos
FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public delete access on combos"
ON public.combos
FOR DELETE TO public USING (true);


-- INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    requirements TEXT,
    "productName" TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on inquiries" ON public.inquiries FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert access on inquiries" ON public.inquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public update access on inquiries" ON public.inquiries FOR UPDATE TO public USING (true);
CREATE POLICY "Allow public delete access on inquiries" ON public.inquiries FOR DELETE TO public USING (true);


-- ADD SOLD_AT TO PRODUCTS
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS "soldAt" TIMESTAMP WITH TIME ZONE;

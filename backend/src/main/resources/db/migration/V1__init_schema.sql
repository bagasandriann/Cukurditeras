CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE slot_status AS ENUM ('AVAILABLE', 'BOOKED', 'CLOSED');
CREATE TYPE booking_status AS ENUM ('CONFIRMED', 'CANCELLED');
CREATE TYPE notif_type AS ENUM ('BOOKING_CONFIRM', 'REMINDER', 'CANCELLATION');
CREATE TYPE notif_status AS ENUM ('PENDING', 'SENT', 'FAILED');
CREATE TYPE recipient_type AS ENUM ('CUSTOMER', 'CAPSTER');

CREATE TABLE capster (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE slot (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    capster_id UUID NOT NULL REFERENCES capster(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status slot_status NOT NULL DEFAULT 'AVAILABLE',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_slot_time CHECK (end_time > start_time)
);

CREATE TABLE booking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID NOT NULL UNIQUE REFERENCES slot(id),
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    booking_code VARCHAR(10) NOT NULL UNIQUE,
    status booking_status NOT NULL DEFAULT 'CONFIRMED',
    reminder_sent BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ
);

CREATE TABLE notification_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES booking(id),
    recipient_phone VARCHAR(20) NOT NULL,
    recipient_type recipient_type NOT NULL,
    type notif_type NOT NULL,
    status notif_status NOT NULL DEFAULT 'PENDING',
    message_preview VARCHAR(500),
    retry_count INTEGER NOT NULL DEFAULT 0,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_slot_capster_date ON slot(capster_id, date);
CREATE INDEX idx_slot_status ON slot(status);
CREATE INDEX idx_booking_code ON booking(booking_code);
CREATE INDEX idx_booking_reminder ON booking(reminder_sent, status);
CREATE INDEX idx_notif_booking ON notification_log(booking_id);
CREATE INDEX idx_notif_status ON notification_log(status);

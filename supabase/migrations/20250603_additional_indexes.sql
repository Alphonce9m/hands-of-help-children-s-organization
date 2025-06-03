-- Indexes for donations table
-- Index for filtering by status and user_id
CREATE INDEX idx_donations_status_user ON donations(status, user_id);

-- Index for finding recent donations
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Index for filtering by amount range
CREATE INDEX idx_donations_amount ON donations(amount);

-- Index for payment transactions table
-- Index for M-Pesa transaction lookup
CREATE INDEX idx_payment_transactions_transaction_id ON payment_transactions(transaction_id);

-- Index for phone number lookup
CREATE INDEX idx_payment_transactions_phone_number ON payment_transactions(phone_number);

-- Index for status filtering
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);

-- Index for joining with donations
CREATE INDEX idx_payment_transactions_donation_id_status ON payment_transactions(donation_id, status);

-- Indexes for campaigns table
-- Index for active campaigns
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- Index for campaign date range queries
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);

-- Index for filtering by target amount
CREATE INDEX idx_campaigns_target_amount ON campaigns(target_amount);

-- Indexes for users table
-- Index for phone number lookup
CREATE INDEX idx_users_phone_number ON users(phone_number);

-- Index for email lookup
CREATE INDEX idx_users_email ON users(email);

-- Partial indexes for specific use cases
-- Index for active campaigns only
CREATE INDEX idx_campaigns_active ON campaigns(status) WHERE status = 'active';

-- Index for completed donations only
CREATE INDEX idx_donations_completed ON donations(status) WHERE status = 'completed';

-- Index for failed transactions only
CREATE INDEX idx_payment_transactions_failed ON payment_transactions(status) WHERE status = 'failed';

-- Index for recent active users
CREATE INDEX idx_users_recently_active ON users(updated_at DESC) WHERE updated_at > NOW() - INTERVAL '30 days';

-- Indexes for common JOIN operations
-- Index for joining donations with users
CREATE INDEX idx_donations_user_id_status ON donations(user_id, status);

-- Index for joining payment transactions with donations
CREATE INDEX idx_payment_transactions_donation_id_status ON payment_transactions(donation_id, status);

-- Index for campaign progress calculation
CREATE INDEX idx_campaigns_progress ON campaigns(target_amount, current_amount, status);

-- Index for impact statistics calculation
CREATE INDEX idx_donations_completed_amount ON donations(amount) WHERE status = 'completed';

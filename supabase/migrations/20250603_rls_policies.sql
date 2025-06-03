-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
    ON users FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Donations table policies
CREATE POLICY "Users can view their own donations"
    ON donations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all donations"
    ON donations FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Users can create donations"
    ON donations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update donations"
    ON donations FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Payment transactions table policies
CREATE POLICY "Users can view their own payment transactions"
    ON payment_transactions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM donations 
        WHERE donations.id = payment_transactions.donation_id 
        AND donations.user_id = auth.uid()
    ));

CREATE POLICY "Admin can view all payment transactions"
    ON payment_transactions FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "System can create payment transactions"
    ON payment_transactions FOR INSERT
    USING (auth.role() = 'service_role');

-- Impact statistics table policies
CREATE POLICY "Anyone can view impact statistics"
    ON impact_statistics FOR SELECT
    USING (true);

CREATE POLICY "Admin can update impact statistics"
    ON impact_statistics FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Campaigns table policies
CREATE POLICY "Anyone can view campaigns"
    ON campaigns FOR SELECT
    USING (true);

CREATE POLICY "Admin can manage campaigns"
    ON campaigns FOR ALL
    USING (auth.role() = 'authenticated');

-- Create a function to update impact statistics
CREATE OR REPLACE FUNCTION update_impact_statistics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update total donations
    UPDATE impact_statistics
    SET 
        total_donations = (
            SELECT COALESCE(SUM(amount), 0) 
            FROM donations 
            WHERE status = 'completed'
        ),
        total_donors = (
            SELECT COUNT(DISTINCT user_id) 
            FROM donations 
            WHERE status = 'completed'
        ),
        total_impact = (
            SELECT COUNT(*) 
            FROM donations 
            WHERE status = 'completed'
        )
    WHERE true;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to update impact statistics
CREATE TRIGGER update_impact_statistics_trigger
    AFTER INSERT OR UPDATE OR DELETE ON donations
    FOR EACH STATEMENT
    EXECUTE FUNCTION update_impact_statistics();

// Supabase configuration and database operations
const supabaseConfig = {
    url: 'https://nfwuztbyvbasaqbpyojr.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5md3V6dGJ5dmJhc2FxYnB5b2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNjQ4NzcsImV4cCI6MjA3MDY0MDg3N30.DhEvb6H9kczxdD1N9_d6DmDkk6_9sUGZfKSFk7hYLdQ'
};

class SupabaseClient {
    constructor() {
        this.baseURL = `${supabaseConfig.url}/rest/v1`;
        this.headers = {
            'apikey': supabaseConfig.key,
            'Authorization': `Bearer ${supabaseConfig.key}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        };
    }

    async createUser(userData) {
        try {
            const response = await fetch(`${this.baseURL}/users`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    ...userData,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error creating user:', error);
            return false;
        }
    }

    async updateUserProgress(email, progressData) {
        try {
            const response = await fetch(`${this.baseURL}/user_progress`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    user_email: email,
                    ...progressData,
                    updated_at: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error updating progress:', error);
            return false;
        }
    }

    async saveQuizResult(email, quizData) {
        try {
            const response = await fetch(`${this.baseURL}/quiz_results`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    user_email: email,
                    ...quizData,
                    completed_at: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error saving quiz result:', error);
            return false;
        }
    }

    async getUserStats(email) {
        try {
            const response = await fetch(`${this.baseURL}/user_progress?user_email=eq.${email}`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user stats:', error);
            return null;
        }
    }
}

// Initialize Supabase client
window.supabaseClient = new SupabaseClient();

// Database schema creation (for reference)
const databaseSchema = {
    users: `
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            full_name TEXT NOT NULL,
            designation TEXT NOT NULL,
            team TEXT NOT NULL,
            city TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            last_login TIMESTAMPTZ DEFAULT NOW()
        );
    `,
    user_progress: `
        CREATE TABLE IF NOT EXISTS user_progress (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_email TEXT REFERENCES users(email),
            habit_type TEXT NOT NULL,
            selected_habit TEXT NOT NULL,
            current_stage INTEGER DEFAULT 1,
            progress_percentage INTEGER DEFAULT 0,
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `,
    quiz_results: `
        CREATE TABLE IF NOT EXISTS quiz_results (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_email TEXT REFERENCES users(email),
            habit_type TEXT NOT NULL,
            selected_habit TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            percentage DECIMAL(5,2) NOT NULL,
            completed_at TIMESTAMPTZ DEFAULT NOW()
        );
    `
};
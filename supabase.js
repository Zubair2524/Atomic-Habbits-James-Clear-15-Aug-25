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
            const response = await fetch(`${this.baseURL}/atomic_habit`, {
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

    async updateUserProgress(fullName, progressData) {
        try {
            const response = await fetch(`${this.baseURL}/atomic_habit?full_name=eq.${encodeURIComponent(fullName)}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
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

    async saveQuizResult(fullName, quizData) {
        try {
            const response = await fetch(`${this.baseURL}/atomic_habit?full_name=eq.${encodeURIComponent(fullName)}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
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

    async getUserStats(fullName) {
        try {
            const response = await fetch(`${this.baseURL}/atomic_habit?full_name=eq.${encodeURIComponent(fullName)}`, {
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

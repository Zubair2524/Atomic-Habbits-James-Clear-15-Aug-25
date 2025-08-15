// Comprehensive habits data based on Atomic Habits principles
const habitsData = {
    good: [
        {
            id: 'good_1',
            title: 'Daily Morning Meditation',
            description: 'Start each day with 10 minutes of mindfulness meditation to center your mind, reduce stress, and increase focus. This habit builds mental resilience and emotional awareness, setting a positive tone for your entire day.',
            category: 'Mindfulness',
            icon: 'fas fa-om'
        },
        {
            id: 'good_2',
            title: 'Read 20 Pages Daily',
            description: 'Commit to reading at least 20 pages of personal development, business, or educational content every day. This habit expands knowledge, improves vocabulary, and stimulates cognitive function while building a lifelong learning mindset.',
            category: 'Learning',
            icon: 'fas fa-book'
        },
        {
            id: 'good_3',
            title: 'Exercise for 30 Minutes',
            description: 'Engage in physical activity for at least 30 minutes daily, whether walking, jogging, strength training, or yoga. Regular exercise improves cardiovascular health, boosts mood, increases energy, and enhances overall well-being.',
            category: 'Health',
            icon: 'fas fa-running'
        },
        {
            id: 'good_4',
            title: 'Write in a Gratitude Journal',
            description: 'Record three things you are grateful for each evening. This practice rewires your brain for positivity, increases life satisfaction, improves relationships, and builds resilience during challenging times.',
            category: 'Mindfulness',
            icon: 'fas fa-heart'
        },
        {
            id: 'good_5',
            title: 'Drink 8 Glasses of Water',
            description: 'Maintain proper hydration by drinking at least 8 glasses of water throughout the day. Adequate hydration improves cognitive function, supports metabolism, enhances skin health, and boosts energy levels.',
            category: 'Health',
            icon: 'fas fa-tint'
        },
        // Continue with more good habits...
        {
            id: 'good_6',
            title: 'Plan Tomorrow Tonight',
            description: 'Spend 10 minutes each evening planning the next day\'s priorities and schedule. This habit reduces morning decision fatigue, increases productivity, and ensures you start each day with clear direction and purpose.',
            category: 'Productivity',
            icon: 'fas fa-calendar-check'
        },
        {
            id: 'good_7',
            title: 'Practice Deep Breathing',
            description: 'Perform 5 minutes of deep breathing exercises daily to activate the parasympathetic nervous system. This reduces stress hormones, lowers blood pressure, improves sleep quality, and enhances emotional regulation.',
            category: 'Health',
            icon: 'fas fa-lungs'
        },
        {
            id: 'good_8',
            title: 'Learn a New Skill',
            description: 'Dedicate 20 minutes daily to learning a new skill, language, or hobby. Continuous learning keeps the brain active, builds confidence, opens new opportunities, and maintains cognitive flexibility throughout life.',
            category: 'Learning',
            icon: 'fas fa-graduation-cap'
        },
        {
            id: 'good_9',
            title: 'Call a Friend or Family Member',
            description: 'Make a genuine connection with someone important in your life every few days. Strong relationships are linked to better health outcomes, increased happiness, and provide support during difficult times.',
            category: 'Relationships',
            icon: 'fas fa-phone'
        },
        {
            id: 'good_10',
            title: 'Organize One Area Daily',
            description: 'Spend 10 minutes each day organizing a specific area of your home or workspace. A clutter-free environment reduces stress, increases productivity, and creates a sense of accomplishment and control.',
            category: 'Productivity',
            icon: 'fas fa-broom'
        },
        // Add more habits up to 100...
        {
            id: 'good_11',
            title: 'Practice Mindful Eating',
            description: 'Eat slowly and pay attention to the taste, texture, and smell of your food. Mindful eating improves digestion, helps with weight management, increases satisfaction with meals, and reduces overeating.',
            category: 'Health',
            icon: 'fas fa-utensils'
        },
        {
            id: 'good_12',
            title: 'Take Cold Showers',
            description: 'End your shower with 30 seconds of cold water to boost alertness and mental toughness. Cold exposure increases circulation, strengthens immune system, and builds resilience to stress.',
            category: 'Health',
            icon: 'fas fa-snowflake'
        }
        // ... (continue adding habits to reach 100)
    ],
    bad: [
        {
            id: 'bad_1',
            title: 'Excessive Social Media Scrolling',
            description: 'Mindlessly scrolling through social media for hours, leading to decreased productivity, comparison-based anxiety, disrupted sleep patterns, and reduced real-world social connections. This habit fragments attention and creates dopamine dependency.',
            category: 'Technology',
            icon: 'fas fa-mobile-alt'
        },
        {
            id: 'bad_2',
            title: 'Procrastination on Important Tasks',
            description: 'Delaying crucial responsibilities and deadlines, which increases stress, reduces quality of work, damages professional reputation, and creates a cycle of guilt and anxiety that becomes harder to break over time.',
            category: 'Productivity',
            icon: 'fas fa-clock'
        },
        {
            id: 'bad_3',
            title: 'Emotional Eating',
            description: 'Using food as a coping mechanism for stress, boredom, or negative emotions rather than addressing underlying issues. This creates an unhealthy relationship with food, weight gain, and prevents development of proper emotional regulation skills.',
            category: 'Health',
            icon: 'fas fa-cookie-bite'
        },
        {
            id: 'bad_4',
            title: 'Staying Up Too Late',
            description: 'Consistently going to bed late and sacrificing sleep for entertainment or work. Poor sleep quality affects cognitive function, immune system, emotional stability, and increases risk of chronic diseases and mental health issues.',
            category: 'Health',
            icon: 'fas fa-moon'
        },
        {
            id: 'bad_5',
            title: 'Negative Self-Talk',
            description: 'Engaging in harsh internal criticism and pessimistic thinking patterns. This habit erodes self-confidence, increases anxiety and depression, limits personal growth, and creates a negative feedback loop that affects all life areas.',
            category: 'Mindset',
            icon: 'fas fa-frown'
        },
        {
            id: 'bad_6',
            title: 'Skipping Breakfast',
            description: 'Regularly missing the first meal of the day, which disrupts metabolism, reduces cognitive performance, increases cravings for unhealthy foods, and can lead to overeating later in the day.',
            category: 'Health',
            icon: 'fas fa-ban'
        },
        {
            id: 'bad_7',
            title: 'Gossiping About Others',
            description: 'Engaging in negative conversations about people who aren\'t present. This habit damages relationships, creates toxic social environments, reduces trust, and reflects poorly on your character and integrity.',
            category: 'Relationships',
            icon: 'fas fa-comments'
        },
        {
            id: 'bad_8',
            title: 'Multitasking Constantly',
            description: 'Attempting to do multiple tasks simultaneously, which reduces efficiency, increases errors, causes mental fatigue, and prevents deep focus on any single important task, ultimately decreasing overall productivity.',
            category: 'Productivity',
            icon: 'fas fa-tasks'
        },
        {
            id: 'bad_9',
            title: 'Impulse Shopping',
            description: 'Making unplanned purchases based on emotions or immediate desires rather than actual needs. This habit creates financial stress, clutters living space, and prevents thoughtful spending on truly important items and experiences.',
            category: 'Finance',
            icon: 'fas fa-shopping-cart'
        },
        {
            id: 'bad_10',
            title: 'Avoiding Difficult Conversations',
            description: 'Consistently dodging uncomfortable but necessary discussions with colleagues, friends, or family members. This prevents problem resolution, builds resentment, damages relationships, and allows small issues to become major conflicts.',
            category: 'Relationships',
            icon: 'fas fa-user-slash'
        }
        // Add more bad habits up to 100...
    ]
};

// Generate additional habits to reach 100 each
function generateAdditionalHabits() {
    // Add more good habits
    const additionalGoodHabits = [
        'Daily Stretching Routine', 'Meal Prep Sundays', 'Digital Detox Hour', 'Walking Meetings',
        'Compliment Someone Daily', 'Track Daily Expenses', 'Listen to Podcasts', 'Practice Handwriting',
        'Take Stairs Instead of Elevators', 'Volunteer Weekly', 'Garden Daily', 'Learn New Words',
        'Practice Instrument', 'Do One Act of Kindness', 'Review Daily Goals', 'Declutter 5 Minutes',
        'Practice Photography', 'Write Thank You Notes', 'Learn Cooking Skills', 'Morning Affirmations',
        // ... continue to reach 100
    ];

    // Add more bad habits
    const additionalBadHabits = [
        'Checking Phone First Thing', 'Eating While Distracted', 'Complaining Constantly',
        'Interrupting Others', 'Comparing to Others', 'Overcommitting', 'Neglecting Self-Care',
        'Holding Grudges', 'Making Excuses', 'Perfectionism Paralysis', 'Energy Drink Addiction',
        'Ignoring Physical Pain', 'Toxic Relationship Patterns', 'Chronic Lateness',
        'Hoarding Items', 'Avoiding Exercise', 'Unhealthy Snacking', 'Work-Life Imbalance',
        // ... continue to reach 100
    ];

    // This function can be expanded to generate the full 100 habits each
}

// Export habits data
window.habitsData = habitsData;
// Quiz questions based on Atomic Habits principles
const quizData = {
    good: [
        {
            id: 1,
            question: "According to the first law of habit formation, what should you do to build a good habit?",
            options: [
                "Make it obvious",
                "Make it attractive", 
                "Make it easy",
                "Make it satisfying"
            ],
            correct: 0,
            explanation: "The first law is 'Make it Obvious' - you need to create clear cues and increase awareness of your desired behavior."
        },
        {
            id: 2,
            question: "What is the 2-minute rule in habit formation?",
            options: [
                "Do the habit for exactly 2 minutes",
                "Wait 2 minutes before starting the habit",
                "Scale down your habit to something that takes less than 2 minutes",
                "Take a 2-minute break between habit attempts"
            ],
            correct: 2,
            explanation: "The 2-minute rule means scaling your habit down to something that takes less than 2 minutes, making it easier to start."
        },
        {
            id: 3,
            question: "Which strategy best represents 'Make it Attractive'?",
            options: [
                "Remove all obstacles to performing the habit",
                "Bundle your habit with something you enjoy",
                "Use a habit tracker to monitor progress",
                "Create obvious environmental cues"
            ],
            correct: 1,
            explanation: "Temptation bundling - combining your habit with something enjoyable - is a key strategy for making habits attractive."
        },
        {
            id: 4,
            question: "What is habit stacking?",
            options: [
                "Doing multiple habits at the same time",
                "Pairing a new habit with an existing habit",
                "Building habits on top of each other",
                "Tracking multiple habits together"
            ],
            correct: 1,
            explanation: "Habit stacking involves pairing a new habit with an existing, established habit to create a clear trigger."
        },
        {
            id: 5,
            question: "Why is immediate satisfaction important for habit formation?",
            options: [
                "It makes the habit more obvious",
                "It reduces the friction of starting",
                "We are more likely to repeat immediately rewarding behaviors",
                "It creates better environmental cues"
            ],
            correct: 2,
            explanation: "The brain prioritizes immediate rewards, so making habits immediately satisfying increases repetition likelihood."
        },
        {
            id: 6,
            question: "What role does environment play in habit formation?",
            options: [
                "Environment has minimal impact on behavior",
                "Environment is one of the most powerful factors influencing habits",
                "Environment only matters for bad habits",
                "Environment is less important than willpower"
            ],
            correct: 1,
            explanation: "Research shows environment design is one of the most powerful factors in habit formation success."
        },
        {
            id: 7,
            question: "According to atomic habits, what should you focus on initially?",
            options: [
                "The outcome you want to achieve",
                "The intensity of your efforts",
                "The frequency of showing up",
                "The duration of each session"
            ],
            correct: 2,
            explanation: "Focus on frequency and consistency of showing up rather than the intensity or duration initially."
        },
        {
            id: 8,
            question: "What is the compound effect in habit formation?",
            options: [
                "Habits become more expensive over time",
                "Small improvements compound into remarkable results",
                "Bad habits multiply faster than good habits",
                "Multiple habits must be done together"
            ],
            correct: 1,
            explanation: "Small, consistent improvements compound over time to create significant positive changes."
        },
        {
            id: 9,
            question: "How does identity-based habit formation work?",
            options: [
                "Focus on what you want to achieve",
                "Focus on who you want to become",
                "Focus on avoiding negative outcomes",
                "Focus on external rewards"
            ],
            correct: 1,
            explanation: "Identity-based habits focus on becoming the type of person you want to be, not just achieving outcomes."
        },
        {
            id: 10,
            question: "What is the most effective way to maintain motivation for habits?",
            options: [
                "Rely on willpower and discipline",
                "Create systems and environmental design",
                "Focus on long-term goals",
                "Use punishment for failures"
            ],
            correct: 1,
            explanation: "Systems and environmental design are more reliable than willpower for maintaining consistent habits."
        }
    ],
    bad: [
        {
            id: 1,
            question: "To break a bad habit, what should you do first?",
            options: [
                "Make it invisible",
                "Make it unattractive",
                "Make it difficult", 
                "Make it unsatisfying"
            ],
            correct: 0,
            explanation: "The first step is making it invisible by removing cues and triggers that prompt the unwanted behavior."
        },
        {
            id: 2,
            question: "What does 'Make it Unattractive' mean for breaking bad habits?",
            options: [
                "Hide the habit from others",
                "Focus on the negative consequences and costs",
                "Make the habit harder to perform",
                "Create immediate punishments"
            ],
            correct: 1,
            explanation: "Making bad habits unattractive involves highlighting negative consequences and reframing your perception."
        },
        {
            id: 3,
            question: "How can you make a bad habit difficult?",
            options: [
                "Think about it less often",
                "Add friction and extra steps",
                "Avoid talking about it",
                "Focus on the benefits of quitting"
            ],
            correct: 1,
            explanation: "Adding friction by creating barriers and extra steps makes bad habits less convenient to perform."
        },
        {
            id: 4,
            question: "What is a commitment device?",
            options: [
                "A tool that reminds you of your goals",
                "A contract that locks you into good behavior",
                "A way to track your progress",
                "A method to hide bad habits"
            ],
            correct: 1,
            explanation: "A commitment device is a contract or system that locks you into good behavior with stakes for failure."
        },
        {
            id: 5,
            question: "Why do bad habits provide immediate satisfaction?",
            options: [
                "They are always easier to do",
                "They provide immediate pleasure but delayed pain",
                "They require less thinking",
                "They are more socially acceptable"
            ],
            correct: 1,
            explanation: "Bad habits often provide immediate pleasure while the negative consequences come later."
        },
        {
            id: 6,
            question: "What role does accountability play in breaking bad habits?",
            options: [
                "It makes the habit invisible",
                "It provides immediate negative consequences",
                "It makes the habit more difficult",
                "It reduces environmental triggers"
            ],
            correct: 1,
            explanation: "Accountability creates immediate social or financial consequences when you engage in the bad habit."
        },
        {
            id: 7,
            question: "How should you handle cravings for bad habits?",
            options: [
                "Ignore them completely",
                "Acknowledge them without acting",
                "Distract yourself immediately",
                "Give in occasionally"
            ],
            correct: 1,
            explanation: "Acknowledge cravings without immediately acting on them, allowing them to pass naturally."
        },
        {
            id: 8,
            question: "What is the most effective long-term strategy for breaking bad habits?",
            options: [
                "Using willpower and self-control",
                "Changing your environment and identity",
                "Focusing on the habit itself",
                "Gradual reduction over time"
            ],
            correct: 1,
            explanation: "Changing environment and identity creates lasting change rather than relying on temporary willpower."
        },
        {
            id: 9,
            question: "How can social environment help break bad habits?",
            options: [
                "By providing constant supervision",
                "By surrounding yourself with people who don't engage in the behavior",
                "By creating competitive pressure",
                "By offering financial incentives"
            ],
            correct: 1,
            explanation: "Being around people who don't engage in your bad habit makes the behavior less normal and attractive."
        },
        {
            id: 10,
            question: "What should you replace a bad habit with?",
            options: [
                "Nothing - just eliminate it",
                "A similar but less harmful behavior",
                "A positive behavior that serves the same underlying need",
                "Multiple smaller habits"
            ],
            correct: 2,
            explanation: "Replace bad habits with positive behaviors that fulfill the same underlying need or trigger."
        }
    ]
};

// Export quiz data
window.quizData = quizData;
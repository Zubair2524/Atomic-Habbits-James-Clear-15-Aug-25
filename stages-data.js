// Four stages of habit formation based on Atomic Habits
const stagesData = {
    good: {
        stage1: {
            title: "Make It Obvious",
            icon: "fas fa-eye",
            content: {
                overview: "The first law of behavior change is to make your desired habit obvious. Most of our daily actions are performed automatically, without conscious thought. To build a new habit, you need to bring the behavior into your conscious awareness. This stage focuses on creating clear environmental cues and implementation intentions that will trigger your desired behavior. By making the habit obvious in your environment and routine, you dramatically increase the likelihood of following through.",
                strategies: [
                    "Create a specific implementation intention: 'I will [BEHAVIOR] at [TIME] in [LOCATION]'",
                    "Use habit stacking by pairing your new habit with an existing habit",
                    "Design your environment to make good choices easier and bad choices harder",
                    "Use visual cues like placing items where you'll see them as reminders",
                    "Create a habit tracker to make your progress visible"
                ],
                examples: "If you want to meditate daily, place your meditation cushion in a visible spot in your bedroom. If you want to drink more water, fill a large water bottle each morning and place it on your desk. If you want to read more, put a book on your pillow each morning.",
                scientific_basis: "Research shows that environmental design is one of the most powerful factors in habit formation. Studies indicate that people who modify their environment to support their goals are significantly more likely to maintain new behaviors long-term."
            }
        },
        stage2: {
            title: "Make It Attractive",
            icon: "fas fa-heart",
            content: {
                overview: "The second law focuses on creating a craving for your habit. Our brains are wired to seek rewarding experiences, and we tend to repeat behaviors that are satisfying. By making your habit more attractive, you increase the anticipation and desire to perform it. This involves understanding what motivates you and finding ways to make the habit enjoyable, meaningful, or connected to your identity and values.",
                strategies: [
                    "Bundle your habit with something you enjoy (temptation bundling)",
                    "Join a group or community where your desired behavior is normal",
                    "Focus on the immediate benefits rather than long-term consequences",
                    "Create a ritual that makes the habit feel special or meaningful",
                    "Reframe your mindset from 'have to' to 'get to' do this habit"
                ],
                examples: "If you want to exercise, listen to your favorite podcast only while working out. If you want to eat healthier, join a cooking class or healthy eating community. If you want to save money, visualize the trip you're saving for each time you skip an unnecessary purchase.",
                scientific_basis: "Dopamine research shows that we experience the strongest cravings not when we receive a reward, but when we anticipate it. By creating anticipation and connecting habits to intrinsic motivations, we can hijack this natural reward system."
            }
        },
        stage3: {
            title: "Make It Easy",
            icon: "fas fa-check-circle",
            content: {
                overview: "The third law emphasizes reducing friction and making your habit as easy as possible to perform. Human beings naturally gravitate toward the option that requires the least amount of work. The key is to create an environment and process that makes good habits easier than bad habits. This involves removing obstacles, starting small, and focusing on frequency over intensity in the beginning stages.",
                strategies: [
                    "Start with the 2-minute rule: scale down your habit to something that takes less than 2 minutes",
                    "Prepare your environment in advance to reduce friction",
                    "Use the principle of least action - make good habits require less energy than bad habits",
                    "Create standardized protocols and checklists for complex habits",
                    "Master the art of showing up before worrying about optimizing"
                ],
                examples: "If you want to run every morning, sleep in your workout clothes. If you want to eat healthy meals, prep ingredients on Sundays. If you want to practice guitar, leave it out on a stand rather than in a case. Start with just putting on your running shoes rather than running a mile.",
                scientific_basis: "The law of least effort states that when deciding between similar options, people naturally gravitate toward the option that requires the least amount of work. Studies show that even small amounts of friction can dramatically impact behavior compliance."
            }
        },
        stage4: {
            title: "Make It Satisfying",
            icon: "fas fa-trophy",
            content: {
                overview: "The fourth law focuses on creating immediate satisfaction from your habit. We are more likely to repeat behaviors that are immediately rewarding. Since most good habits have delayed benefits, we need to find ways to make them immediately satisfying. This involves creating feedback loops, celebrating small wins, and using accountability systems that provide instant gratification for positive behaviors.",
                strategies: [
                    "Give yourself an immediate reward after completing your habit",
                    "Use a habit tracker to create visual progress and satisfaction",
                    "Create accountability partnerships or join communities for social reinforcement",
                    "Focus on the process rather than just the outcome",
                    "Celebrate small wins and acknowledge your progress regularly"
                ],
                examples: "After completing a workout, give yourself a relaxing shower and your favorite smoothie. Use a habit tracking app that gives you satisfying checkmarks or streaks. Share your progress with a friend who celebrates your consistency. Create a 'done list' alongside your to-do list to see what you've accomplished.",
                scientific_basis: "The brain prioritizes immediate rewards over delayed benefits. Research in behavioral psychology shows that immediate positive reinforcement significantly increases the likelihood of behavior repetition, even when the reward is small."
            }
        }
    },
    bad: {
        stage1: {
            title: "Make It Invisible",
            icon: "fas fa-eye-slash",
            content: {
                overview: "To break a bad habit, you need to make it invisible by removing the cues that trigger the unwanted behavior. This is the inversion of making good habits obvious. Most bad habits are triggered by environmental cues that we encounter regularly. By identifying and eliminating these triggers, or by changing your environment to avoid them, you can significantly reduce the likelihood of falling into old patterns.",
                strategies: [
                    "Identify the specific environmental cues that trigger your bad habit",
                    "Remove or hide the objects, apps, or items associated with the bad habit",
                    "Change your physical environment to avoid tempting situations",
                    "Use website blockers, app restrictions, or other digital barriers",
                    "Create new routines that avoid your typical trigger situations"
                ],
                examples: "If you want to stop checking social media, remove the apps from your phone's home screen or use app timers. If you want to stop eating junk food, don't keep it in your house. If you want to stop smoking, avoid the locations and situations where you typically smoke. Replace trigger environments with healthier alternatives.",
                scientific_basis: "Environmental psychology research demonstrates that context heavily influences behavior. Studies show that people who successfully break bad habits often do so by changing their environment rather than relying solely on willpower."
            }
        },
        stage2: {
            title: "Make It Unattractive",
            icon: "fas fa-times-circle",
            content: {
                overview: "The second law for breaking bad habits involves reducing their appeal by highlighting their negative consequences and reframing your perception of the behavior. Instead of focusing on what you're giving up, focus on what you're gaining by avoiding the habit. This involves changing your mindset and creating negative associations with the unwanted behavior while emphasizing the benefits of abstaining.",
                strategies: [
                    "Focus on the long-term negative consequences of continuing the habit",
                    "Calculate the financial, health, or relationship costs of your bad habit",
                    "Surround yourself with people who don't engage in the unwanted behavior",
                    "Create a list of reasons why you want to quit and review it regularly",
                    "Reframe the habit in terms of what it prevents you from becoming"
                ],
                examples: "If you want to quit smoking, calculate how much money you spend on cigarettes per year and what else you could buy with that money. If you want to stop procrastinating, visualize the stress and missed opportunities it creates. Join communities of people who have successfully overcome similar habits.",
                scientific_basis: "Cognitive reframing research shows that changing how we think about behaviors can significantly impact our motivation to engage in them. Loss aversion psychology demonstrates that people are more motivated by avoiding losses than gaining benefits."
            }
        },
        stage3: {
            title: "Make It Difficult",
            icon: "fas fa-lock",
            content: {
                overview: "The third law involves increasing friction for bad habits by making them harder to perform. This is the opposite of making good habits easy. By adding steps, creating barriers, or increasing the effort required to engage in the bad habit, you create space for better decision-making. The key is to make bad habits inconvenient enough that you'll think twice before engaging in them.",
                strategies: [
                    "Add extra steps between you and the bad habit",
                    "Use commitment devices that lock you into good behavior",
                    "Remove items or access that enable the bad habit",
                    "Create time delays or cooling-off periods before engaging",
                    "Use technology tools to create barriers and restrictions"
                ],
                examples: "If you want to stop impulse shopping online, remove your saved payment information from websites. If you want to reduce TV watching, unplug the TV after each use and put the remote in another room. If you want to stop eating late at night, brush your teeth right after dinner.",
                scientific_basis: "Behavioral economics research on 'friction' shows that even small increases in effort can dramatically reduce unwanted behaviors. Studies demonstrate that convenience strongly predicts whether we'll engage in a particular behavior."
            }
        },
        stage4: {
            title: "Make It Unsatisfying",
            icon: "fas fa-thumbs-down",
            content: {
                overview: "The fourth law focuses on creating immediate negative consequences for bad habits. Since bad habits often provide immediate pleasure but delayed pain, we need to invert this by creating immediate pain or dissatisfaction when we engage in the unwanted behavior. This involves accountability systems, habit contracts, and other mechanisms that provide instant feedback when you slip up.",
                strategies: [
                    "Create a habit contract with stakes and consequences for failure",
                    "Use accountability partners who will call you out on bad behavior",
                    "Track your bad habits to increase awareness and create negative feedback",
                    "Associate the bad habit with something you dislike or find unpleasant",
                    "Create immediate financial or social consequences for engaging in the habit"
                ],
                examples: "Create a jar where you put $5 every time you engage in your bad habit, then donate that money to a political party you disagree with. Ask a friend to check in on your progress daily and express disappointment if you slip up. Use apps that track your bad habits and share the data with others.",
                scientific_basis: "Operant conditioning research shows that immediate consequences are much more effective than delayed ones in shaping behavior. Social accountability studies demonstrate that public commitments and social pressure significantly increase follow-through rates."
            }
        }
    }
};

// Export stages data
window.stagesData = stagesData;
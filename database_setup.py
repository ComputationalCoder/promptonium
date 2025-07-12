# database_setup.py - Complete database initialization with sample data
# This creates the entire database structure and populates it with realistic sample data!

import sqlite3
import json
import hashlib
from datetime import datetime, timedelta
import random

def hash_password(password: str) -> str:
    """Hash password for secure storage"""
    return hashlib.sha256(password.encode()).hexdigest()

def setup_complete_database():
    """Create and populate the complete database with sample data"""
    print("🗄️ Setting up Prompt Engineering Trainer Database...")
    
    conn = sqlite3.connect("prompt_trainer.db")
    cursor = conn.cursor()
    
    # Drop existing tables for fresh setup
    tables = ["attempts", "achievements", "challenges", "users"]
    for table in tables:
        cursor.execute(f"DROP TABLE IF EXISTS {table}")
    
    print("✅ Cleaned existing database")
    
    # 👥 Create Users table
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            total_score REAL DEFAULT 0,
            challenges_completed INTEGER DEFAULT 0
        )
    ''')
    
    # 🎯 Create Challenges table
    cursor.execute('''
        CREATE TABLE challenges (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            target_response TEXT NOT NULL,
            constraints TEXT NOT NULL,
            time_limit INTEGER DEFAULT 300,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 📝 Create Attempts table (stores all user submissions)
    cursor.execute('''
        CREATE TABLE attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            challenge_id TEXT NOT NULL,
            prompt TEXT NOT NULL,
            model_name TEXT NOT NULL,
            ai_response TEXT NOT NULL,
            semantic_accuracy REAL NOT NULL,
            task_compliance REAL NOT NULL,
            style_match REAL NOT NULL,
            efficiency_score REAL NOT NULL,
            total_score REAL NOT NULL,
            time_taken INTEGER NOT NULL,
            feedback TEXT NOT NULL,
            detailed_metrics TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (challenge_id) REFERENCES challenges (id)
        )
    ''')
    
    # 🏆 Create Achievements table
    cursor.execute('''
        CREATE TABLE achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            achievement_type TEXT NOT NULL,
            achievement_name TEXT NOT NULL,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    print("✅ Database tables created")
    
    # 🧑‍💻 Insert sample users
    sample_users = [
        ("demo_user", "demo@prompttrainer.com", "password123"),
        ("alice_ai", "alice@example.com", "password123"),
        ("bob_prompter", "bob@example.com", "password123"),
        ("carol_creative", "carol@example.com", "password123"),
        ("david_dev", "david@example.com", "password123"),
        ("emma_expert", "emma@example.com", "password123"),
        ("frank_beginner", "frank@example.com", "password123"),
        ("grace_guru", "grace@example.com", "password123")
    ]
    
    for username, email, password in sample_users:
        cursor.execute(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            (username, email, hash_password(password))
        )
    
    print(f"✅ Added {len(sample_users)} sample users")
    
    # 🎯 Insert comprehensive challenge library
    challenges = [
        {
            "id": "professional_email",
            "title": "Professional Follow-up Email",
            "description": "Create a prompt that generates a professional follow-up email after a business meeting. The email should be courteous, specific, and action-oriented.",
            "difficulty": "beginner",
            "target_response": "Thank you for taking the time to meet with me yesterday to discuss the marketing campaign proposal. I wanted to follow up on the key action items we identified: 1) Finalizing the budget allocation by Friday, 2) Scheduling the creative review session for next week, and 3) Confirming the launch timeline for Q2. I've attached the revised proposal document with the changes we discussed. Please let me know if you need any additional information or clarification on any of these points. I look forward to moving forward with this exciting project.",
            "constraints": {
                "max_words": 120,
                "required_keywords": ["follow-up", "action items", "meeting"],
                "target_style": {"formality": "formal", "tone": "professional"},
                "format": "email"
            },
            "time_limit": 300
        },
        {
            "id": "creative_story",
            "title": "Mystery Story Opening",
            "description": "Write a prompt for creating a compelling 150-word mystery story opening that hooks the reader and establishes intrigue.",
            "difficulty": "intermediate",
            "target_response": "The lighthouse keeper hadn't been seen for three days. Detective Sarah Martinez pulled her coat tighter as she approached the weathered door, the beam above cutting through the morning fog in mechanical sweeps. The townspeople whispered about strange lights and voices from the tower at night, but whispers were all they offered. As she knocked, the sound echoed hollow and wrong. No answer. The door creaked open at her touch, revealing a staircase that spiraled into darkness. On the first step lay a compass, its needle spinning wildly, pointing everywhere and nowhere at once. Sarah picked it up, noting the fresh scratches on its brass surface. Above, something metallic scraped against stone. She drew her flashlight and began to climb, each step creaking a warning she chose to ignore.",
            "constraints": {
                "max_words": 150,
                "required_keywords": ["mystery", "opening", "detective"],
                "target_style": {"tone": "suspenseful", "pacing": "engaging"},
                "format": "narrative"
            },
            "time_limit": 600
        },
        {
            "id": "technical_explanation",
            "title": "Explain Blockchain Simply",
            "description": "Create a prompt that explains blockchain technology to a 10-year-old using simple language and relatable analogies.",
            "difficulty": "intermediate",
            "target_response": "Imagine you and your friends have a special notebook that everyone shares to keep track of trading cards. Whenever someone gives someone else a card, you write it down in the notebook. But here's the cool part - everyone has their own copy of the same notebook, and they all have to match perfectly! If someone tries to cheat and change their notebook to say they have more cards, everyone else will notice because their notebooks are different. That's like blockchain - it's a way to keep track of things (like digital money) that's really hard to cheat on because lots of computers all have the same information. It's like having thousands of friends all watching to make sure nobody cheats with the notebook!",
            "constraints": {
                "max_words": 120,
                "target_style": {"formality": "informal", "tone": "friendly", "reading_level": 5},
                "required_keywords": ["simple", "easy", "notebook"],
                "format": "explanation"
            },
            "time_limit": 450
        },
        {
            "id": "business_proposal",
            "title": "Investment Proposal Pitch",
            "description": "Craft a prompt for a persuasive business proposal presentation that includes key metrics and compelling arguments for investment.",
            "difficulty": "advanced",
            "target_response": "Our innovative EcoPackaging solution addresses the critical $12B market gap in sustainable packaging, offering 40% cost reduction while achieving complete carbon neutrality by 2026. With strategic $2M Series A investment, we project $15M revenue by year three, capturing 5% market share in the rapidly growing $50B sustainable packaging industry. Our proprietary bio-degradable material technology, protected by three pending patents, provides significant competitive advantages over traditional plastic alternatives. The experienced founding team combines 50+ years industry expertise across packaging, sustainability, and supply chain management. Major retailers including Target and Whole Foods have expressed preliminary interest pending pilot program results. We seek strategic partnership to accelerate market penetration, scale manufacturing operations globally, and establish dominant position before larger competitors enter this emerging market segment.",
            "constraints": {
                "max_words": 200,
                "required_keywords": ["investment", "revenue", "market share", "technology"],
                "target_style": {"formality": "formal", "tone": "confident"},
                "format": "business_proposal"
            },
            "time_limit": 900
        },
        {
            "id": "social_media_post",
            "title": "Engaging Social Media Content",
            "description": "Create a prompt for an engaging social media post that promotes environmental awareness with a clear call to action.",
            "difficulty": "beginner",
            "target_response": "🌍 Small changes, BIG impact! Did you know that switching to a reusable water bottle can save 1,460 plastic bottles per year? That's just ONE simple swap! ♻️ This Earth Day, let's challenge ourselves to make sustainable choices that matter. Here are 3 easy ways to start: 1️⃣ Use reusable bags when shopping 2️⃣ Choose digital receipts over paper 3️⃣ Walk or bike for short trips What's YOUR sustainable swap this week? Share in the comments and tag a friend to join the movement! 🌱 Together, we can create a cleaner, greener future for generations to come. #EarthDay #Sustainability #EcoFriendly #ClimateAction #GoGreen",
            "constraints": {
                "max_words": 100,
                "required_keywords": ["Earth Day", "sustainable", "environment"],
                "target_style": {"tone": "enthusiastic", "formality": "casual"},
                "format": "social_media"
            },
            "time_limit": 240
        },
        {
            "id": "customer_service",
            "title": "Customer Service Response",
            "description": "Create a helpful and empathetic customer service response to resolve a billing dispute while maintaining a positive relationship.",
            "difficulty": "beginner",
            "target_response": "Dear valued customer, Thank you for contacting us regarding the billing concern on your account. I sincerely apologize for any confusion this may have caused. I've thoroughly reviewed your account and can see that there was indeed an error in our billing system that resulted in the duplicate charge you mentioned. I've immediately processed a full refund of $49.99, which should appear in your account within 2-3 business days. To prevent this from happening again, I've also added a note to your account and updated our billing system. As a gesture of goodwill for this inconvenience, I've applied a 10% discount to your next billing cycle. If you have any other questions or concerns, please don't hesitate to reach out. We truly value your business and appreciate your patience.",
            "constraints": {
                "max_words": 140,
                "required_keywords": ["apologize", "refund", "account"],
                "target_style": {"formality": "polite", "tone": "helpful"},
                "format": "customer_service"
            },
            "time_limit": 360
        },
        {
            "id": "recipe_instructions",
            "title": "Clear Recipe Instructions",
            "description": "Write clear, easy-to-follow instructions for making chocolate chip cookies that a beginner cook could successfully use.",
            "difficulty": "beginner",
            "target_response": "Perfect Chocolate Chip Cookies - Easy Recipe for Beginners\n\nIngredients: 1 cup butter (softened), 3/4 cup brown sugar, 1/2 cup white sugar, 2 eggs, 2 cups flour, 1 tsp vanilla, 1/2 tsp salt, 1 tsp baking soda, 1 1/2 cups chocolate chips.\n\nInstructions:\n1. Preheat oven to 350°F (175°C)\n2. Mix softened butter with both sugars until creamy (about 2 minutes)\n3. Add eggs one at a time, then vanilla\n4. In separate bowl, combine flour, salt, and baking soda\n5. Gradually mix dry ingredients into wet ingredients\n6. Stir in chocolate chips\n7. Drop rounded tablespoons of dough onto ungreased baking sheet, 2 inches apart\n8. Bake 9-11 minutes until edges are golden brown\n9. Cool on baking sheet for 5 minutes before transferring\n\nMakes about 36 cookies. Enjoy!",
            "constraints": {
                "max_words": 150,
                "required_keywords": ["ingredients", "instructions", "bake"],
                "target_style": {"tone": "clear", "formality": "instructional"},
                "format": "recipe"
            },
            "time_limit": 420
        },
        {
            "id": "code_documentation",
            "title": "API Documentation",
            "description": "Write clear, comprehensive documentation for a REST API endpoint that developers will use to integrate with your service.",
            "difficulty": "advanced",
            "target_response": "## POST /api/users\n\nCreates a new user account in the system.\n\n### Request Parameters\n\n**Body** (application/json):\n- `username` (string, required): Unique username, 3-50 characters, alphanumeric only\n- `email` (string, required): Valid email address\n- `password` (string, required): Minimum 8 characters with at least one number\n- `profile` (object, optional): Additional user information\n\n### Response\n\n**Success (201 Created):**\n```json\n{\n  \"id\": 12345,\n  \"username\": \"johndoe\",\n  \"email\": \"john@example.com\",\n  \"created_at\": \"2024-01-15T10:30:00Z\"\n}\n```\n\n**Error (400 Bad Request):**\n```json\n{\n  \"error\": \"validation_failed\",\n  \"message\": \"Username already exists\"\n}\n```\n\n### Example Request\n```bash\ncurl -X POST https://api.example.com/users \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"username\":\"johndoe\",\"email\":\"john@example.com\",\"password\":\"securepass123\"}'\n```",
            "constraints": {
                "max_words": 200,
                "required_keywords": ["API", "endpoint", "parameters", "response"],
                "target_style": {"formality": "technical", "tone": "clear"},
                "format": "documentation"
            },
            "time_limit": 720
        }
    ]
    
    for challenge in challenges:
        cursor.execute('''
            INSERT INTO challenges (id, title, description, difficulty, target_response, constraints, time_limit)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            challenge["id"], 
            challenge["title"], 
            challenge["description"], 
            challenge["difficulty"], 
            challenge["target_response"], 
            json.dumps(challenge["constraints"]), 
            challenge["time_limit"]
        ))
    
    print(f"✅ Added {len(challenges)} comprehensive challenges")
    
    # 📝 Generate realistic sample attempts
    print("🎲 Generating sample user attempts...")
    
    # Get user and challenge IDs
    cursor.execute("SELECT id FROM users")
    user_ids = [row[0] for row in cursor.fetchall()]
    
    cursor.execute("SELECT id FROM challenges")
    challenge_ids = [row[0] for row in cursor.fetchall()]
    
    models = ["openai", "claude", "gemini"]
    
    # Sample prompts for different challenges
    sample_prompts = {
        "professional_email": [
            "Write a professional follow-up email after yesterday's meeting about the marketing campaign, including action items and next steps.",
            "Create a formal business email following up on our discussion about the project timeline and deliverables.",
            "Compose a professional follow-up message mentioning the action items we discussed in our meeting."
        ],
        "creative_story": [
            "Write a compelling mystery story opening with a detective investigating something suspicious at a lighthouse.",
            "Create a suspenseful mystery opening featuring a detective and an abandoned location with mysterious circumstances.",
            "Generate a gripping mystery story beginning with a detective discovering something strange and unexplained."
        ],
        "technical_explanation": [
            "Explain blockchain technology to a 10-year-old using simple words and easy-to-understand analogies like notebooks or trading cards.",
            "Create a simple explanation of blockchain for children using everyday examples they can relate to.",
            "Write an easy explanation of blockchain technology using simple language and familiar comparisons."
        ]
    }
    
    sample_feedback = [
        "Great semantic accuracy! Your prompt was very clear and specific.",
        "Good task compliance - you included the required keywords effectively.",
        "Excellent style matching! The tone was perfect for the target audience.",
        "Consider being more specific about the desired format and structure.",
        "Try to be more concise while maintaining all the necessary details.",
        "Perfect efficiency! You achieved great results with a well-crafted prompt.",
        "The AI response closely matched the target style and content.",
        "Good use of examples and context to guide the AI's response."
    ]
    
    # Generate 75 realistic attempts
    attempts_generated = 0
    for _ in range(75):
        user_id = random.choice(user_ids)
        challenge_id = random.choice(challenge_ids)
        model_name = random.choice(models)
        
        # Get a relevant sample prompt or generate one
        if challenge_id in sample_prompts:
            prompt = random.choice(sample_prompts[challenge_id])
        else:
            prompt = f"Create a response for the {challenge_id} challenge following all the specified requirements and constraints."
        
        # Generate realistic scores with some variation
        base_score = random.uniform(65, 95)
        semantic_accuracy = max(0, min(100, base_score + random.uniform(-10, 10)))
        task_compliance = max(0, min(100, base_score + random.uniform(-15, 15)))
        style_match = max(0, min(100, base_score + random.uniform(-10, 10)))
        efficiency_score = max(0, min(100, base_score + random.uniform(-20, 20)))
        
        total_score = (
            semantic_accuracy * 0.4 + 
            task_compliance * 0.3 + 
            style_match * 0.2 + 
            efficiency_score * 0.1
        )
        
        ai_response = f"This is a sample AI response generated for the {challenge_id} challenge using {model_name}. The response follows the prompt instructions and meets the specified requirements for style, tone, and content structure."
        
        # Random time taken based on challenge difficulty
        time_taken = random.randint(60, 400)
        
        # Random feedback selection
        feedback_items = random.sample(sample_feedback, random.randint(2, 4))
        
        # Create timestamp within last 30 days
        days_ago = random.randint(0, 30)
        created_at = datetime.now() - timedelta(days=days_ago, hours=random.randint(0, 23))
        
        cursor.execute('''
            INSERT INTO attempts (
                user_id, challenge_id, prompt, model_name, ai_response,
                semantic_accuracy, task_compliance, style_match, efficiency_score, total_score,
                time_taken, feedback, detailed_metrics, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            user_id, challenge_id, prompt, model_name, ai_response,
            semantic_accuracy, task_compliance, style_match, efficiency_score, total_score,
            time_taken, json.dumps(feedback_items),
            json.dumps({
                "response_length": random.randint(50, 200), 
                "prompt_length": len(prompt.split()),
                "readability_grade": random.uniform(6.0, 12.0)
            }),
            created_at
        ))
        
        attempts_generated += 1
    
    print(f"✅ Generated {attempts_generated} realistic sample attempts")
    
    # 🏆 Add sample achievements
    achievements = [
        ("first_attempt", "First Steps"),
        ("perfect_score", "Perfectionist"),
        ("speed_demon", "Speed Demon"),
        ("consistency", "Consistency Master"),
        ("multi_model", "Model Explorer")
    ]
    
    # Award achievements to some users
    for user_id in user_ids[:4]:  # First 4 users get achievements
        for achievement_type, achievement_name in random.sample(achievements, random.randint(1, 3)):
            days_ago = random.randint(1, 20)
            earned_at = datetime.now() - timedelta(days=days_ago)
            
            cursor.execute('''
                INSERT INTO achievements (user_id, achievement_type, achievement_name, earned_at)
                VALUES (?, ?, ?, ?)
            ''', (user_id, achievement_type, achievement_name, earned_at))
    
    print("✅ Added sample achievements")
    
    # 📊 Update user statistics
    cursor.execute('''
        UPDATE users SET 
            challenges_completed = (
                SELECT COUNT(DISTINCT challenge_id) 
                FROM attempts 
                WHERE attempts.user_id = users.id
            ),
            total_score = (
                SELECT COALESCE(SUM(total_score), 0) 
                FROM attempts 
                WHERE attempts.user_id = users.id
            )
    ''')
    
    print("✅ Updated user statistics")
    
    conn.commit()
    conn.close()
    
    # 📊 Display summary
    conn = sqlite3.connect("prompt_trainer.db")
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM users")
    user_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM challenges")
    challenge_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM attempts")
    attempt_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM achievements")
    achievement_count = cursor.fetchone()[0]
    
    conn.close()
    
    print("\n" + "="*60)
    print("🎉 DATABASE SETUP COMPLETE!")
    print("="*60)
    print(f"👥 Users created: {user_count}")
    print(f"🎯 Challenges available: {challenge_count}")
    print(f"📝 Sample attempts: {attempt_count}")
    print(f"🏆 Achievements: {achievement_count}")
    print("\n🔑 Demo Login Credentials:")
    print("Username: demo_user")
    print("Password: password123")
    print("\n🌟 Other test users: alice_ai, bob_prompter, carol_creative")
    print("Password for all: password123")
    print("\n🚀 Ready to start the application!")
    print("Run: uvicorn main:app --reload")

if __name__ == "__main__":
    setup_complete_database()

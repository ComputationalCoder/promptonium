import React, { useState, useEffect, useContext, createContext } from 'https://esm.sh/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, ResponsiveContainer } from 'https://esm.sh/recharts';
import { Trophy, Clock, Target, Brain, User, Settings, BookOpen, Play, CheckCircle, AlertCircle, Star, Award, TrendingUp, Users, Zap } from 'https://esm.sh/lucide-react';
// Mock data for demonstration
const mockUser = {
  username: "demo_user",
  user_id: 1,
  total_score: 2450,
  challenges_completed: 12,
  recent_attempts: [
    { challenge_title: "Professional Email", score: 94, timestamp: "2024-01-15" },
    { challenge_title: "Creative Story", score: 87, timestamp: "2024-01-14" },
    { challenge_title: "Technical Explanation", score: 91, timestamp: "2024-01-13" }
  ],
  achievements: [
    { name: "First Perfect Score", earned_at: "2024-01-10" },
    { name: "Speed Demon", earned_at: "2024-01-12" },
    { name: "Consistency Master", earned_at: "2024-01-14" }
  ]
};

const mockChallenges = [
  {
    id: "professional_email",
    title: "Professional Follow-up Email",
    description: "Create a prompt that generates a professional follow-up email after a business meeting. The email should be courteous, specific, and action-oriented.",
    difficulty: "beginner",
    time_limit: 300,
    constraints: {
      max_words: 120,
      required_keywords: ["follow-up", "action items"],
      target_style: { formality: "formal", tone: "professional" }
    }
  },
  {
    id: "creative_story",
    title: "Mystery Story Opening",
    description: "Write a prompt for creating a compelling 150-word mystery story opening that hooks the reader and establishes intrigue.",
    difficulty: "intermediate",
    time_limit: 600,
    constraints: {
      max_words: 150,
      required_keywords: ["mystery", "detective"],
      target_style: { tone: "suspenseful" }
    }
  },
  {
    id: "technical_explanation",
    title: "Explain Blockchain Simply",
    description: "Create a prompt that explains blockchain technology to a 10-year-old using simple language and relatable analogies.",
    difficulty: "intermediate",
    time_limit: 450,
    constraints: {
      max_words: 120,
      required_keywords: ["simple", "easy"],
      target_style: { formality: "informal", tone: "friendly" }
    }
  },
  {
    id: "business_proposal",
    title: "Investment Proposal",
    description: "Craft a prompt for a persuasive business proposal presentation that includes key metrics and compelling arguments.",
    difficulty: "advanced",
    time_limit: 900,
    constraints: {
      max_words: 200,
      required_keywords: ["investment", "revenue", "market share"],
      target_style: { formality: "formal", tone: "confident" }
    }
  }
];

const mockLeaderboard = [
  { rank: 1, username: "PromptMaster", score: 98, time_taken: 145 },
  { rank: 2, username: "AIWhisperer", score: 96, time_taken: 210 },
  { rank: 3, username: "demo_user", score: 94, time_taken: 180 },
  { rank: 4, username: "TechWriter", score: 92, time_taken: 165 },
  { rank: 5, username: "CreativeAI", score: 90, time_taken: 220 }
];

// Context for authentication (mock implementation)
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);
  const [token, setToken] = useState("demo_token");

  const login = async (username, password) => {
    // Mock login - always succeeds for demo
    setUser(mockUser);
    setToken("demo_token");
    return true;
  };

  const register = async (username, email, password) => {
    // Mock registration - always succeeds for demo
    setUser({...mockUser, username});
    setToken("demo_token");
    return true;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login/Register Component
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: 'demo_user', email: '', password: 'password123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    const success = isLogin 
      ? await login(formData.username, formData.password)
      : await register(formData.username, formData.email, formData.password);

    if (!success) {
      setError(isLogin ? 'Invalid credentials' : 'Registration failed');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-sm bg-opacity-95">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Promptonium
          </h1>
          <p className="text-gray-600 mt-2">Master the art of AI prompting</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your username"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 font-medium"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 text-center">
            <strong>Demo:</strong> Use username "demo_user" and password "password123" to try the app
          </p>
        </div>
      </div>
    </div>
  );
};

// Challenge Card Component
const ChallengeCard = ({ challenge, onStart }) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200'
  };

  const difficultyIcons = {
    beginner: <Target className="h-4 w-4" />,
    intermediate: <TrendingUp className="h-4 w-4" />,
    advanced: <Zap className="h-4 w-4" />
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all hover:border-blue-300 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {challenge.title}
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${difficultyColors[challenge.difficulty]}`}>
          {difficultyIcons[challenge.difficulty]}
          {challenge.difficulty}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 leading-relaxed">{challenge.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-500 gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{Math.floor(challenge.time_limit / 60)} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span className="text-sm">{challenge.constraints.max_words} words</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Required keywords:</div>
        <div className="flex flex-wrap gap-1">
          {challenge.constraints.required_keywords.map((keyword, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
              {keyword}
            </span>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => onStart(challenge)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Play className="h-4 w-4" />
        Start Challenge
      </button>
    </div>
  );
};

// Challenge Page Component
const ChallengePage = ({ challenge, onBack, onComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('openai');
  const [timeLeft, setTimeLeft] = useState(challenge.time_limit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    if (isSubmitting || !prompt.trim()) return;

    setIsSubmitting(true);
    
    // Mock evaluation with realistic scores
    const mockResult = {
      semantic_accuracy: 85 + Math.random() * 10,
      task_compliance: 88 + Math.random() * 8,
      style_match: 82 + Math.random() * 12,
      efficiency_score: 75 + Math.random() * 15,
      ai_response: `This is a sample AI response generated for the prompt: "${prompt.substring(0, 50)}...". The AI has followed your instructions and created content that matches the requirements specified in the challenge.`,
      feedback: [
        "Great semantic accuracy! Your prompt was very clear and specific.",
        "Good task compliance - you included the required keywords.",
        "Consider being more specific about the desired tone and style.",
        "Try to be more concise while maintaining clarity."
      ],
      detailed_metrics: {
        response_length: 150,
        prompt_length: prompt.split(' ').length,
        readability_grade: 8.5
      }
    };

    mockResult.total_score = (
      mockResult.semantic_accuracy * 0.4 + 
      mockResult.task_compliance * 0.3 + 
      mockResult.style_match * 0.2 + 
      mockResult.efficiency_score * 0.1
    );

    // Simulate API delay
    setTimeout(() => {
      setResult(mockResult);
      setIsSubmitting(false);
      onComplete(mockResult);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (result) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {Math.round(result.total_score)}%
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Challenge Complete!</h2>
            <div className="flex justify-center gap-2 mt-4">
              {result.total_score >= 90 && <Star className="h-6 w-6 text-yellow-500" />}
              {result.total_score >= 80 && <Award className="h-6 w-6 text-blue-500" />}
              {result.total_score >= 70 && <CheckCircle className="h-6 w-6 text-green-500" />}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={[
                  { metric: 'Semantic', score: result.semantic_accuracy },
                  { metric: 'Compliance', score: result.task_compliance },
                  { metric: 'Style', score: result.style_match },
                  { metric: 'Efficiency', score: result.efficiency_score }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">AI Response</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 max-h-64 overflow-y-auto border">
                {result.ai_response}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-medium text-blue-900">Response Length</div>
                  <div className="text-blue-700">{result.detailed_metrics.response_length} words</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-medium text-green-900">Prompt Length</div>
                  <div className="text-green-700">{result.detailed_metrics.prompt_length} words</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Feedback & Recommendations</h3>
            <div className="space-y-3">
              {result.feedback.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Challenges
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Try Another Challenge
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
            <p className="text-gray-600 mt-2">{challenge.description}</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500">Time Remaining</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write your prompt here... Be specific about what you want the AI to do, include any constraints, and specify the desired style or tone."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="mt-2 text-sm text-gray-500">
                Words: {prompt.split(' ').filter(word => word.length > 0).length} / {challenge.constraints.max_words}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="openai">OpenAI GPT</option>
                <option value="claude">Anthropic Claude</option>
                <option value="gemini">Google Gemini</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !prompt.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Evaluating...
                </div>
              ) : (
                'Submit Prompt'
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Requirements
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Max words:</span>
                  <span className="font-medium">{challenge.constraints.max_words}</span>
                </div>
                <div>
                  <span>Required keywords:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {challenge.constraints.required_keywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="font-medium">{challenge.constraints.target_style.formality || 'neutral'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tone:</span>
                  <span className="font-medium">{challenge.constraints.target_style.tone || 'neutral'}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Pro Tips
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Be specific and clear about what you want</li>
                <li>• Include examples if they help clarify</li>
                <li>• Specify the desired format and structure</li>
                <li>• Consider your target audience</li>
                <li>• Use the required keywords naturally</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Scoring
              </h3>
              <div className="space-y-1 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>Semantic Accuracy:</span>
                  <span className="font-medium">40%</span>
                </div>
                <div className="flex justify-between">
                  <span>Task Compliance:</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>Style Match:</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span className="font-medium">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Leaderboard Component
const Leaderboard = () => {
  const [selectedChallenge, setSelectedChallenge] = useState('professional_email');
  const [timeframe, setTimeframe] = useState('all_time');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={selectedChallenge}
            onChange={(e) => setSelectedChallenge(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {mockChallenges.map(challenge => (
              <option key={challenge.id} value={challenge.id}>
                {challenge.title}
              </option>
            ))}
          </select>
          
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all_time">All Time</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
        </div>

        <div className="space-y-3">
          {mockLeaderboard.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' :
                index === 1 ? 'bg-gray-50 border-gray-200' :
                index === 2 ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' :
                'bg-white border-gray-200 hover:bg-gray-50'
              } transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-orange-500 text-white' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {entry.rank}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{entry.username}</span>
                  {entry.username === mockUser.username && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">You</span>
                  )}
                  {index < 3 && (
                    <div className="flex items-center">
                      {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                      {index === 1 && <Award className="h-4 w-4 text-gray-500" />}
                      {index === 2 && <Star className="h-4 w-4 text-orange-500" />}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="font-bold text-blue-600 text-lg">{entry.score}%</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-700">{entry.time_taken}s</div>
                  <div className="text-xs text-gray-500">Time</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

// Progress Dashboard Component
const ProgressDashboard = () => {
  const progressData = [
    { date: '2024-01-10', score: 75 },
    { date: '2024-01-11', score: 82 },
    { date: '2024-01-12', score: 78 },
    { date: '2024-01-13', score: 91 },
    { date: '2024-01-14', score: 87 },
    { date: '2024-01-15', score: 94 }
  ];

  const skillData = [
    { skill: 'Beginner', score: 92, attempts: 8 },
    { skill: 'Intermediate', score: 85, attempts: 4 },
    { skill: 'Advanced', score: 0, attempts: 0 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{mockUser.challenges_completed}</div>
              <div className="text-sm text-gray-600">Challenges Completed</div>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{Math.round(mockUser.total_score / mockUser.challenges_completed)}</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{mockUser.achievements.length}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <Zap className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Progress Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Performance by Difficulty
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={skillData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Recent Attempts
          </h3>
          <div className="space-y-3">
            {mockUser.recent_attempts.map((attempt, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{attempt.challenge_title}</div>
                  <div className="text-sm text-gray-500">{attempt.timestamp}</div>
                </div>
                <div className="font-bold text-blue-600">{attempt.score}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {mockUser.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">{achievement.name}</div>
                  <div className="text-sm text-gray-500">{achievement.earned_at}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('challenges');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [challenges] = useState(mockChallenges);
  const { user, logout } = useContext(AuthContext);

  const handleStartChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setCurrentView('challenge');
  };

  const handleChallengeComplete = (result) => {
    // Challenge completion logic would go here
    console.log('Challenge completed with result:', result);
  };

  const handleBackToChallenges = () => {
    setSelectedChallenge(null);
    setCurrentView('challenges');
  };

  if (!user) {
    return <AuthForm />;
  }

  if (selectedChallenge && currentView === 'challenge') {
    return (
      <ChallengePage
        challenge={selectedChallenge}
        onBack={handleBackToChallenges}
        onComplete={handleChallengeComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Promptonium
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('challenges')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'challenges' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Target className="h-4 w-4 inline mr-1" />
                Challenges
              </button>
              <button
                onClick={() => setCurrentView('leaderboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'leaderboard' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Trophy className="h-4 w-4 inline mr-1" />
                Leaderboard
              </button>
              <button
                onClick={() => setCurrentView('progress')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'progress' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-4 w-4 inline mr-1" />
                Progress
              </button>
              
              <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'challenges' && (
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Challenge</h2>
              <p className="text-gray-600">Practice prompt engineering with real-world scenarios and get instant feedback</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {challenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onStart={handleStartChallenge}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'leaderboard' && <Leaderboard />}
        {currentView === 'progress' && <ProgressDashboard />}
      </main>
    </div>
  );
};

// Main wrapper with AuthProvider
export default function PromptTrainerApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

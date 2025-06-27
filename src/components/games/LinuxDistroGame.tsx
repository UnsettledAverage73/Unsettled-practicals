
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Distribution {
  name: string;
  description: string;
  features: string[];
  logo: string;
  useCase: string;
}

const LinuxDistroGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const distributions: Distribution[] = [
    {
      name: 'Ubuntu',
      description: 'User-friendly Debian-based distribution',
      features: ['Unity/GNOME Desktop', 'APT Package Manager', 'Long-term Support'],
      logo: '🟠',
      useCase: 'Desktop users and beginners'
    },
    {
      name: 'CentOS',
      description: 'Enterprise-class operating system',
      features: ['RPM Package Manager', 'Red Hat compatible', 'Server-focused'],
      logo: '🔴',
      useCase: 'Enterprise servers'
    },
    {
      name: 'Arch Linux',
      description: 'Rolling-release distribution',
      features: ['Pacman Package Manager', 'Minimal base system', 'DIY approach'],
      logo: '🔵',
      useCase: 'Advanced users'
    },
    {
      name: 'Fedora',
      description: 'Cutting-edge features and technologies',
      features: ['DNF Package Manager', 'Latest software', 'Red Hat sponsored'],
      logo: '🟡',
      useCase: 'Developers and enthusiasts'
    }
  ];

  const questions = [
    {
      question: "Which distribution is known for being user-friendly and great for beginners?",
      options: ['Ubuntu', 'Arch Linux', 'CentOS', 'Gentoo'],
      correct: 'Ubuntu'
    },
    {
      question: "Which package manager is used by Ubuntu?",
      options: ['YUM', 'APT', 'Pacman', 'DNF'],
      correct: 'APT'
    },
    {
      question: "Which distribution follows a rolling-release model?",
      options: ['Ubuntu', 'CentOS', 'Arch Linux', 'Debian'],
      correct: 'Arch Linux'
    },
    {
      question: "Which distribution is primarily used for enterprise servers?",
      options: ['Ubuntu', 'CentOS', 'Mint', 'Elementary'],
      correct: 'CentOS'
    }
  ];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 25);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowResult(false);
      } else {
        setGameComplete(true);
        onComplete(score + (answer === questions[currentQuestion].correct ? 25 : 0));
      }
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResult(false);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Monitor className="text-blue-500" />
            Linux Distributions - Game Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold text-green-600">{score}/100</div>
          <p className="text-lg">
            {score >= 75 ? "Excellent! You know your Linux distributions!" :
             score >= 50 ? "Good job! Keep learning about Linux." :
             "Keep studying Linux distributions to improve!"}
          </p>
          <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="mr-2 h-4 w-4" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Distribution Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="text-blue-500" />
            Linux Distributions Study
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {distributions.map((distro, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{distro.logo}</span>
                  <h3 className="font-bold">{distro.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{distro.description}</p>
                <div className="space-y-1">
                  {distro.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" className="text-xs mr-1">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-blue-600 mt-2">Use Case: {distro.useCase}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                variant={
                  showResult && option === questions[currentQuestion].correct
                    ? "default"
                    : showResult && option === selectedAnswer && option !== questions[currentQuestion].correct
                    ? "destructive"
                    : "outline"
                }
                className={`p-4 h-auto text-left justify-start ${
                  showResult && option === questions[currentQuestion].correct
                    ? "bg-green-600 hover:bg-green-700"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {showResult && option === questions[currentQuestion].correct && (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  {showResult && option === selectedAnswer && option !== questions[currentQuestion].correct && (
                    <XCircle className="h-4 w-4" />
                  )}
                  {option}
                </div>
              </Button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-gray-600">Score: {score}/100</div>
            {showResult && (
              <div className={`text-sm font-semibold ${
                selectedAnswer === questions[currentQuestion].correct ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedAnswer === questions[currentQuestion].correct ? 'Correct! +25 points' : 'Incorrect! Try studying more.'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinuxDistroGame;

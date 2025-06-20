import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Star, BookOpen, ChevronLeft } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import Footer from '../components/layout/Footer';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
}

interface QuizContextType {
  currentQuestion: number;
  score: number;
  answers: number[];
  quiz: Quiz | null;
  nextQuestion: () => void;
  selectAnswer: (answerIndex: number) => void;
  resetQuiz: () => void;
  startQuiz: (quiz: Quiz) => void;
  isComplete: boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const generateQuizzes = (): Quiz[] => {
  // Create a pool of unique questions
  const allQuestions: Question[] = [
    // Glacier questions
    {
      id: 1,
      question: "What percentage of the Earth's freshwater is stored in glaciers?",
      options: ["10%", "30%", "50%", "70%"],
      correctAnswer: 3,
      explanation: "Glaciers store about 69% of the world's freshwater, making them crucial freshwater reservoirs."
    },
    {
      id: 2,
      question: "How much ice do glaciers lose annually worldwide?",
      options: ["50 billion tons", "100 billion tons", "150 billion tons", "200 billion tons"],
      correctAnswer: 2,
      explanation: "Glaciers lose approximately 150 billion tons of ice annually due to global warming."
    },
    {
      id: 3,
      question: "Which region has experienced the fastest glacier retreat?",
      options: ["Antarctica", "Arctic", "Himalayas", "Alps"],
      correctAnswer: 1,
      explanation: "The Arctic region has experienced the most rapid glacier retreat, with some areas losing over 50% of their ice mass."
    },
    {
      id: 4,
      question: "What is the primary cause of glacier retreat?",
      options: ["Natural cycles", "Solar radiation", "Global warming", "Ocean currents"],
      correctAnswer: 2,
      explanation: "Global warming caused by increased greenhouse gas emissions is the primary driver of current glacier retreat worldwide."
    },
    {
      id: 5,
      question: "What percentage of glacier mass has been lost in the Alps since 1850?",
      options: ["20%", "40%", "60%", "80%"],
      correctAnswer: 2,
      explanation: "The European Alps have lost approximately 60% of their glacier mass since 1850 due to climate change."
    },
    
    // Emissions questions
    {
      id: 6,
      question: "What percentage of global CO₂ emissions come from burning fossil fuels?",
      options: ["50%", "65%", "75%", "85%"],
      correctAnswer: 2,
      explanation: "Approximately 75% of global CO₂ emissions come from burning coal, oil, and gas for energy and industry."
    },
    {
      id: 7,
      question: "Which country is the largest emitter of CO₂?",
      options: ["United States", "India", "China", "Russia"],
      correctAnswer: 2,
      explanation: "China is currently the world's largest emitter of CO₂, followed by the United States."
    },
    {
      id: 8,
      question: "What is the main greenhouse gas responsible for global warming?",
      options: ["Carbon dioxide (CO₂)", "Methane (CH₄)", "Nitrous oxide (N₂O)", "Water vapor (H₂O)"],
      correctAnswer: 0,
      explanation: "While all contribute, CO₂ is the primary greenhouse gas driving climate change due to its abundance and long lifespan."
    },
    {
      id: 9,
      question: "How much have global CO₂ emissions increased since 1990?",
      options: ["20%", "40%", "60%", "80%"],
      correctAnswer: 2,
      explanation: "Global CO₂ emissions have increased by approximately 60% since 1990, accelerating climate change."
    },
    {
      id: 10,
      question: "Which sector contributes the most to global greenhouse gas emissions?",
      options: ["Transportation", "Agriculture", "Energy production", "Industry"],
      correctAnswer: 2,
      explanation: "Energy production (mainly electricity and heat) contributes about 35% of global greenhouse gas emissions."
    },
    
    // Sea level questions
    {
      id: 11,
      question: "By how much has sea level risen in the past century?",
      options: ["10-15 cm", "20-25 cm", "30-35 cm", "40-45 cm"],
      correctAnswer: 1,
      explanation: "Sea level has risen by approximately 20-25 centimeters over the past century, primarily due to thermal expansion and glacier melt."
    },
    {
      id: 12,
      question: "What percentage of sea level rise comes from melting glaciers?",
      options: ["15%", "30%", "50%", "70%"],
      correctAnswer: 1,
      explanation: "Melting glaciers contribute about 30% of current sea level rise, with the rest coming from thermal expansion."
    },
    {
      id: 13,
      question: "How much could sea levels rise by 2100 if emissions continue?",
      options: ["0.3-0.6 meters", "0.6-1.0 meters", "1.0-1.8 meters", "2.0-3.0 meters"],
      correctAnswer: 2,
      explanation: "Under high-emission scenarios, sea levels could rise 1-1.8 meters by 2100, threatening coastal communities."
    },
    {
      id: 14,
      question: "Which factor contributes most to sea level rise?",
      options: ["Glacier melt", "Ice sheet melt", "Thermal expansion", "Groundwater extraction"],
      correctAnswer: 2,
      explanation: "Thermal expansion (water expanding as it warms) contributes about 40% of current sea level rise."
    },
    {
      id: 15,
      question: "How many people live in areas vulnerable to sea level rise?",
      options: ["100 million", "250 million", "500 million", "1 billion"],
      correctAnswer: 1,
      explanation: "Approximately 250 million people live in areas that would be submerged by 1 meter of sea level rise."
    },
    
    // Climate science questions
    {
      id: 16,
      question: "What is the main driver of current global warming?",
      options: ["Natural climate cycles", "Solar radiation changes", "Human activities", "Volcanic activity"],
      correctAnswer: 2,
      explanation: "Scientific consensus confirms human activities, especially fossil fuel burning, are the primary driver of current global warming."
    },
    {
      id: 17,
      question: "How much has global temperature risen since pre-industrial times?",
      options: ["0.5°C", "1.0°C", "1.5°C", "2.0°C"],
      correctAnswer: 1,
      explanation: "Global average temperature has risen by about 1.1°C since pre-industrial times, with most warming occurring since 1975."
    },
    {
      id: 18,
      question: "What is the Paris Agreement's temperature goal?",
      options: ["Limit to 1.5°C above pre-industrial", "Limit to 2.0°C above pre-industrial", "Limit to 3.0°C above pre-industrial", "No specific target"],
      correctAnswer: 1,
      explanation: "The Paris Agreement aims to limit global warming to well below 2°C, preferably to 1.5°C, compared to pre-industrial levels."
    },
    {
      id: 19,
      question: "Which greenhouse gas has the highest global warming potential?",
      options: ["Carbon dioxide (CO₂)", "Methane (CH₄)", "Nitrous oxide (N₂O)", "Sulfur hexafluoride (SF₆)"],
      correctAnswer: 3,
      explanation: "Sulfur hexafluoride has a global warming potential 23,500 times greater than CO₂ over a 100-year period."
    },
    {
      id: 20,
      question: "What percentage of climate scientists agree humans cause global warming?",
      options: ["66%", "80%", "90%", "97%"],
      correctAnswer: 3,
      explanation: "Multiple studies show that 97% or more of actively publishing climate scientists agree humans are causing global warming."
    },
    
    // Polar ecosystems questions
    {
      id: 21,
      question: "How much has Arctic sea ice decreased since 1979?",
      options: ["10%", "30%", "50%", "70%"],
      correctAnswer: 1,
      explanation: "Arctic sea ice minimum extent has decreased by about 30% since satellite measurements began in 1979."
    },
    {
      id: 22,
      question: "Which species is most threatened by Arctic ice loss?",
      options: ["Arctic fox", "Narwhal", "Polar bear", "Walrus"],
      correctAnswer: 2,
      explanation: "Polar bears rely on sea ice for hunting and are critically threatened by its rapid disappearance."
    },
    {
      id: 23,
      question: "What is permafrost and why is its thaw concerning?",
      options: [
        "Permanent ice sheets; their melt causes sea rise",
        "Frozen soil; thaw releases greenhouse gases",
        "Glacial ice cores; thaw destroys climate records",
        "Ocean ice; thaw disrupts currents"
      ],
      correctAnswer: 1,
      explanation: "Permafrost contains vast amounts of organic carbon that, when thawed, releases CO₂ and methane, accelerating warming."
    },
    {
      id: 24,
      question: "How much carbon is stored in Arctic permafrost?",
      options: ["500 billion tons", "1 trillion tons", "1.5 trillion tons", "2 trillion tons"],
      correctAnswer: 2,
      explanation: "Arctic permafrost contains about 1.5 trillion tons of carbon, twice as much as currently in the atmosphere."
    },
    {
      id: 25,
      question: "What is the albedo effect in polar regions?",
      options: [
        "Ice reflects sunlight, cooling the planet",
        "Dark ocean absorbs heat, melting more ice",
        "Both of the above",
        "Neither of the above"
      ],
      correctAnswer: 2,
      explanation: "Ice reflects sunlight (cooling), while dark ocean water absorbs heat (warming), creating a feedback loop that accelerates ice melt."
    },
    
    // Renewable energy questions
    {
      id: 26,
      question: "What percentage of global energy comes from renewables?",
      options: ["5%", "12%", "20%", "30%"],
      correctAnswer: 1,
      explanation: "About 12% of global energy comes from renewable sources, though this is rapidly increasing."
    },
    {
      id: 27,
      question: "Which renewable energy source has grown the fastest?",
      options: ["Hydroelectric", "Wind", "Solar", "Geothermal"],
      correctAnswer: 2,
      explanation: "Solar energy has experienced the fastest growth rate of any renewable energy source in the past decade."
    },
    {
      id: 28,
      question: "What is the main advantage of wind energy?",
      options: ["Low cost", "High efficiency", "No emissions during operation", "Works in all locations"],
      correctAnswer: 2,
      explanation: "Wind energy produces no greenhouse gas emissions during operation, making it a clean energy source."
    },
    {
      id: 29,
      question: "How much could solar panel costs decrease by 2030?",
      options: ["20%", "40%", "60%", "80%"],
      correctAnswer: 2,
      explanation: "Solar panel costs have already fallen 90% since 2009 and could decrease another 60% by 2030."
    },
    {
      id: 30,
      question: "Which country leads in renewable energy adoption?",
      options: ["China", "Germany", "United States", "Iceland"],
      correctAnswer: 0,
      explanation: "China is the world leader in renewable energy investment and installed capacity."
    },
    
    // Additional unique questions
    {
      id: 31,
      question: "What is ocean acidification?",
      options: [
        "Oceans becoming more alkaline",
        "Oceans absorbing CO₂ and becoming more acidic",
        "Pollution making oceans toxic",
        "Salt concentration increasing"
      ],
      correctAnswer: 1,
      explanation: "Oceans absorb about 30% of emitted CO₂, forming carbonic acid and lowering pH levels, harming marine life."
    },
    {
      id: 32,
      question: "How much has ocean acidity increased since industrialization?",
      options: ["10%", "20%", "30%", "40%"],
      correctAnswer: 2,
      explanation: "Ocean acidity has increased by 30% since the Industrial Revolution due to CO₂ absorption."
    },
    {
      id: 33,
      question: "What is the main threat to coral reefs?",
      options: ["Overfishing", "Ocean acidification", "Pollution", "Bleaching from warming waters"],
      correctAnswer: 3,
      explanation: "Warming waters cause coral bleaching, which has devastated half the Great Barrier Reef since 2016."
    },
    {
      id: 34,
      question: "How much forest is lost annually?",
      options: ["50,000 sq km", "100,000 sq km", "150,000 sq km", "200,000 sq km"],
      correctAnswer: 2,
      explanation: "Approximately 150,000 square kilometers of forest are lost annually, equivalent to 40 football fields per minute."
    },
    {
      id: 35,
      question: "What percentage of species could face extinction due to climate change?",
      options: ["10%", "25%", "40%", "60%"],
      correctAnswer: 1,
      explanation: "Scientists estimate 25% of species could face extinction if warming exceeds 2°C above pre-industrial levels."
    },
    {
      id: 36,
      question: "What is the carbon footprint of a single email?",
      options: ["1g CO₂", "4g CO₂", "10g CO₂", "50g CO₂"],
      correctAnswer: 1,
      explanation: "A typical email has a carbon footprint of about 4g CO₂, mostly from data center energy use."
    },
    {
      id: 37,
      question: "Which food has the highest carbon footprint?",
      options: ["Beef", "Chicken", "Rice", "Avocado"],
      correctAnswer: 0,
      explanation: "Beef production generates 60kg CO₂ per kg of meat, mostly from methane emissions and land use."
    },
    {
      id: 38,
      question: "How much energy could be saved by switching to LED lights?",
      options: ["25%", "50%", "75%", "90%"],
      correctAnswer: 2,
      explanation: "LED lights use about 75% less energy than incandescent bulbs and last 25 times longer."
    },
    {
      id: 39,
      question: "What is the Keeling Curve?",
      options: [
        "Graph of rising sea levels",
        "Record of increasing atmospheric CO₂",
        "Chart of global temperature rise",
        "Measurement of glacier retreat"
      ],
      correctAnswer: 1,
      explanation: "The Keeling Curve is the longest continuous record of atmospheric CO₂, showing a steady increase since 1958."
    },
    {
      id: 40,
      question: "When was the hottest year on record?",
      options: ["2015", "2016", "2018", "2023"],
      correctAnswer: 3,
      explanation: "2023 was the hottest year on record, with global temperatures 1.48°C above pre-industrial levels."
    },
    {
      id: 41,
      question: "What is the main source of methane emissions?",
      options: ["Agriculture", "Fossil fuels", "Waste", "Natural wetlands"],
      correctAnswer: 0,
      explanation: "Agriculture, particularly livestock and rice cultivation, accounts for about 40% of human-caused methane emissions."
    },
    {
      id: 42,
      question: "How much has the Greenland ice sheet lost since 2002?",
      options: ["100 billion tons", "250 billion tons", "400 billion tons", "550 billion tons"],
      correctAnswer: 2,
      explanation: "Greenland has lost approximately 4,700 billion tons of ice since 2002, contributing to sea level rise."
    },
    {
      id: 43,
      question: "What percentage of plastic ends up in oceans?",
      options: ["3%", "10%", "20%", "30%"],
      correctAnswer: 0,
      explanation: "About 3% of plastic produced ends up in oceans, totaling 8 million tons annually, harming marine ecosystems."
    },
    {
      id: 44,
      question: "Which technology captures CO₂ from the air?",
      options: ["Carbon capture and storage", "Electrostatic precipitation", "Reverse osmosis", "Catalytic converters"],
      correctAnswer: 0,
      explanation: "Carbon capture and storage (CCS) technologies remove CO₂ from emission sources or directly from the atmosphere."
    },
    {
      id: 45,
      question: "How much could reforestation reduce atmospheric CO₂?",
      options: ["5%", "15%", "25%", "40%"],
      correctAnswer: 2,
      explanation: "Large-scale reforestation could remove up to 25% of atmospheric CO₂, but requires careful implementation."
    },
    {
      id: 46,
      question: "What is the main challenge for electric vehicles?",
      options: ["Cost", "Range", "Charging infrastructure", "Battery production emissions"],
      correctAnswer: 2,
      explanation: "Lack of widespread charging infrastructure remains a significant barrier to electric vehicle adoption."
    },
    {
      id: 47,
      question: "How much energy is wasted in conventional power plants?",
      options: ["30-40%", "50-60%", "65-70%", "75-80%"],
      correctAnswer: 1,
      explanation: "Traditional fossil fuel power plants waste 50-60% of energy as heat during electricity generation."
    },
    {
      id: 48,
      question: "Which renewable source provides the most electricity globally?",
      options: ["Wind", "Solar", "Hydro", "Geothermal"],
      correctAnswer: 2,
      explanation: "Hydropower generates about 60% of global renewable electricity, though solar and wind are growing rapidly."
    },
    {
      id: 49,
      question: "What is the 'carbon budget'?",
      options: [
        "Funding for climate projects",
        "Maximum CO₂ to limit warming",
        "Corporate emissions allowance",
        "Personal carbon tracking"
      ],
      correctAnswer: 1,
      explanation: "The carbon budget is the maximum amount of CO₂ that can be emitted while keeping warming below a certain level."
    },
    {
      id: 50,
      question: "How many climate refugees could exist by 2050?",
      options: ["50 million", "100 million", "200 million", "500 million"],
      correctAnswer: 2,
      explanation: "The World Bank estimates climate change could displace 200 million people by 2050."
    },
    {
      id: 51,
      question: "What is blue carbon?",
      options: [
        "Carbon captured by oceans",
        "Carbon stored in coastal ecosystems",
        "Low-emission certification",
        "Carbon from marine sources"
      ],
      correctAnswer: 1,
      explanation: "Blue carbon refers to carbon captured and stored by coastal ecosystems like mangroves, seagrasses, and salt marshes."
    },
    {
      id: 52,
      question: "Which country has the highest per capita emissions?",
      options: ["United States", "Qatar", "Australia", "Canada"],
      correctAnswer: 1,
      explanation: "Qatar has the highest per capita CO₂ emissions at about 35 tons per person annually."
    },
    {
      id: 53,
      question: "How much food is wasted globally?",
      options: ["15%", "25%", "33%", "50%"],
      correctAnswer: 2,
      explanation: "Approximately one-third of all food produced is wasted, contributing 8-10% of global greenhouse gas emissions."
    },
    {
      id: 54,
      question: "What is the main greenhouse gas from agriculture?",
      options: ["Carbon dioxide", "Methane", "Nitrous oxide", "Water vapor"],
      correctAnswer: 2,
      explanation: "Nitrous oxide from fertilizers has 300 times the warming potential of CO₂ and persists in the atmosphere for 114 years."
    },
    {
      id: 55,
      question: "Which technology shows promise for clean hydrogen production?",
      options: ["Steam methane reforming", "Electrolysis", "Gasification", "Pyrolysis"],
      correctAnswer: 1,
      explanation: "Electrolysis using renewable electricity offers the cleanest path for hydrogen production."
    },
    {
      id: 56,
      question: "How much could climate change reduce global GDP by 2100?",
      options: ["5%", "10%", "15%", "25%"],
      correctAnswer: 3,
      explanation: "Unchecked climate change could reduce global GDP by 25% by 2100 due to impacts on health, agriculture, and infrastructure."
    },
    {
      id: 57,
      question: "What is the main climate solution proposed for cities?",
      options: ["Vertical farming", "Green roofs", "Public transit expansion", "Urban forests"],
      correctAnswer: 2,
      explanation: "Expanding public transit is among the most effective urban climate solutions, reducing transportation emissions by up to 70%."
    },
    {
      id: 58,
      question: "How much carbon does an acre of forest absorb annually?",
      options: ["0.5 tons", "1 ton", "2.5 tons", "5 tons"],
      correctAnswer: 2,
      explanation: "A mature forest absorbs about 2.5 tons of carbon per acre annually through photosynthesis."
    },
    {
      id: 59,
      question: "Which industry is hardest to decarbonize?",
      options: ["Aviation", "Shipping", "Cement production", "Steel manufacturing"],
      correctAnswer: 2,
      explanation: "Cement production accounts for 8% of global CO₂ emissions and requires high-temperature heat difficult to electrify."
    },
    {
      id: 60,
      question: "What percentage of climate funding goes to adaptation?",
      options: ["5%", "15%", "25%", "40%"],
      correctAnswer: 0,
      explanation: "Only about 5% of climate finance goes to adaptation, despite growing needs for climate-resilient infrastructure."
    }
  ];

  const quizTitles = [
    "Glacier Fundamentals",
    "Climate Change Basics",
    "Arctic Meltdown",
    "Sea Level Science",
    "Polar Ecosystems",
    "Carbon Footprint Challenge",
    "Renewable Energy Quiz",
    "Global Warming Facts",
    "Ice Age Mysteries",
    "Environmental Policies",
    "Ocean Acidification",
    "Permafrost & Climate"
  ];

  const quizDescriptions = [
    "Test your knowledge about glaciers and their role in climate systems",
    "Understand the basics of climate change and its impacts",
    "Explore the rapid changes happening in the Arctic region",
    "Learn about sea level rise and its consequences",
    "Discover how polar ecosystems are affected by climate change",
    "Calculate your carbon knowledge and reduce your footprint",
    "Test your understanding of renewable energy solutions",
    "Separate facts from fiction in global warming science",
    "Journey through ice age history and climate patterns",
    "Understand environmental policies and their effectiveness",
    "Learn about ocean acidification and its impacts",
    "Explore permafrost thaw and its climate consequences"
  ];

  const difficulties: ('beginner' | 'intermediate' | 'advanced')[] = [
    'beginner', 'intermediate', 'advanced', 
    'beginner', 'intermediate', 'advanced',
    'beginner', 'intermediate', 'advanced',
    'beginner', 'intermediate', 'advanced'
  ];

  // Create quizzes with unique questions
  return quizTitles.map((title, index) => {
    // Select 5 unique questions for each quiz
    const startIndex = index * 5;
    const endIndex = startIndex + 5;
    const questions = allQuestions.slice(startIndex, endIndex);
    
    return {
      id: index + 1,
      title,
      description: quizDescriptions[index],
      difficulty: difficulties[index],
      questions
    };
  });
};

const quizzes = generateQuizzes();
const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastConfettiTime = useRef(0);

  const selectAnswer = (answerIndex: number) => {
    if (!selectedQuiz) return;
    
    const isCorrect = answerIndex === selectedQuiz.questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, answerIndex]);
  };

  const nextQuestion = () => {
    if (!selectedQuiz) return;
    
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
    setShowCelebration(false);
    setSelectedQuiz(null);
  };

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setIsComplete(false);
    setShowCelebration(false);
  };

  const createConfetti = (timestamp: number) => {
    if (!celebrationRef.current || !showCelebration) return;
    
    // Throttle confetti creation to 60fps
    if (timestamp - lastConfettiTime.current < 16) {
      animationFrameRef.current = requestAnimationFrame(createConfetti);
      return;
    }
    lastConfettiTime.current = timestamp;
    
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    // Only create 1 confetti piece per frame for better performance
    const confetti = document.createElement('div');
    confetti.className = 'absolute w-2 h-2 rounded-full will-change-transform';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-10px';
    confetti.style.zIndex = '100';
    
    celebrationRef.current.appendChild(confetti);
    
    const animation = confetti.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ],
      {
        duration: 2000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
      }
    );
    
    animation.onfinish = () => {
      confetti.remove();
    };
    
    animationFrameRef.current = requestAnimationFrame(createConfetti);
  };

  useEffect(() => {
    if (showCelebration) {
      animationFrameRef.current = requestAnimationFrame(createConfetti);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [showCelebration]);

  const contextValue: QuizContextType = {
    currentQuestion,
    score,
    answers,
    quiz: selectedQuiz,
    nextQuestion,
    selectAnswer,
    resetQuiz,
    startQuiz,
    isComplete
  };

  return (
    <PageTransition className="pt-20">
      {showCelebration && (
        <div 
          ref={celebrationRef}
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        />
      )}
      
      <QuizContext.Provider value={contextValue}>
        <div className="min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            {/* Header */}
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }}
  className="text-center mb-12 rounded-2xl p-8 bg-gradient-to-r from-glacier-50 to-cyan-50 shadow-lg border border-glacier-200"
>
  {/* Enhanced Snowflake Animation */}
  <motion.div
    variants={{
      hidden: { 
        opacity: 0, 
        y: -20,
        scale: 0.5,
        rotate: -30
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 300,
          duration: 0.8
        }
      }
    }}
    className="flex justify-center mb-4"
  >
    <motion.div 
      className="bg-white p-4 rounded-full shadow-md"
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 8,
          ease: "linear"
        },
        scale: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut"
        }
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-12 w-12 text-glacier-600" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* More intricate snowflake design */}
        <path d="M12 2v20M12 2l4 4M12 2L8 6M12 22l4-4M12 22l-4-4M5 12h14M5 12l4-4M5 12l4 4M19 12l-4-4M19 12l-4 4" />
        <path d="M12 5v14M12 5l4 4M12 5L8 9M12 19l4-4M12 19l-4-4M2 12h20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4" />
      </svg>
    </motion.div>
  </motion.div>

  {/* Title with enhanced animation */}
  <motion.h1
    variants={{
      hidden: { 
        opacity: 0, 
        y: 40,
        scale: 0.8 
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
          mass: 0.5
        }
      }
    }}
    className="text-4xl font-montserrat font-bold text-glacier-950 mb-4"
  >
    Glacier Climate Quizzes
  </motion.h1>
  
  {/* Subtitle with enhanced animation */}
  <motion.p
    variants={{
      hidden: { 
        opacity: 0, 
        y: 30,
        rotateX: 90,
        textShadow: "0 0 8px rgba(99, 102, 241, 0)"
      },
      visible: { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        textShadow: [
          "0 0 8px rgba(99, 102, 241, 0)",
          "0 0 12px rgba(99, 102, 241, 0.3)",
          "0 0 8px rgba(99, 102, 241, 0)"
        ],
        transition: {
          type: "spring",
          damping: 12,
          delay: 0.2,
          duration: 1.5,
          textShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      }
    }}
    className="text-xl text-glacier-700 font-medium"
  >
    Test your knowledge about glaciers and climate change
  </motion.p>
</motion.div>

            <AnimatePresence mode="wait">
              {!selectedQuiz ? (
                <QuizList key="quiz-list" />
              ) : !isComplete ? (
                <QuestionCard key="question-card" />
              ) : (
                <ResultsCard key="results" score={score} total={selectedQuiz.questions.length} onReset={resetQuiz} />
              )}
            </AnimatePresence>
          </div>
        </div>
          <Footer />
      </QuizContext.Provider>
    </PageTransition>
  );
};

const QuizList: React.FC = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('QuizList must be used within QuizContext');
  
  const { startQuiz } = context;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {quizzes.map((quiz, index) => (
        <motion.div
          key={quiz.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -10, scale: 1.03 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-glacier-100 hover:border-glacier-300 transition-all duration-300 cursor-pointer group"
          onClick={() => startQuiz(quiz)}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                quiz.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                quiz.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
              </div>
              <div className="bg-glacier-100 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-glacier-600" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-glacier-950 mb-2">{quiz.title}</h3>
            <p className="text-glacier-600 mb-4">{quiz.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-glacier-500">
                {quiz.questions.length} questions
              </span>
              <button className="flex items-center text-glacier-700 group-hover:text-glacier-900 font-medium transition-colors">
                Start Quiz
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className={`h-2 ${
            quiz.difficulty === 'beginner' ? 'bg-green-500' :
            quiz.difficulty === 'intermediate' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const QuestionCard: React.FC = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('QuestionCard must be used within QuizContext');

  const { currentQuestion, quiz, selectAnswer, nextQuestion, resetQuiz } = context;
  
  if (!quiz) return null;
  
  const question = quiz.questions[currentQuestion];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    selectAnswer(answerIndex);
  };

  const handleNext = () => {
    nextQuestion();
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={resetQuiz}
          className="flex items-center text-glacier-600 hover:text-glacier-800 font-medium"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Quizzes
        </button>
        <div className="flex items-center">
          <div className="bg-glacier-100 p-2 rounded-lg mr-3">
            <BookOpen className="h-5 w-5 text-glacier-600" />
          </div>
          <h3 className="text-xl font-bold text-glacier-950">{quiz.title}</h3>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-glacier-600 mb-2">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-glacier-200 rounded-full h-2">
          <motion.div
            className="bg-glacier-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-montserrat font-semibold text-glacier-950 mb-8"
      >
        {question.question}
      </motion.h2>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const isWrong = isAnswered && isSelected && !isCorrect;

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleAnswerClick(index)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                isAnswered
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : isWrong
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-glacier-200 bg-gray-50 text-gray-600'
                  : isSelected
                  ? 'border-glacier-500 bg-glacier-50'
                  : 'border-glacier-200 hover:border-glacier-300 hover:bg-glacier-50'
              }`}
              disabled={isAnswered}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {isAnswered && (
                  <div>
                    {isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {isWrong && <XCircle className="h-5 w-5 text-red-500" />}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-glacier-50 rounded-lg p-4 mb-6"
          >
            <p className="text-glacier-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-glacier-500 hover:bg-glacier-600 text-white rounded-lg font-medium transition-colors"
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

const ResultsCard: React.FC<{ score: number; total: number; onReset: () => void }> = ({
  score,
  total,
  onReset
}) => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('ResultsCard must be used within QuizContext');
  
  const { quiz } = context;
  
  const percentage = (score / total) * 100;
  const isPerfectScore = percentage === 100;
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent! You're a climate champion! 🌟";
    if (percentage >= 70) return "Great job! You have solid climate knowledge! 👍";
    if (percentage >= 50) return "Good effort! Keep learning about climate change! 📚";
    return "Keep exploring! Every step towards climate awareness counts! 🌱";
  };

  // Celebration stars animation
  const renderStars = () => {
    if (percentage < 70) return null;
    
    return Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ 
          scale: [0, 1.2, 1], 
          rotate: [0, 20, -20, 0] 
        }}
        transition={{ 
          duration: 0.8, 
          delay: i * 0.2,
          times: [0, 0.5, 1]
        }}
      >
        <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
      </motion.div>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden"
    >
      {renderStars()}
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-glacier-500 to-glacier-600 rounded-full flex items-center justify-center"
      >
        <span className="text-3xl font-bold text-white">{score}/{total}</span>
      </motion.div>

      <h2 className="text-3xl font-montserrat font-bold text-glacier-950 mb-2">
        Quiz Complete!
      </h2>
      
      {quiz && (
        <h3 className="text-xl text-glacier-700 mb-4">{quiz.title}</h3>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xl text-glacier-700 mb-2">
          You scored {score} out of {total} questions correctly
        </p>
        <p className={`text-lg ${
          percentage >= 90 ? 'text-green-600' :
          percentage >= 70 ? 'text-yellow-600' : 
          'text-red-600'
        } font-semibold mb-8`}>
          {getScoreMessage()}
        </p>

        {isPerfectScore && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-yellow-50 rounded-full">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-2" />
              <span className="font-semibold text-yellow-700">Perfect Score!</span>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReset}
            className="flex items-center justify-center px-6 py-3 bg-glacier-500 hover:bg-glacier-600 text-white rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Take Again
          </button>
          <button
            onClick={() => onReset()}
            className="flex items-center justify-center px-6 py-3 border-2 border-glacier-500 text-glacier-500 hover:bg-glacier-500 hover:text-white rounded-lg font-medium transition-colors"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Choose Another Quiz
          </button>
          <button
            onClick={() => window.location.href = '/glacier'}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium transition-colors hover:from-blue-600 hover:to-cyan-600"
          >
            View Your Glacier
          </button>
        </div>
      </motion.div>
    </motion.div>
    
  );
};

export default Quiz;
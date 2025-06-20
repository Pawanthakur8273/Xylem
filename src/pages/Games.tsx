import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Leaf, Trash2, Fish, TreePine, Wind, PawPrint, Droplets, Factory, Globe
} from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import Footer from '../components/layout/Footer';
import Level1 from './levels/Level1';

const GameLevelsPage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [coins, setCoins] = useState(0);
  const [levelsCompleted, setLevelsCompleted] = useState(0);
  const [treesPlanted, setTreesPlanted] = useState(0);

  useEffect(() => {
    const savedCoins = sessionStorage.getItem('totalCoins');
    const savedLevels = sessionStorage.getItem('levelsCompleted');
    const savedTrees = sessionStorage.getItem('treesPlanted');

    setCoins(savedCoins ? parseInt(savedCoins) : 0);
    setLevelsCompleted(savedLevels ? parseInt(savedLevels) : 0);
    setTreesPlanted(savedTrees ? parseInt(savedTrees) : 0);
  }, []);

  const gameLevels = [
    {
      id: 1,
      title: "Tree Planting Basics",
      description: "Plant saplings in empty soil patches to restore forests",
      icon: Leaf,
      color: "from-emerald-500 to-green-500",
      unlocked: true,
      completed: levelsCompleted >= 1,
      coinsEarned: 20,
      path: "/level1"
    },
    {
      id: 2,
      title: "Urban Waste Cleanup",
      description: "Sort waste into recyclable, compostable, and non-recyclable bins",
      icon: Trash2,
      color: "from-amber-500 to-orange-500",
      unlocked: levelsCompleted >= 1,
      completed: levelsCompleted >= 2,
      coinsEarned: 25,
      path: "/level2"
    },
    {
      id: 3,
      title: "Restoring Biodiversity",
      description: "Remove pollutants and introduce aquatic plants to restore ecosystems",
      icon: Fish,
      color: "from-blue-500 to-cyan-500",
      unlocked: levelsCompleted >= 2,
      completed: levelsCompleted >= 3,
      coinsEarned: 30,
      path: "/level3"
    },
    {
      id: 4,
      title: "Reforestation Strategy",
      description: "Decide which tree species to plant and where for maximum impact",
      icon: TreePine,
      color: "from-green-600 to-emerald-600",
      unlocked: levelsCompleted >= 3,
      completed: levelsCompleted >= 4,
      coinsEarned: 35,
      path: "/level4"
    },
    {
      id: 5,
      title: "Air Quality Improvement",
      description: "Plant trees and place air-purifying devices in strategic locations",
      icon: Wind,
      color: "from-sky-500 to-blue-500",
      unlocked: levelsCompleted >= 4,
      completed: levelsCompleted >= 5,
      coinsEarned: 40,
      path: "/level5"
    },
    {
      id: 6,
      title: "Mangrove Restoration",
      description: "Strategically plant mangroves to reduce erosion and protect wildlife",
      icon: Droplets,
      color: "from-teal-500 to-cyan-500",
      unlocked: levelsCompleted >= 5,
      completed: levelsCompleted >= 6,
      coinsEarned: 45,
      path: "/level6"
    }
  ];

  const advancedLevels = [
    {
      id: 7,
      title: "Renewable Energy Grid",
      description: "Connect solar panels and wind turbines to supply clean electricity",
      icon: Factory,
      color: "from-yellow-500 to-amber-500",
      unlocked: levelsCompleted >= 6,
      completed: levelsCompleted >= 7,
      coinsEarned: 50,
      path: "/level7"
    },
    {
      id: 8,
      title: "Wildlife Corridor Creation",
      description: "Design pathways that connect fragmented animal habitats",
      icon: PawPrint,
      color: "from-orange-500 to-red-500",
      unlocked: levelsCompleted >= 7,
      completed: levelsCompleted >= 8,
      coinsEarned: 55,
      path: "/level8"
    },
    {
      id: 9,
      title: "Flood-Resistant City",
      description: "Place barriers and drainage systems to protect against flooding",
      icon: Droplets,
      color: "from-blue-600 to-indigo-600",
      unlocked: levelsCompleted >= 8,
      completed: levelsCompleted >= 9,
      coinsEarned: 60,
      path: "/level9"
    },
    {
      id: 10,
      title: "Global Policy Simulation",
      description: "Balance environmental goals with economic and social factors",
      icon: Globe,
      color: "from-purple-500 to-violet-500",
      unlocked: levelsCompleted >= 9,
      completed: levelsCompleted >= 10,
      coinsEarned: 100,
      path: "/level10"
    }
  ];

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <PageTransition className="pt-20 min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Environmental Challenges</h1>
            <p className="text-lg text-slate-600">
              Complete challenges to earn coins and restore our planet
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-blue-100 px-4 py-2 rounded-full">
              <div className="text-yellow-500 font-bold mr-2">{coins}</div>
              <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-xs font-bold text-white">C</span>
              </div>
            </div>
            <button 
              onClick={toggleProfile}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full flex items-center"
            >
              <User className="mr-2" size={18} />
              Profile
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Basic Environmental Challenges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameLevels.map(level => <LevelCard key={level.id} level={level} />)}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Advanced Environmental Systems</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedLevels.map(level => <LevelCard key={level.id} level={level} />)}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showProfile && (
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-900 z-50">
            <div className="p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Player Profile</h2>
                <button onClick={toggleProfile}><X size={24} /></button>
              </div>
              <p className="mb-2">Coins: {coins}</p>
              <p className="mb-2">Levels Completed: {levelsCompleted}</p>
              <p>Trees Planted: {treesPlanted}</p>
            </div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </PageTransition>
  );
};

const LevelCard = ({ level }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-2xl overflow-hidden shadow-lg ${
        level.unlocked ? (level.completed ? "border-2 border-emerald-500" : "border-2 border-blue-300") : "opacity-70"
      }`}
    >
      <div className={`h-40 bg-gradient-to-br ${level.color} flex flex-col justify-center items-center text-white p-6`}>
        <level.icon className="w-12 h-12 mb-2" />
        <h3 className="text-xl font-bold text-center">{level.title}</h3>
        <p className="text-sm text-center mt-1">{level.description}</p>
      </div>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
              <span className="text-xs font-bold text-white">C</span>
            </div>
            <span className="font-bold">{level.coinsEarned}</span>
          </div>
          {level.completed ? (
            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">Completed</span>
          ) : !level.unlocked ? (
            <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">Locked</span>
          ) : (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Available</span>
          )}
        </div>
        <button
          onClick={() => level.unlocked && navigate(level.path)}
          className={`w-full py-2 rounded-lg font-medium ${
            level.unlocked ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600" : "bg-slate-200 text-slate-500 cursor-not-allowed"
          }`}
          disabled={!level.unlocked}
        >
          {level.completed ? "Replay Level" : level.unlocked ? "Start Challenge" : "Locked"}
        </button>
      </div>
    </motion.div>
  );
};

export default GameLevelsPage;

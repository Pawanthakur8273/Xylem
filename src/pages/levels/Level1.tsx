// Level1.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { X } from 'lucide-react';

const Level1: React.FC = () => {
  const navigate = useNavigate();
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Game state
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [coins, setCoins] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizWon, setQuizWon] = useState(false);
  
  const totalTrees = 10;
  const progressPercentage = (treesPlanted / totalTrees) * 100;

  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const moveStateRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  // Initialize the game
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 5, 15);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);
    
    // Ground
    const textureLoader = new THREE.TextureLoader();
    const grassTexture = textureLoader.load('/grass.jpg');
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(5, 5);
    
    const groundGeometry = new THREE.PlaneGeometry(500, 500);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      map: grassTexture,
      emissive: new THREE.Color(0x006400),
      emissiveIntensity: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    // Fence
    const createContinuousFence = () => {
      // Fence creation logic from level1.js
      // ... (omitted for brevity, same as original)
    };
    createContinuousFence();
    
    // Existing trees
    const createTree = (x: number, z: number) => {
      const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 8);
      const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.set(x, 2.5, z);

      const foliageGeometry = new THREE.SphereGeometry(3, 8, 8);
      const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.set(x, 7.5, z);

      scene.add(trunk);
      scene.add(foliage);
    };

    // Add initial trees
    createTree(0, 0);
    createTree(10, 15);
    createTree(-20, 25);
    createTree(30, -20);
    createTree(-15, -30);
    
    // Player
    const playerGeometry = new THREE.SphereGeometry(1, 32, 32);
    const playerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(0, 1, 0);
    scene.add(player);
    playerRef.current = player;
    
    // Movement handlers
    const handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'ArrowUp':
        case 'w':
          moveStateRef.current.forward = true;
          break;
        case 'ArrowDown':
        case 's':
          moveStateRef.current.backward = true;
          break;
        case 'ArrowLeft':
        case 'a':
          moveStateRef.current.left = true;
          break;
        case 'ArrowRight':
        case 'd':
          moveStateRef.current.right = true;
          break;
      }
    };
    
    const handleKeyUp = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'ArrowUp':
        case 'w':
          moveStateRef.current.forward = false;
          break;
        case 'ArrowDown':
        case 's':
          moveStateRef.current.backward = false;
          break;
        case 'ArrowLeft':
        case 'a':
          moveStateRef.current.left = false;
          break;
        case 'ArrowRight':
        case 'd':
          moveStateRef.current.right = false;
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const player = playerRef.current;
      const camera = cameraRef.current;
      const moveState = moveStateRef.current;
      const speed = 0.2;
      
      if (player) {
        if (moveState.forward) player.position.z -= speed;
        if (moveState.backward) player.position.z += speed;
        if (moveState.left) player.position.x -= speed;
        if (moveState.right) player.position.x += speed;
        
        if (camera) {
          camera.position.set(player.position.x, player.position.y + 5, player.position.z + 15);
          camera.lookAt(player.position);
        }
      }
      
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(scene, cameraRef.current);
      }
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (mountRef.current && mountRef.current.contains(rendererRef.current?.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Plant a tree
  const plantTree = () => {
    if (treesPlanted < totalTrees) {
      const newCount = treesPlanted + 1;
      setTreesPlanted(newCount);
      setCoins(coins + 1);
      
      if (newCount === totalTrees) {
        setShowCompletion(true);
      }
    }
  };

  // Handle level progression
  const handleCompletionNext = () => {
    setShowCompletion(false);
    setShowFact(true);
  };

  const handleFactNext = () => {
    setShowFact(false);
    setShowQuiz(true);
  };

  const handleQuizAnswer = (correct: boolean) => {
    setShowQuiz(false);
    setQuizWon(correct);
    setShowQuizResult(true);
    
    if (correct) {
      setCoins(coins + 10);
      setTimeout(() => {
        navigate('/levels');
      }, 1500);
    } else {
      setTimeout(() => {
        navigate('/levels');
      }, 3000);
    }
  };

  // Progress bar color
  const getProgressColor = () => {
    if (progressPercentage <= 33) return 'bg-red-500';
    if (progressPercentage <= 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white">
      {/* Three.js container */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Exit button */}
      <button 
        onClick={() => navigate('/levels')}
        className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Exit
      </button>
      
      {/* Level title */}
      <h2 className="absolute top-2 left-20 text-3xl font-bold text-red-700 bg-opacity-50 p-2 rounded-lg">
        Level 1: Tree Planting Basics
      </h2>
      
      {/* Progress bar */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <p className="text-black text-sm font-medium">Level Progress Measure:</p>
        <div className="w-48 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
          <div 
            className={`h-2 ${getProgressColor()} transition-all duration-300`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Coins bar */}
      <div className="absolute top-10 right-4 flex items-center space-x-4">
        <p className="text-yellow-500 text-2xl font-medium">🪙</p>
        <div className="w-10 h-10 bg-gray-800 text-yellow-500 text-xl font-bold rounded-full overflow-hidden border border-gray-600 flex items-center justify-center">
          {coins}
        </div>
      </div>
      
      {/* Plant Tree Button */}
      <button
        onClick={plantTree}
        className="absolute bottom-5 left-5 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full text-lg flex items-center"
      >
        🌱 Plant Tree
      </button>
      
      {/* Completion Modal */}
      {showCompletion && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-xl w-1/2 max-w-2xl text-center">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">
              Congratulations!
            </h3>
            <p className="text-lg mb-6">
              You've completed the "Tree Planting Basics" level.
            </p>
            <p className="mb-6">
              It's time for a tree planting <span className="underline text-yellow-500">fact</span> now!
            </p>
            <button
              onClick={handleCompletionNext}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full text-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Fact Modal */}
      {showFact && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-xl w-1/2 max-w-2xl">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">
              Planting Fact:
            </h3>
            <p className="text-lg mb-6">
              Trees help reduce greenhouse gases like carbon dioxide, which contribute to climate change. 
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleFactNext}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full text-lg"
              >
                Ready for a Quiz?
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Quiz Modal */}
      {showQuiz && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-xl w-1/2 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-500">
                Quiz: Planting Basics
              </h3>
              <p className="bg-yellow-500 text-black py-1 px-3 rounded-full">
                Reward 10 🪙
              </p>
            </div>
            
            <p className="text-lg mb-6">
              What is the minimum distance required between two trees to ensure healthy growth?
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleQuizAnswer(false)}
                className="bg-gray-700 hover:bg-red-600 py-3 rounded-lg"
              >
                a) 1 meter
              </button>
              <button
                onClick={() => handleQuizAnswer(true)}
                className="bg-gray-700 hover:bg-green-600 py-3 rounded-lg"
              >
                b) 3 meters
              </button>
              <button
                onClick={() => handleQuizAnswer(false)}
                className="bg-gray-700 hover:bg-red-600 py-3 rounded-lg"
              >
                c) 5 meters
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Quiz Result Modal */}
      {showQuizResult && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-xl w-1/2 max-w-2xl text-center">
            {quizWon ? (
              <>
                <h3 className="text-2xl font-bold text-green-500 mb-4">
                  Congratulations!
                </h3>
                <p className="text-lg">
                  You've won the quiz and earned 10 coins!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-red-500 mb-4">
                  Almost There!
                </h3>
                <p className="text-lg mb-4">
                  You may have missed this one, but every wrong answer is a step toward becoming an Eco Hero!
                </p>
                <p className="text-lg">
                  Keep going! Your actions make a difference.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Level1;
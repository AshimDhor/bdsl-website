import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, BookOpen, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import FocusAreaModal from '../components/FocusAreaModal';

const backgroundImages = [
  '/images/histopath.jpg',
  '/images/hemorrhage.png',
  '/images/lungs.png'
];

const focusAreas = [
  {
    icon: <Brain size={32} />,
    title: "Automatic Tumor Contouring",
    description: "Head and Neck Cancer (HNC) is the most common cancer in India, with over 500,000 new cases worldwide annually. Radiation therapy is frequently recommended, but requires precise segmentation of tumors in CT scans. This process is labor-intensive and prone to inter-observer variability. We aim to develop a deep learning-based image segmentation framework for automatic tumor contouring to improve accuracy and efficiency in radiotherapy planning.",
    image: "/images/braintumour.png"
  },
  {
    icon: <BookOpen size={32} />,
    title: "Hemorrhage and Stroke Detection and Classification",
    description: "Intracranial hemorrhage and stroke are critical medical conditions requiring immediate attention. Our research focuses on developing advanced deep learning algorithms for rapid detection and classification of hemorrhages and strokes from CT scans. These tools aim to assist radiologists in making faster, more accurate diagnoses, potentially saving crucial time in emergency situations.",
    image: "/images/hemorrhage.png"
  },
  {
    icon: <Activity size={32} />,
    title: "Clinical Text Mining",
    description: "Clinical notes contain crucial information about patients, including diagnoses, medications, and treatment plans. We develop NLP frameworks for automated text mining from clinical reports to support early disease prediction, adverse event detection, and improved patient care. Our research also integrates image and text-based analysis for enhanced radiology diagnostics.",
    image: "/images/clinical.png"
  }
];

export default function Home() {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((current) => (current + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black opacity-85"></div>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={backgroundImages[currentImageIndex]}
              alt="Background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover"
              style={{
                objectPosition: '50% 40%'
              }}
            />
          </AnimatePresence>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-sm bg-black/30 rounded-3xl p-8 border border-gray-700"
          >
            <div className="mb-8 flex flex-col items-center">
              <div className="relative">
                <h2 className="text-6xl md:text-8xl font-bold text-white mb-4 font-sans tracking-tight">AI for</h2>
                <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text font-sans tracking-tight text-center min-h-[120px] flex items-center justify-center">
                  <Typewriter
                    options={{
                      strings: [
                        'Cancer',
                        'Hemorrhage',
                        'Stroke',
                        'Radiology',
                        'Report Generation',
                        'Medical Text'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30
                    }}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white font-sans tracking-tight bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text">
              Biomedical Data Science Lab
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 font-sans tracking-tight">@IISERB</p>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-serif tracking-normal">
              Advancing healthcare through AI and data science innovations at IISER Bhopal
            </p>
            <button 
              onClick={() => navigate('/research')}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Explore Our Research
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      {/* Research Focus Areas */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Research Focus Areas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedArea(index)}
              >
                <div className="text-blue-600 mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-gray-600 line-clamp-3">{area.description}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800">
                  Learn more →
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedArea !== null && (
          <FocusAreaModal
            isOpen={selectedArea !== null}
            onClose={() => setSelectedArea(null)}
            title={focusAreas[selectedArea].title}
            description={focusAreas[selectedArea].description}
            image={focusAreas[selectedArea].image}
          />
        )}
      </section>

        {/* Lab Video Section */}
        <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Inside Our Lab</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg mb-4">
            <iframe
              src="https://www.youtube.com/embed/ArjP3hiCtuQ"
              title="Lab Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <a 
            href="https://youtu.be/ArjP3hiCtuQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2"
          >
            Watch on YouTube
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </div>
  );
}
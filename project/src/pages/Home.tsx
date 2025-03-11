import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, BookOpen, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FocusAreaModal from '../components/FocusAreaModal';

const focusAreas = [
  {
    icon: <Brain size={32} />,
    title: "Automatic Tumor Contouring",
    description: "Head and Neck Cancer (HNC) is the most common cancer in India, with over 500,000 new cases worldwide annually. Radiation therapy is frequently recommended, but requires precise segmentation of tumors in CT scans. This process is labor-intensive and prone to inter-observer variability. We aim to develop a deep learning-based image segmentation framework for automatic tumor contouring to improve accuracy and efficiency in radiotherapy planning.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200"
  },
  {
    icon: <BookOpen size={32} />,
    title: "Biomedical Literature Mining",
    description: "Biomedical literature contains valuable domain-specific knowledge. Our research focuses on NLP techniques for automated information extraction, knowledge graph construction, and biomarker identification. We develop transformer-based models to analyze PubMed and other biomedical sources for efficient knowledge discovery.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200"
  },
  {
    icon: <Activity size={32} />,
    title: "Clinical Text Mining",
    description: "Clinical notes contain crucial information about patients, including diagnoses, medications, and treatment plans. We develop NLP frameworks for automated text mining from clinical reports to support early disease prediction, adverse event detection, and improved patient care. Our research also integrates image and text-based analysis for enhanced radiology diagnostics.",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?q=80&w=1200"
  }
];

export default function Home() {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black opacity-75"></div>
          <img 
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80"
            alt="Lab Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Biomedical Data Science Lab
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
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
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
            <video controls className="w-full">
              <source src="/videos/bds_lab_final.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
}
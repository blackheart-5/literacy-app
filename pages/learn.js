import Link from 'next/link';
import Home from './index';

import { useState, useEffect } from 'react';
import Flashcard from '../components/flashcard';

const getVocabulary = async (difficulty) => {
  const params = new URLSearchParams();
  if (difficulty) params.append('difficulty', difficulty);
  const response = await fetch(`/api/getVocabulary?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch vocabulary');
  }
  return response.json();
};

const LearnPage = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const vocab = await getVocabulary(difficulty);
        setVocabulary(vocab);
        console.log(vocab);
      } catch (err) {
        setError('Failed to fetch vocabulary. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVocabulary();
  }, [difficulty]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabulary.length);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    setCurrentIndex(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (vocabulary.length === 0) return <div>No vocabulary found for the selected difficulty.</div>;

  return (
    <body>
      <div>
        <div className="learn-header">
          <h1>Learn Vocabulary</h1> 
        </div>

        <div class='learn-nav'>
          <nav>
            <ul>
              <li>
                <button> <Link href="/learn">Home</Link> </button>
              </li>
              <li>
                <button><Link href="/Login">LogOut</Link> </button>
              </li>
              <li>
                <button><Link href="/settings">Settings</Link></button>
              </li>
            </ul>
          </nav>
        </div>

        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {vocabulary[currentIndex] && (
          <Flashcard
            word={vocabulary[currentIndex].word}
            translation={vocabulary[currentIndex].translation}
            image={vocabulary[currentIndex].image}
            audio={vocabulary[currentIndex].audio}
          />
        )}
        <button id='next_vocab' onClick={handleNext}>Next</button>
      </div>
    </body>
  );
};

export default LearnPage;
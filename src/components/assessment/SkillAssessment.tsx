import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, nextQuestion, calculateScore } from '../../store/slices/assessmentSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { RootState } from '../../store/store';

ChartJS.register(ArcElement, Tooltip, Legend);

const SkillAssessment: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, answers, score, isComplete } = 
    useSelector((state: RootState

    ) => state.assessment);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    dispatch(answerQuestion({ questionId: currentQuestion.id, answer }));
    if (currentQuestionIndex === questions.length - 1) {
      dispatch(calculateScore());
    } else {
      dispatch(nextQuestion());
    }
  };

  if (isComplete) {
    const chartData = {
      labels: ['Correct', 'Incorrect'],
      datasets: [
        {
          data: [score, 100 - score],
          backgroundColor: ['#4CAF50', '#f44336'],
        },
      ],
    };

    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
        <div className="w-64 mx-auto">
          <Pie data={chartData} />
        </div>
        <p className="mt-4 text-xl">Your score: {score}%</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Skill Assessment</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">{currentQuestion?.question}</p>
        <div className="space-y-2">
          {currentQuestion?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-3 rounded border hover:bg-blue-50"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { RootState } from '../../store/store';

ChartJS.register(ArcElement, Tooltip, Legend);

const AssessmentResult: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();

  const result = useSelector((state: RootState) =>
    state.assessment.results.find(r => r.id === resultId)
  );

  const assessment = useSelector((state: RootState) =>
    result ? state.assessment.assessments.find(a => a.id === result.assessmentId) : null
  );

  if (!result) return <div>Result not found</div>;
  if (!assessment) return <div>Assessment not found</div>;

  const totalQuestions = assessment.questions.length;
  const correctAnswers = Object.entries(result.answers).filter(
    ([questionId, answer]) => {
      const question = assessment.questions.find(q => q.id === questionId);
      return question?.correctAnswer === answer;
    }
  ).length;

  const answeredQuestions = Object.keys(result.answers).length;
  const incorrectAnswers = answeredQuestions - correctAnswers;
  const unansweredQuestions = totalQuestions - answeredQuestions;

  const pieData = {
    labels: ['Correct', 'Incorrect', 'Unanswered'],
    datasets: [
      {
        data: [correctAnswers, incorrectAnswers, unansweredQuestions],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Assessment Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-medium mb-4">Score Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="font-medium">{result.score.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`font-medium ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                {result.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Time Taken:</span>
              <span className="font-medium">
                {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-medium mb-4">Performance</h3>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Detailed Analysis</h3>
        {assessment.questions.map((question, index) => {
          const userAnswer = result.answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;

          return (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="mb-2">
                <span className="font-medium">Question {index + 1}:</span> {question.question}
              </div>
              <div className="mb-2">
                <span className="font-medium">Your Answer:</span> {userAnswer || 'No answer'}
              </div>
              <div className="mb-2">
                <span className="font-medium">Correct Answer:</span> {question.correctAnswer}
              </div>
              <div className={`mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Correct' : 'Incorrect'}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Explanation:</span> {question.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentResult;
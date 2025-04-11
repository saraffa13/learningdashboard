import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { 
  answerQuestion, 
  nextQuestion,
  previousQuestion, 
  submitAssessment,
  startAssessment,
  updateTimeRemaining, 
  fetchAssessments
} from '../../store/slices/assessmentSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { RootState } from '../../store/store';

ChartJS.register(ArcElement, Tooltip, Legend);

const SkillAssessment: React.FC = () => {
const dispatch = useAppDispatch();
const { 
  currentAssessment,
  currentQuestion: currentQuestionIndex,
  answers,
  isAssessmentActive,
  results,
  timeRemaining,
  assessments
} = useAppSelector((state: RootState) => state.assessment);

  useEffect(() => {
    dispatch(fetchAssessments());
  }, [dispatch]);
    
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isAssessmentActive && timeRemaining > 0) {
      timer = setInterval(() => {
        if (timeRemaining <= 1) {
          dispatch(submitAssessment());
        } else {
          dispatch(updateTimeRemaining(timeRemaining - 1));
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isAssessmentActive, timeRemaining, dispatch]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isAssessmentActive || !currentAssessment) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Available Assessments</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {assessments.map((assessment) => (
            <div 
              key={assessment.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{assessment.title}</h3>
              <p className="text-gray-600 mb-4">{assessment.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Time: {assessment.timeLimit} minutes</span>
                <span>Passing Score: {assessment.passingScore}%</span>
              </div>
              <button
                onClick={() => dispatch(startAssessment(assessment.id))}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 
                  transition-colors duration-200"
              >
                Start Assessment
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = currentAssessment.questions[currentQuestionIndex];
  const latestResult = results[results.length - 1];

  
  if (latestResult && latestResult.assessmentId === currentAssessment.id) {
    const chartData = {
      labels: ['Correct', 'Incorrect'],
      datasets: [
        {
          data: [latestResult.score, 100 - latestResult.score],
          backgroundColor: ['#4CAF50', '#f44336'],
          borderColor: ['#45a049', '#da190b'],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
        }
      }
    };

    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Assessment Complete!</h2>
        <div className="w-64 mx-auto">
          <Pie data={chartData} options={chartOptions} />
        </div>
        <div className="mt-4">
          <p className="text-xl mb-2">Your score: {latestResult.score}%</p>
          <p className="text-lg text-gray-600">
            Time taken: {formatTime(latestResult.timeTaken)}
          </p>
          <p className="text-lg mt-2">
            Status: {' '}
            <span className={`font-bold ${latestResult.passed ? 'text-green-500' : 'text-red-500'}`}>
              {latestResult.passed ? 'PASSED' : 'FAILED'}
            </span>
          </p>
        </div>
        <button
          onClick={() => window.location.reload()} 
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 
            transition-colors duration-200"
        >
          Take Another Assessment
        </button>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    dispatch(answerQuestion({ questionId: currentQuestion.id, answer }));
    
    if (currentQuestionIndex === currentAssessment.questions.length - 1) {
      dispatch(submitAssessment());
    } else {
      dispatch(nextQuestion());
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {currentAssessment.title}
          </h2>
          <div className={`text-lg font-semibold ${
            timeRemaining < 60 ? 'text-red-500 animate-pulse' : 'text-gray-700'
          }`}>
            Time Remaining: {formatTime(timeRemaining)}
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span>{currentQuestionIndex + 1} of {currentAssessment.questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ 
                width: `${((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-6">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded border transition-all duration-200
                ${answers[currentQuestion.id] === option 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'hover:bg-blue-50 hover:border-blue-200'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => dispatch(previousQuestion())}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50
            transition-colors duration-200"
        >
          Previous
        </button>
        {currentQuestionIndex === currentAssessment.questions.length - 1 ? (
          <button
            onClick={() => dispatch(submitAssessment())}
            className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600
              transition-colors duration-200"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => dispatch(nextQuestion())}
            className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600
              transition-colors duration-200"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillAssessment;
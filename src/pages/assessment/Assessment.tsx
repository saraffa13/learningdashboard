import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  answerQuestion,
  nextQuestion,
  previousQuestion,
  updateTimer,
  completeAssessment,
  startAssessment,
} from '../../store/slices/assessmentSlice';
import { RootState } from '../../store/store';

const Assessment: React.FC = () => {

  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    assessments,
    currentAssessment,
    currentQuestion,
    userAnswers,
    timeRemaining,
  } = useSelector((state: RootState) => state.assessment);

  useEffect(() => {
    if (assessmentId) {
      const assessment = assessments.find(a => a.id === assessmentId);
      if (assessment && !assessment.used) {
        dispatch(startAssessment(assessmentId));
      } else {
        navigate('/assessment');
      }
    }
  }, [assessmentId, assessments, dispatch, navigate]);

  useEffect(() => {
    if (currentAssessment && timeRemaining > 0) {
      const timer = setInterval(() => {
        dispatch(updateTimer());
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleComplete();
    }
  }, [dispatch, timeRemaining, currentAssessment]);

  const handleComplete = () => {
    if (!currentAssessment) return;

    const correctAnswers = currentAssessment.questions.filter(
      (q) => userAnswers[q.id] === q.correctAnswer
    ).length;

    const score = (correctAnswers / currentAssessment.questions.length) * 100;

    const result = {
      id: `result-${Date.now()}`,
      assessmentId: currentAssessment.id,
      userId: 'user1', 
      score,
      timeTaken: currentAssessment.timeLimit * 60 - timeRemaining,
      completedAt: new Date().toISOString(),
      answers: userAnswers,
      passed: score >= currentAssessment.passingScore,
    };

    dispatch(completeAssessment(result));
    navigate(`/assessment/result/${result.id}`);
  };

  const handleAnswer = (questionId: string, answer: string) => {
    dispatch(answerQuestion({ questionId, answer }));
  };

  if (!currentAssessment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading assessment...</div>
      </div>
    );
  }

  const question = currentAssessment.questions[currentQuestion];
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-purple-900">{currentAssessment.title}</h1>
          <p className="text-purple-600 mt-1">{currentAssessment.category}</p>
        </div>
        <div className="text-xl font-medium">
          <div className={`${timeRemaining < 60 ? 'text-red-600' : 'text-purple-700'}`}>
            Time: {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="w-full bg-purple-100 rounded-full h-2.5 mb-6">
        <div 
          className="bg-purple-600 h-2.5 rounded-full"
          style={{ width: `${((currentQuestion + 1) / currentAssessment.questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="mb-8">
        <div className="text-lg font-medium mb-4 text-purple-800">
          Question {currentQuestion + 1} of {currentAssessment.questions.length}
        </div>
        <div className="text-xl mb-6 text-purple-900">{question.question}</div>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 text-left rounded-lg border transition-all
                ${userAnswers[question.id] === option
                  ? 'bg-purple-100 border-purple-500 text-purple-900 shadow-md'
                  : 'hover:bg-purple-50 hover:border-purple-300 text-purple-800'
                }`}
              onClick={() => handleAnswer(question.id, option)}
            >
              <span className="font-medium mr-2 text-purple-700">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => dispatch(previousQuestion())}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-purple-100 text-purple-700 rounded-md disabled:opacity-50 hover:bg-purple-200 transition-colors"
        >
          Previous
        </button>
        
        <div className="text-purple-600">
          {Object.keys(userAnswers).length} of {currentAssessment.questions.length} answered
        </div>

        {currentQuestion === currentAssessment.questions.length - 1 ? (
          <button
            onClick={handleComplete}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={() => dispatch(nextQuestion())}
            className="px-6 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
          >
            Next
          </button>
        )}
      </div>

      {currentQuestion === currentAssessment.questions.length - 1 && 
       Object.keys(userAnswers).length < currentAssessment.questions.length && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-700">
            You have {currentAssessment.questions.length - Object.keys(userAnswers).length} unanswered questions. 
            Make sure to answer all questions before completing the assessment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Assessment;
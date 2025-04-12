import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const AssessmentList: React.FC = () => {
  const navigate = useNavigate();
  const assessments = useSelector((state: RootState) => state.assessment.assessments);

  const handleStartAssessment = (assessmentId: string) => {
    navigate(`/assessment/${assessmentId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {assessments.map((assessment) => (
        <div
          key={assessment.id}
          className="bg-white border border-purple-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-200"
        >
          <h2 className="text-2xl font-bold mb-2 text-purple-900">{assessment.title}</h2>
          <p className="text-gray-600 mb-4">{assessment.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-purple-600">Category:</span>
              <span className="font-medium text-purple-800">{assessment.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-600">Time Limit:</span>
              <span className="font-medium text-purple-800">{assessment.timeLimit} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-600">Passing Score:</span>
              <span className="font-medium text-purple-800">{assessment.passingScore}%</span>
            </div>
          </div>
          {assessment.used ? (
            <div className="mt-4">
              <p className="text-purple-600 font-medium">
                Completed - Score: {assessment.score}%
              </p>
            </div>
          ) : (
            <button
              onClick={() => handleStartAssessment(assessment.id)}
              className="mt-4 w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition-colors duration-300 transform hover:scale-[1.02]"
            >
              Start Assessment
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssessmentList;
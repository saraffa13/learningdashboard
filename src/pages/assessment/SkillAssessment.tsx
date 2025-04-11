import AssessmentList from "./AssessmentList";

const SkillAssessment = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Take an Assessment
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6">
        <AssessmentList />
      </main>
    </div>
  );
};

export default SkillAssessment;
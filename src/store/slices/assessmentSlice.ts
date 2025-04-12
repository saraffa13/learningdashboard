import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Assessment, AssessmentResult, mockAssessments } from '../../data/mockAssessment';

interface AssessmentState {
  assessments: Assessment[];
  currentAssessment: Assessment | null;
  results: AssessmentResult[];
  currentQuestion: number;
  userAnswers: Record<string, string>;
  timeRemaining: number;
}

const initialState: AssessmentState = {
  assessments: mockAssessments,
  currentAssessment: null,
  results: [],
  currentQuestion: 0,
  userAnswers: {},
  timeRemaining: 0,
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    startAssessment: (state, action: PayloadAction<string>) => {
      const assessment = state.assessments.find(a => a.id === action.payload);
      if (assessment) {
        state.currentAssessment = assessment;
        state.timeRemaining = assessment.timeLimit * 60;
        state.currentQuestion = 0;
        state.userAnswers = {};
      }
    },

    answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },

    nextQuestion: (state) => {
      if (state.currentAssessment) {
        state.currentQuestion = Math.min(
          state.currentQuestion + 1,
          state.currentAssessment.questions.length - 1
        );
      }
    },

    previousQuestion: (state) => {
      state.currentQuestion = Math.max(state.currentQuestion - 1, 0);
    },

    updateTimer: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },

    completeAssessment: (state, action: PayloadAction<AssessmentResult>) => {
      if (state.currentAssessment) {
        state.results.push(action.payload);
        state.currentAssessment.used = true;
        state.currentAssessment.score = action.payload.score;
        state.currentAssessment = null;
      }
    },
  },
});

export const {
  startAssessment,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  updateTimer,
  completeAssessment,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
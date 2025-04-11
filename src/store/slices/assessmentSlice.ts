import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  Assessment, 
  Question, 
  AssessmentResult,
  mockAssessments,
  mockResults 
} from '../../data/mockAssessment';

interface AssessmentState {
  assessments: Assessment[];
  currentAssessment: Assessment | null;
  currentQuestion: number;
  answers: Record<string, string>;
  timeRemaining: number;
  isAssessmentActive: boolean;
  results: AssessmentResult[];
  loading: boolean;
  error: string | null;
}

const initialState: AssessmentState = {
  assessments: [],
  currentAssessment: null,
  currentQuestion: 0,
  answers: {},
  timeRemaining: 0,
  isAssessmentActive: false,
  results: [],
  loading: false,
  error: null
};


export const fetchAssessments = createAsyncThunk<Assessment[]>(
  'assessment/fetchAssessments',
  async () => {   
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAssessments;
  }
);

export const fetchResults = createAsyncThunk<AssessmentResult[]>(
  'assessment/fetchResults',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockResults;
  }
);

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    startAssessment: (state, action: PayloadAction<string>) => {
      const assessment = state.assessments.find(a => a.id === action.payload);
      if (assessment) {
        state.currentAssessment = assessment;
        state.currentQuestion = 0;
        state.answers = {};
        state.timeRemaining = assessment.timeLimit * 60; 
        state.isAssessmentActive = true;
      }
    },
    answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    nextQuestion: (state) => {
      if (state.currentAssessment && state.currentQuestion < state.currentAssessment.questions.length - 1) {
        state.currentQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
    updateTimeRemaining: (state, action: PayloadAction<number>) => {
      state.timeRemaining = action.payload;
    },
    submitAssessment: (state) => {
      if (state.currentAssessment) {
        const result: AssessmentResult = {
          id: `result${Date.now()}`,
          assessmentId: state.currentAssessment.id,
          userId: 'user1', 
          score: calculateScore(state.currentAssessment, state.answers),
          timeTaken: state.currentAssessment.timeLimit * 60 - state.timeRemaining,
          completedAt: new Date().toISOString(),
          answers: state.answers,
          passed: false 
        };
        
        result.passed = result.score >= state.currentAssessment.passingScore;
        state.results.push(result);
        state.isAssessmentActive = false;
        state.currentAssessment = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = action.payload;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assessments';
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.results = action.payload;
      });
  }
});

const calculateScore = (assessment: Assessment, answers: Record<string, string>): number => {
  const totalQuestions = assessment.questions.length;
  const correctAnswers = assessment.questions.reduce((count, question) => {
    return answers[question.id] === question.correctAnswer ? count + 1 : count;
  }, 0);
  
  return Math.round((correctAnswers / totalQuestions) * 100);
};

export const {
  startAssessment,
  answerQuestion,
  nextQuestion,
  previousQuestion,
  updateTimeRemaining,
  submitAssessment
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
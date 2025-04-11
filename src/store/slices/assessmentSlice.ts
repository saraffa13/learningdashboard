import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface AssessmentState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
  score: number;
  isComplete: boolean;
}

const initialState: AssessmentState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  score: 0,
  isComplete: false,
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    answerQuestion: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    calculateScore: (state) => {
      let correct = 0;
      state.questions.forEach(question => {
        if (state.answers[question.id] === question.correctAnswer) {
          correct += 1;
        }
      });
      state.score = (correct / state.questions.length) * 100;
      state.isComplete = true;
    },
  },
});

export const { setQuestions, answerQuestion, nextQuestion, calculateScore } = assessmentSlice.actions;
export default assessmentSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem, mockContent } from '../../data/mockData';

interface ContentState {
  items: ContentItem[];
  filteredItems: ContentItem[];
  viewMode: 'card' | 'list';
  loading: boolean;
  error: string | null;
  selectedCategories: string[];
}

const initialState: ContentState = {
  items: [],
  filteredItems: [],
  viewMode: 'card',
  loading: false,
  error: null,
  selectedCategories: [],
};

export const fetchContent = createAsyncThunk<ContentItem[]>(
  'content/fetchContent',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockContent;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'card' ? 'list' : 'card';
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
      state.filteredItems = state.items.filter(item => 
        state.selectedCategories.length === 0 || 
        state.selectedCategories.includes(item.category)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      });
  },
});

export const { toggleViewMode, setSelectedCategories } = contentSlice.actions;
export default contentSlice.reducer;
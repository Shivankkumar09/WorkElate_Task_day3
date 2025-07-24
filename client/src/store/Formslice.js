import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  id: uuidv4(),
  name: '',
  description: '',
  fields: [],
  currentStep: 0,
  stepCount: 1,
   showJsonSchema: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormName: (state, action) => {
      state.name = action.payload;
    },
    setFormDescription: (state, action) => {
      state.description = action.payload;
    },
    addField: (state, action) => {
      const fieldWithStep = { ...action.payload, step: state.currentStep };
      state.fields.push(fieldWithStep);
    },
    updateField: (state, action) => {
      const idx = state.fields.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) state.fields[idx] = action.payload;
    },
    removeField: (state, action) => {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    reorderFields: (state, action) => {
      state.fields = action.payload;
    },
  
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setStepCount: (state, action) => {
      state.stepCount = action.payload;
    },
    resetForm: (state) => {
      state.id = uuidv4();
      state.name = '';
      state.description = '';
      state.fields = [];
      state.currentStep = 0;
      state.stepCount = 1;
    },
    loadTemplate: (state, action) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.fields = action.payload.fields.map(f => ({
        ...f,
        id: uuidv4(),
        step: f.step ?? 0,
      }));
      state.currentStep = 0;
      state.stepCount = 1;
    },
    toggleJsonSchema: (state) => {
      state.showJsonSchema = !state.showJsonSchema;
    }
  },
});

export const {
  setFormName,
  setFormDescription,
  addField,
  updateField,
  removeField,
  reorderFields,
  toggleTheme,
  setCurrentStep,
  setStepCount,
  resetForm,
  loadTemplate,
  toggleJsonSchema,
} = formSlice.actions;

export default formSlice.reducer;

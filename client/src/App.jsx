
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormBuilder from './pages/FormBuilder';
import PreviewForm from './pages/Preview.$id';
import FormSubmitted from './pages/formSubmitted';
import FormSummary from './pages/FormSummary';

function App() {
  
  return (
   <><Router>
      <Routes>
        <Route path="/" element={<FormBuilder />} />
        <Route path="/preview/:id" element={<PreviewForm />} />
        <Route path="/formsubmitted" element={<FormSubmitted />} />
        <Route path="/summary/:formId" element={<FormSummary />} />
      </Routes>
    </Router>
   </>
  )
}

export default App

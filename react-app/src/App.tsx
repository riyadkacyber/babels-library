import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './routes/index';
import { AboutPage } from './routes/about';
import { BooksRoutes } from './routes/books';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* books routes */}
          <Route path="/*" element={<BooksRoutes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

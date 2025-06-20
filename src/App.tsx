import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <QRCodeGenerator />
      </main>
    </div>
  );
}

export default App;
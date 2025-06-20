import React from 'react';
import { QrCode } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <QrCode className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QR Generator</h1>
            <p className="text-sm text-gray-600">Free QR Code Generator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
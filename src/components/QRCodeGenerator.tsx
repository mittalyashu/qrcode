import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Settings } from 'lucide-react';

interface QROptions {
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  width: number;
}

const QRCodeGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrDataURL, setQrDataURL] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  
  const [options, setOptions] = useState<QROptions>({
    errorCorrectionLevel: 'M',
    margin: 4,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    width: 256
  });

  const generateQRCode = async () => {
    if (!inputValue.trim()) {
      setQrDataURL('');
      return;
    }
    
    try {
      const dataURL = await QRCode.toDataURL(inputValue, options);
      setQrDataURL(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQRCode = () => {
    if (!qrDataURL) return;
    
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = qrDataURL;
    link.click();
  };

  useEffect(() => {
    const timeoutId = setTimeout(generateQRCode, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue, options]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Generate QR Code</h2>
        <p className="text-gray-600">Enter text or URL to create a QR code</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text or URL
            </label>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter text, URL, or any content..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>

          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Options</span>
          </button>

          {showOptions && (
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreground
                  </label>
                  <input
                    type="color"
                    value={options.color.dark}
                    onChange={(e) => setOptions({...options, color: {...options.color, dark: e.target.value}})}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background
                  </label>
                  <input
                    type="color"
                    value={options.color.light}
                    onChange={(e) => setOptions({...options, color: {...options.color, light: e.target.value}})}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size: {options.width}px
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  step="32"
                  value={options.width}
                  onChange={(e) => setOptions({...options, width: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Error Correction
                </label>
                <select
                  value={options.errorCorrectionLevel}
                  onChange={(e) => setOptions({...options, errorCorrectionLevel: e.target.value as any})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
            
            <div className="mb-6 flex justify-center">
              {qrDataURL ? (
                <img
                  src={qrDataURL}
                  alt="Generated QR Code"
                  className="border border-gray-200 rounded-lg"
                  style={{ maxWidth: '300px', height: 'auto' }}
                />
              ) : (
                <div className="w-64 h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Enter content to generate QR code</p>
                </div>
              )}
            </div>

            {qrDataURL && (
              <button
                onClick={downloadQRCode}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
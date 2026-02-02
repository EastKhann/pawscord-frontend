import React, { useState } from 'react';
import './OCRPanel.css';
import { FaImage, FaCopy, FaUpload, FaLanguage, FaCheckCircle } from 'react-icons/fa';

function OCRPanel({ apiBaseUrl, fetchWithAuth }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const extractText = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/ocr/extract/`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setExtractedText(data.text || '');
        setLanguage(data.language || 'Unknown');
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'OCR failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="ocr-panel">
      <div className="ocr-header">
        <h2><FaImage /> OCR - Image Text Extraction</h2>
      </div>

      {error && <div className="ocr-error">{error}</div>}

      <div className="ocr-upload">
        <label className="upload-area">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {preview ? (
            <img src={preview} alt="Preview" className="image-preview" />
          ) : (
            <div className="upload-placeholder">
              <FaUpload className="upload-icon" />
              <p>Click to upload image</p>
              <span>Supports JPG, PNG, GIF</span>
            </div>
          )}
        </label>

        {selectedFile && (
          <button
            className="extract-btn"
            onClick={extractText}
            disabled={loading}
          >
            {loading ? 'Extracting...' : 'Extract Text'}
          </button>
        )}
      </div>

      {extractedText && (
        <div className="ocr-result">
          <div className="result-header">
            <h3>Extracted Text</h3>
            <div className="result-actions">
              {language && (
                <span className="language-badge">
                  <FaLanguage /> {language}
                </span>
              )}
              <button
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={copyToClipboard}
              >
                {copied ? <FaCheckCircle /> : <FaCopy />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="extracted-text">{extractedText}</div>
        </div>
      )}
    </div>
  );
}

export default OCRPanel;

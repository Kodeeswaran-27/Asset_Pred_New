import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import { FaTrash } from 'react-icons/fa';
import './FileUpload.css';
import axios from 'axios';

const FileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleDrop = (acceptedFiles) => {
    console.log("Inside handledrop")
    setLoading(true);
    apiCall(acceptedFiles)
    setTimeout(() => { processFiles(acceptedFiles); setIsButtonDisabled(false) }, 20000);
  };

  async function apiCall(acceptedFiles) {
    console.log("inside apicall")
    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      const response = await axios.post('http://localhost:5000/train', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      sessionStorage.setItem('responseData', JSON.stringify(response.data));
      console.log('Response received successfully', response.data);
      return true;
    } catch (error) {
      console.error('Error uploading data:', error);
      return false;
    }
  }
  const handleBrowse = (event) => {
    setLoading(true);
    apiCall(event.target.files);
    setTimeout(() => { processFiles(event.target.files); }, 5000);
  };

  const processFiles = (files) => {
    files.forEach(async (file) => {
      if (
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'text/csv'
      ) {
        console.log("File name", file.name)
        setUploadedFiles(prevFiles => [...prevFiles, { name: file.name, id: uuidv4() }]);
        setLoading(false);
        setIsDragging(false);
      } else {
        alert('Invalid file type. Please upload a CSV or XLSX file.');
        setLoading(false);
      }
    });
  };

  const deleteFile = (id) => {
    setUploadedFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  function predict() {
    console.log("Button clicked");
    const responseData = JSON.parse(sessionStorage.getItem('responseData')) || [];
      navigate('/main/predictedData');
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  useDropzone({ onDrop: handleBrowse, noClick: true, noKeyboard: true });

  return (
      <div className={`upload ${uploadedFiles.length > 0 ? 'large' : 'small'}`}>
        <div className={`div1 ${uploadedFiles.length > 0 ? 'large' : 'small'}`}>
          <div className='div2'>
            <center><p className='p1'>Please upload the file for analysis</p>
              <label className='note'>Note:&nbsp;Kindly use the Sample Excel Template for better results in prediction
              &nbsp;
              <a className='remsty' href="/example.xlsx" download>Download</a></label>
              </center>
          </div>
          <div className='drop'
            {...getRootProps()}
            style={{ borderColor: isDragging ? 'blue' : '#cccccc' }}
          >
            <IoCloudUploadOutline className='icon' color="rgb(16, 100, 245)" />
            <p><b>Drop file or &nbsp;
              <label className='browse' htmlFor="browseInput"><u style={{color:"rgb(16, 100, 245)"}}>Browse</u></label>
              <input id="browseInput" type="file" {...getInputProps()} />
            </b></p>
            <span>Supported file formats: CSV, Excel</span>
          </div>
          {loading && (
            <div className="loading-indicator">Uploading and processing files...</div>
          )}
          {uploadedFiles.length > 0 && (
            <div className='uploaded'>
              <h3>Uploaded Files:</h3>
              <ul>
                {uploadedFiles.map((file) => (
                  <li key={file.id}>
                    <span>{file.name}</span>
                    <FaTrash color='red' className='trash' onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <button
              className={isButtonDisabled ? 'downloadButton-disabled' : 'downloadButton-enabled'}
              id='predict-button'
              disabled={isButtonDisabled}
              onClick={predict}
            >
              Predict
            </button>
          </div>
        </div>
      </div>
  );
};

export default FileUpload;
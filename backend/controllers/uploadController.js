// controllers/uploadController.js - FIXED VERSION
import multer from 'multer';
import XLSX from 'xlsx';
import File from '../models/File.js';
import fs from 'fs';
import path from 'path';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'data/';
    // Create data directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.originalname;
    cb(null, `${timestamp}-${originalName}`);
  }
});

// File filter to accept only Excel files
const fileFilter = (req, file, cb) => {
  console.log('File filter - checking file:', file.originalname, 'Type:', file.mimetype);
  
  const allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ];
  
  const allowedExtensions = ['.xlsx', '.xls'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Only Excel files (.xlsx, .xls) are allowed!'), false);
  }
};

// Configure multer with proper error handling
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Handle file upload with your existing logic
export const handleUpload = async (req, res) => {
  console.log('Upload request received');
  console.log('File:', req.file);
  console.log('Body:', req.body);

  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    // Save file info to database
    const fileRecord = await File.create({
      filename: req.file.filename,
      path: req.file.path
    });

    console.log('File saved to database:', fileRecord);

    // Parse Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log('Excel parsing successful, rows:', data.length);

    // Return success response
    res.json({ 
      success: true,
      message: 'File uploaded and processed successfully',
      file: fileRecord, 
      data: data,
      rowCount: data.length
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Delete uploaded file if database save fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to process file: ' + error.message 
    });
  }
};

// Error handling middleware for multer
export const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  if (error.message === 'Only Excel files (.xlsx, .xls) are allowed!') {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  next(error);
};
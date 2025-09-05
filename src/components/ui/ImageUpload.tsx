import React, { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  id: string;
  label: string;
  onFileChange: (file: File | null) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ id, label, onFileChange, error }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onFileChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onFileChange(null);
    }
  }, [onFileChange]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    handleFile(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();

  const baseBorder = 'border-2 border-dashed rounded-lg';
  const normalBorder = 'border-neutral-300 dark:border-neutral-700';
  const errorBorder = 'border-danger';
  const dragBorder = 'border-primary';

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-300 mb-1">
        {label}
      </label>
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-auto max-h-64 object-contain rounded-lg border dark:border-neutral-700" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-75"
            aria-label="Remove image"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={`
            ${baseBorder}
            ${error ? errorBorder : (isDragging ? dragBorder : normalBorder)}
            flex justify-center items-center w-full h-48 px-4 text-center cursor-pointer transition-colors
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="text-neutral-600 dark:text-neutral-400">
            <i className="bi bi-upload text-3xl"></i>
            <p className="mt-2">Drag & drop an image here, or <span className="text-primary font-semibold" onClick={triggerFileSelect}>browse</span></p>
            <p className="text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
            <input
              type="file"
              id={id}
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </label>
      )}
       {error && (
        <p className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
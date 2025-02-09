import * as React from 'react';
import { useRef, useState } from 'react';

interface FileInputProps {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({name, label, onGetFile}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onGetFile(e);
  };

  return (
    <div className="mb-4">
      <input
        className="hidden"
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />

      <div className="flex items-center space-x-2">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-pointer"
          value={fileName}
          placeholder={label}
          onClick={activateInput}
          disabled
        />
        <button
          type="button"
          onClick={activateInput}
          className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Add Photo
        </button>
      </div>
    </div>

  );
};

export default FileInput;
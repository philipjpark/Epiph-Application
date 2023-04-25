// import React, { useState } from 'react';
// import { supabase } from '../client';
// import './FileUpload.css';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     setFileName(event.target.files[0].name);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     const { data, error } = await supabase.storage.from('uploads').upload(file.name, file);

//     if (error) {
//         setError(error.message);
//       } else {
//         console.log(data);
//         setError(null);
//     }
//   };
  

//   return (
//     <form className="file-upload" onSubmit={handleSubmit}>
//         <label className="file-upload-label">🗄️ Select an image 
//             <input type="file" className="file-upload-input" onChange={handleFileChange} />
//         </label>
//         <br />
//         <br />
//         <button type="submit" className="file-upload-btn">Upload Your Image</button><br/>
//         <span className="file-name">{fileName}</span>
//         {error && <div className="error">{error}</div>}
//     </form>
//   );
// };

// export default FileUpload;

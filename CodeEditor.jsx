// import React, { useState } from 'react';
// import { Controlled as CodeMirror } from 'react-codemirror2';

// function CodeEditor() {
//   const [code, setCode] = useState('');

//   const handleCodeChange = (editor, data, newCode) => {
//     setCode(newCode);
//   };

//   return (
//     <div>
//       <h2>Code Editor</h2>
//       <CodeMirror
//         value={code}
//         onBeforeChange={handleCodeChange}
//         options={{
//           mode: 'javascript',
//           theme: 'material',
//           lineNumbers: true,
//         }}
//       />
//       <div>
//         <h3>Code Output:</h3>
//         <pre>{code}</pre>
//       </div>
//     </div>
//   );
// }

// export default CodeEditor;

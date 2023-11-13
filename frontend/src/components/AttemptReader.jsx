import ReactAce from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript'; // import other modes as needed
import 'ace-builds/src-noconflict/theme-monokai';


// Displays a simple code editor that is read only
// Used for displaying the code of a past attempt

const AttemptReader = ({ code, language }) => {
  return (
    <ReactAce
      value={code}
      mode={language}
      theme="monokai"
      readOnly={true}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={false}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default AttemptReader;
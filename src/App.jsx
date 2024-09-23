// App.jsx
import './App.css';
import FunctionContextComponent from './FunctionContextComponents';
import ClassContextComponent from './ClassContextComponent';
import ThemeProvider from './ThemeContext'; // Correct import for ThemeProvider
// No need to import ThemeContext here unless required for specific use

export default function App() {
  return (
    <>
      <ThemeProvider>
        <FunctionContextComponent />
        {/* <ClassContextComponent /> */}
      </ThemeProvider>
    </>
  );
}

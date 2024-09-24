import './App.css';
import FunctionContextComponent from './FunctionContextComponents';
import ClassContextComponent from './ClassContextComponent';
import ThemeProvider from './ThemeContext';
import useLocalStorage from './useLocalStorage';
import useUpdateLogger from './useUpdateLogger';

export default function App() {
  const [formData, setFormData] = useLocalStorage('formData', {
    fullName: '',
    address: '',
    email: '',
    phone: ''
  });

  useUpdateLogger(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <h1>User Information</h1>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="name-input"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="name-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="name-input"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="name-input"
        />
        <h2>User Info:</h2>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
      </div>
    </ThemeProvider>
  );
}

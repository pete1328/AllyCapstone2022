import './App.css';
import { LoginButton } from './components/button';

function App() {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <p className="text-gray-500 text-lg pb-4">
        React, Material UI, and Tailwind CSS in action
      </p>
      <LoginButton/>
    </div>
  );
}

export default App;

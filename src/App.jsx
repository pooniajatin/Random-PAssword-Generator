import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("Password is okay");
  const [backgroundGradient, setBackgroundGradient] = useState('linear-gradient(45deg, #ffcc00, #ff9900)');

  // useRef hook
  const passwordRef = useRef(null);

  // Update the background gradient and password message based on length
  useEffect(() => {
    if (length < 8) {
      setPasswordMessage("Password is too short");
      setBackgroundGradient('linear-gradient(45deg, #ff0000, #ff6a00)'); // Red gradient
    } else if (length >= 8 && length <= 12) {
      setPasswordMessage("Password is okay");
      setBackgroundGradient('linear-gradient(45deg, #ffcc00, #ff9900)'); // Yellow gradient
    } else {
      setPasswordMessage("Password is strong");
      setBackgroundGradient('linear-gradient(45deg, #00b300, #006600)'); // Green gradient
    }
  }, [length]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      className="w-full max-w-lg mx-auto shadow-xl rounded-2xl px-8 py-6 my-12 text-white transition-all duration-1000 ease-in-out"
      style={{
        background: backgroundGradient,
        backgroundSize: '400% 400%',
        opacity :.6,
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 neon-accent">Password Generator</h1>

      <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 text-lg font-mono text-black bg-gray-100 rounded-l-md"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-200 ease-in-out transform hover:bg-blue-700"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 text-sm mb-4">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={6}
            max={20}  
            value={length}
            className="cursor-pointer w-full h-2 bg-gray-300 rounded-lg"
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label className="text-gray-300">Length: {length}</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => { setNumberAllowed((prev) => !prev); }}
            className="cursor-pointer"
          />
          <label htmlFor="numberInput" className="text-gray-300">Include Numbers</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => { setCharAllowed((prev) => !prev); }}
            className="cursor-pointer"
          />
          <label htmlFor="characterInput" className="text-gray-300">Include Symbols</label>
        </div>
      </div>

      <p className="text-center text-xl">{passwordMessage}</p>
    </div>
  );
}

export default App;

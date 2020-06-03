import React, { useState } from 'react';

const App: React.FC = () => {
  return <Input />;
};

const Input: React.FC = () => {
  const [url, setUrl] = useState(
    'Enter a Github Repo'
  );

  const handleChange = event => setUrl(event.target.value);

  return (
    <div>
      <h1>SWEGGG</h1>
      <input type="text" value={url} onChange={handleChange}/>
    </div>
  );
};

export default App;

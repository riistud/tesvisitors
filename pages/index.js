import { useEffect, useState } from 'react';

export default function Home() {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    fetch('/api/visit')
      .then(res => res.json())
      .then(data => setVisits(data.total));
  }, []);

  return (
    <main style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Visitor Test Page</h1>
      <p>Total Visitors: {visits !== null ? visits : 'Loading...'}</p>
    </main>
  );
    }

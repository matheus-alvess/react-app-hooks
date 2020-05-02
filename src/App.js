import React, { useState, useEffect } from 'react';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch(
        'https://api.github.com/users/matheus-alvess/repos'
      );
      const data = await response.json();
      setRepositories(data);
    })();
  }, []); // ComponentDidMount // será executada apenas uma unica vez.

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos.`;
  }, [repositories]); // ComponentDidUpdate // será executada quando o estado observado for atualizado.

  // useEffect(() => {
  //   const watchId = navigator.geolocation.watchPosition(handlePositionReceived);
  //   return () => navigator.geolocation.clearWatch(watchId); //ComponentWillUnmount
  // }, []); // ComponentWillunmount // será executada após o hook ser destruído

  function handleFavorite(id) {
    const newRepositories = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );
}

export default App;

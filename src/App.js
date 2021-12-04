import React, { useState } from "react";

const DisplayTable = ({ repositories }) => {
  return (
    <table className="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Repositórios</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
      {repositories.map( repo => (
        <tr>
          <td>
          </td>
          <td>
            <a href={repo.html_url} className="header" target="_blank">
              {repo.name}
            </a>            
          </td>
          <td>
            <a className="header" target="_blank">
              ★ {repo.stargazers_count}
            </a>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  );
};

const Profile = () => {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);

  const onChangeHandler = e => {
    setUsername(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    const profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await profile.json();

    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();
    console.log(repoJson);

    if (profileJson) {
      setRepositories(repoJson);
    }
  };
  return (
    <div class="container" style={{ padding: 10 }}>
      <div className="ui search">
        <div className="input-group mb-3" style={{ padding: 10 }}>
          <input className="form-control" placeholder="Digite um nome de usuário :)" type="text" value={username} onChange={onChangeHandler}/>
          <div><button className="btn btn-outline-secondary" type="submit" onClick={submitHandler}>Pesquisar</button></div>
        </div>
        <DisplayTable repositories={repositories} />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Profile/>
    </div>
  );
}
  
export default App;
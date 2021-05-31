const host = process.env.REACT_APP_API_HOST;

export async function getFavoriteComics(token, details = false) {
  const url = details ? `${host}/api/user/comics/details` : `${host}/api/user/comics`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const comics = await response.json();

  return comics;
}

export async function getFavoriteCharacters(token, details = false) {
  const url = details ? `${host}/api/user/characters/details` : `${host}/api/user/characters`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const characters = await response.json();

  return characters;
}

export async function setFavoriteComics(token, comics) {
  const response = await fetch(`${host}/api/user/comics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comics),
  });

  const favoriteComics = await response.json();
  return favoriteComics;
}

export async function setFavoriteCharacters(token, characters) {
  const response = await fetch(`${host}/api/user/characters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(characters),
  });

  const favoriteCharacters = await response.json();
  return favoriteCharacters;
}

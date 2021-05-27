export async function getFavoriteComics(token) {
  const response = await fetch('/api/user/comics', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const comics = await response.json();

  return comics;
}

export async function getFavoriteCharacters(token) {
  const response = await fetch('/api/user/characters', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const characters = await response.json();

  return characters;
}

export async function setFavoriteComics(token, comics) {
  const response = await fetch('/api/user/comics', {
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
  const response = await fetch('/api/user/characters', {
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

let myFavorites = [];

const postFav = (req, res) => {
  let favCharacter = req.body;
  myFavorites.push(favCharacter);

  res.status(201).json(myFavorites);
};

const deleteFav = (req, res) => {
  const id = parseInt(req.params.id);

  myFavorites = myFavorites.filter((character) => character.id !== id);

  res.status(200).json(myFavorites);
};

module.exports = { postFav, deleteFav };

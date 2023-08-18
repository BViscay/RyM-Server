const axios = require("axios");
const URL = "https://rickandmortyapi.com/api/character/";

const getCharById = (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      const { id, name, gender, species, origin, image, status } =
        response.data;
      const character = {
        id,
        name,
        gender,
        species,
        origin: origin.name,
        image,
        status,
      };
      res.status(200).json(character);
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        res.status(500).json({ message: "Not found" });
      } else {
        res.status(500).send(err.message);
      }
    });
};

module.exports = getCharById;

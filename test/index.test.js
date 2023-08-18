const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de Rutas", () => {
  it("Responde con status: 200", async () => {
    await agent.get("/rickandmorty/character/1").expect(200);
  });
  it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
    const response = await agent.get("/rickandmorty/character/1");

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("species");
    expect(response.body).toHaveProperty("gender");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("origin");
    expect(response.body).toHaveProperty("image");
  });
  it("Si hay un error responde con status: 500", async () => {
    await agent.get("/rickandmorty/character/999").expect(500);
  });
});

describe("GET /rickandmorty/login", () => {
  it("Responde con access: true para credenciales correctas", async () => {
    const response = await agent
      .get("/rickandmorty/login")
      .query({ email: "mail@gmail.com", password: "AAbb1234" })
      .expect(200);

    expect(response.body).toEqual({ access: true });
  });

  it("Responde con access: false para credenciales incorrectas", async () => {
    const response = await agent
      .get("/rickandmorty/login")
      .query({ email: "incorrect@example.com", password: "incorrectpassword" })
      .expect(200);

    expect(response.body).toEqual({ access: false });
  });
});

describe("POST /rickandmorty/fav", () => {
const character1 = {id:1, name: "Rick"}
const character2 = {id:2, name: "Morty"}
​it("Genera un nuevo favorito", async () => {
​    const response = await agent.post("/rickandmorty/fav").send(character1)
​
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toContainEqual(character1)
})
​
it("Devuelve todos los favoritos", async () => {
    const response = await agent.post("/rickandmorty/fav").send(character2)
    expect(response.body).toContainEqual(character1)
    expect(response.body).toContainEqual(character2)
})
​
})
​
describe("DELETE", () => {
    const character1 = {id:1, name: "Rick"}
    const character2 = {id:2, name: "Morty"}
​
    beforeEach(async () => {
        await agent.post("/rickandmorty/fav").send(character1)
        await agent.post("/rickandmorty/fav").send(character2)
    })
​
    it("que devuelva todo el arreglo sin modificar si el id es invalido", async () => {
        const {body} = await agent.delete("/rickandmorty/fav/5")
        expect(body).toContainEqual(character1)
        expect(body).toContainEqual(character2)
    })
​
    it("que devuelva el array sin el personaje eliminado", async () => {
        const {body} = await agent.delete("/rickandmorty/fav/1")
        expect(body).not.toContainEqual(character1)
        expect(body).toContainEqual(character2)
    })
})
​

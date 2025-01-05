import { expect } from "chai";
import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3001/api", // Remplacez par l'URL de votre serveur Express.js
// });
//
// let token: string;
// let user_id: number;
// let post_id: number;
// let follow_id: number;

describe("/ping", () => {
  it("should return pong", async () => {
    expect("pong").equal("pong");
  });
});
//
// describe("Create Quote Route", () => {
//   it("Devrait créer un nouvel utilisateur avec les informations fournies", async () => {
//     const userPayload = {
//       firstName: "Mathis",
//       lastName: "Brouard",
//       password: "0000",
//       email: "mathisbrouard@test.com",
//       role: 1,
//     };
//
//     const response = await api.post("/user", userPayload);
//
//     expect(response.status).to.equal(200);
//     expect(response.data).to.have.property("id");
//     expect(response.data.firstName).to.equal(userPayload.firstName);
//
//     user_id = response.data.id;
//   });
// });

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: 'http://localhost:3001/api', // Remplacez par l'URL de votre serveur Express.js
});
let token;
let user_id;
let post_id;
let follow_id;
describe('/ping', () => {
    it('should return pong', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, chai_1.expect)('pong').equal('pong');
    }));
});
describe('Create User Route', () => {
    it('Devrait créer un nouvel utilisateur avec les informations fournies', () => __awaiter(void 0, void 0, void 0, function* () {
        const userPayload = {
            "firstName": "Mathis",
            "lastName": "Brouard",
            "password": "0000",
            "email": "mathisbrouard@test.com",
            "role": 1
        };
        const response = yield api.post('/user', userPayload);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('id');
        (0, chai_1.expect)(response.data.firstName).to.equal(userPayload.firstName);
        user_id = response.data.id;
    }));
});
describe('Login Route', () => {
    it('Devrait retourner un token JWT valide', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginPayload = {
            email: 'mathisbrouard@test.com',
            password: '0000',
        };
        const response = yield api.post('/login', loginPayload);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('token');
        token = response.data.token;
        user_id = response.data.user.id;
    }));
});
describe('Get Posts Route', () => {
    it('Devrait retourner une liste de posts', () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = yield api.get('/posts');
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('posts');
    }));
});
describe('Create User Post', () => {
    it('Devrait créer un post pour l\'utilisateur connecté', () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            title: 'Test Post',
            description: 'This is a test post',
        }));
        const response = yield api.post('/post', formData);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('id');
        post_id = response.data.id;
    }));
});
describe('Update User Post', () => {
    it('Devrait mettre à jour un post', () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            title: 'Updated Test Post',
            description: 'This is an updated test post',
        }));
        const response = yield api.patch(`/post/${post_id}`, formData);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('id');
    }));
});
describe('Follow User Post', () => {
    it('Devrait suivre un post', () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = yield api.post(`/post/${post_id}/follow`);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('id');
    }));
});
describe('Get Follow Requests', () => {
    it("Devrait retourner toutes les demande de follow de tous les posts", () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = yield api.get(`/post/follow`);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.lengthOf(1);
    }));
});
describe('Get Follow Requests by post id', () => {
    it("Devrait retourner toutes les demandes de follow d'un post", () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = yield api.get(`/post/follow?postId=${post_id}`);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.lengthOf(1);
        follow_id = response.data[0].id;
    }));
});
describe('Accept Follow Request', () => {
    it('Devrait accepter une demande de follow', () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = yield api.post(`/post/follow/${follow_id}/update?status=0`);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('message');
        (0, chai_1.expect)(response.data.message).to.equal('Follow request updated');
    }));
});
describe('Remove User Post', () => {
    it('Devrait supprimer un post', () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = yield api.delete(`/post/${post_id}`);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('message');
        (0, chai_1.expect)(response.data.message).to.equal('Post deactivated');
    }));
});
describe('Remove User Account', () => {
    it('Devrait supprimer un utilisateur', () => __awaiter(void 0, void 0, void 0, function* () {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        const response = yield api.delete(`/user/${user_id}`);
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.data).to.have.property('message');
        (0, chai_1.expect)(response.data.message).to.equal('User deleted');
    }));
});

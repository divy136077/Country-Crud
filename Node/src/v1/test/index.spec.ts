import * as request from "supertest";
import { expect } from 'chai';

const BASE_URL = 'http://localhost:3001/api/v1/';

// beforeEach( async () => { //Before each test we empty the database
//     await request(BASE_URL).get("module/truncate/acl");
//     expect(200);
// });


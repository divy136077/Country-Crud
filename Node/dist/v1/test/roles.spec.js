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
Object.defineProperty(exports, "__esModule", { value: true });
//Require the dev-dependencies
const request = require("supertest");
const BASE_URL = 'http://localhost:3001/api/v1/';
// const TOKEN = {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjEwYWFiNTllYzQ1ZDBiN2YyZTYiLCJlbWFpbGNvbmZpcm1lZCI6dHJ1ZSwic3RhdHVzIjoxLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwiZmlyc3RuYW1lIjoiZGVtbzEiLCJsYXN0bmFtZSI6Imxhc3QxIiwidXNlclR5cGVDb2RlIjoxLCJpYXQiOjE2Mjk0Mzc0NjR9.XOGmb48mQtQQlSk374JFF2jNs_s5OmRgV7KuCa9XbL4'}
describe("Roles APIs", () => {
    describe("ADD Roles", () => {
        it('Requested URL not found', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('roles')
                .send({})
                .expect(404);
        }));
        it('Data should not be empty', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role')
                .send()
                .expect(400);
        }));
        let name_length_data = {
            name: "asdfghjklmnbvcxzasdfghjklpoiuytrewqasdfghjklmnbvcxfgffghg",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: 1
        };
        it('Name Field maximum lenght is 50', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role')
                .send(name_length_data)
                .expect(400);
        }));
        let name_empty_data = {
            name: " ",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: 1
        };
        it('Name must be required', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role')
                .send(name_empty_data)
                .expect(400);
        }));
        let rights_empty_data = {
            name: "asdfghjklmnbvcxzasdfghjklpoiuytrewqasdfghjklmnbvcx",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: "1"
        };
        it('Status must be int', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role')
                .send(rights_empty_data)
                .expect(400);
        }));
        let status_data = {
            name: "asdfghjklmnbvcxzasdfghjklpoiuytrewqasdfghjklmnbvcx",
            rights: "",
            status: 1
        };
        it('Please select rights(Rights must be required)', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role')
                .send(status_data)
                .expect(400);
        }));
        let name_exist = {
            name: "ADMIN new",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: 1
        };
        it('Role already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role')
                .send(name_exist)
                .expect(400);
        }));
        let role_data = {
            name: "Role created 1",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: 1
        };
        // it('Role created successfully....', async () => {
        //   return request(BASE_URL)
        //     .post('role')
        //     .send(
        //       role_data
        //     )
        //     .expect(201);  
        // });
    });
    describe("UPDATE Roles", () => {
        it('Requested URL not found', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('roles/7')
                .send({})
                .expect(404);
        }));
        let internal_error = {
            "name": "Project manager",
            "rights": "Leaves approval, atendenace approval",
            "is_active": 1,
            "modified_by": 12
        };
        it('Internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/6')
                .send(internal_error)
                .expect(500);
        }));
        it('Data should not be empty', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/6')
                .send()
                .expect(400);
        }));
        let name_length_data = {
            name: "asdfghjklmnbvcxzasdfghjklpoiuytrewqasdfghjklmnbvcxfgffghg",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: 1
        };
        it('Name Field maximum lenght is 50', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/7')
                .send(name_length_data)
                .expect(400);
        }));
        let name_empty_data = {
            name: " ",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: 1
        };
        it('Name must be required', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/7')
                .send(name_empty_data)
                .expect(400);
        }));
        let rights_empty_data = {
            name: "asdfghjklmnbvcxzasdfghjklpoiuytrewqasdfghjklmnbvcx",
            rights: "[{\"cms\":[\"cms/create\",\"cms/delete\",\"cms/dev\",\"cms/update\",\"cms/view\"],\"editor\":[\"editor/create\",\"editor/delete\",\"editor/update\",\"editor/view\"]}]",
            status: "1"
        };
        it('Status must be int', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/7')
                .send(rights_empty_data)
                .expect(400);
        }));
        let status_data = {
            name: "asdfghjklmnbvcxzasdfghjklpoiuytrewqasdfghjklmnbvcx",
            rights: "",
            status: 1
        };
        it('Please select rights(Rights must be required)', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/7')
                .send(status_data)
                .expect(400);
        }));
        let id_data = {
            name: "Test For duplicate id",
            rights: "",
            status: 1
        };
        it('Invalid requested ID', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/1059')
                .send(id_data)
                .expect(400);
        }));
        let update_data = {
            "name": "Project manager",
            "rights": "Leaves approval, atendenace approval",
            "status": 1
        };
        it('Data updated successfully.....', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .put('role/6')
                .send(update_data)
                .expect(200);
        }));
    });
    describe("VIEW Roles Data ", () => {
        it('Requested URL not found', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .get('roles/1')
                .send({})
                .expect(404);
        }));
        it('Id is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .get('role/' + 'Hello')
                .send({})
                .expect(400);
        }));
        it('Data get successfully....', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .get('role/1')
                .send({})
                .expect(200);
        }));
        it('Get all data successfully....', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/search')
                .send({})
                .expect(200);
        }));
        let search_data = {
            search: "role",
            status: 1
        };
        it('Data search with active and inactive status', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/search')
                .send(search_data)
                .expect(200);
        }));
        let error_data = {
            search: "role",
            status: 1
        };
        // it('Internal server error', async () => {
        //   return request(BASE_URL)
        //     .post('role/search')
        //     .send(       
        //       error_data
        //       )
        //     .expect(500);  
        // });
    });
    describe("DELETE Roles", () => {
        it('Requested URL not found', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .delete('roles/1')
                .send({})
                .expect(404);
        }));
        it('Invalid requested id', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .delete('role/5800')
                .send({})
                .expect(400);
        }));
        it('Record(s) already exists for users_test', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .delete('role/1')
                .send({})
                .expect(400);
        }));
        it('Data deleted successfully........', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .delete('role/5')
                .send({})
                .expect(200);
        }));
        it('URL not found for delete many', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('roles/delete-many')
                .send({})
                .expect(404);
        }));
        let empty_data = {
            ids: ''
        };
        it('Id required (empty field not allow)', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/delete-many')
                .send(empty_data)
                .expect(400);
        }));
        let dependant_data = {
            ids: '1'
        };
        it('Record(s) already exists for users_test:', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/delete-many')
                .send(dependant_data)
                .expect(400);
        }));
        let delete_data = {
            ids: "7,8"
        };
        it('Record(s) deleted successfully....', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/delete-many')
                .send(delete_data)
                .expect(200);
        }));
        let depend_or_not_data = {
            ids: "7,1"
        };
        it('Record(s) deleted successfully But Record(s) already exists for users_test:-', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/delete-many')
                .send(depend_or_not_data)
                .expect(200);
        }));
    });
    describe("Change Rights data status", () => {
        it('Requested URL not found', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('roles/toggle-status')
                .send({})
                .expect(404);
        }));
        //ids must be string int not allow
        let server_error_data = {
            ids: 6,
            action: "update",
            status: 0
        };
        it('Internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(server_error_data)
                .expect(500);
        }));
        //ids must be string int not allow
        let int_data = {
            ids: "6,7",
            action: "update",
            status: "0"
        };
        it('status must be an integer number', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(int_data)
                .expect(400);
        }));
        let not_empty = {};
        it('Data should not empty', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(not_empty)
                .expect(400);
        }));
        //ids must be string int not allow
        let id_string_data = {
            ids: 6,
            action: "update",
            status: "0"
        };
        it('Data should string int not allow', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(id_string_data)
                .expect(400);
        }));
        //ids must be string int not allow
        let id_not_empty = {
            ids: "",
            action: "update",
            status: 1
        };
        it('ids should not be empty', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(id_not_empty)
                .expect(400);
        }));
        //one record is dependant and one is not
        let dependant_data = {
            ids: "1,2",
            action: "update",
            status: 1
        };
        it('Status updated successfully But Record(s) already exists for users_test:-', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(dependant_data)
                .expect(200);
        }));
        let one_dependant_data = {
            ids: "1",
            action: "update",
            status: 1
        };
        it('Status not updated', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(one_dependant_data)
                .expect(400);
        }));
        let status_update = {
            ids: "6,7",
            action: "update",
            status: 0
        };
        it('Status updated successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(BASE_URL)
                .post('role/toggle-status')
                .send(status_update)
                .expect(200);
        }));
    });
});
//# sourceMappingURL=roles.spec.js.map
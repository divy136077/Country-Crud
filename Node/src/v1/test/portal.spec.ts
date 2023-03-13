//Require the dev-dependencies
import * as request from "supertest";
import { expect } from 'chai';

const BASE_URL = 'http://localhost:3001/api/v1/';
// const TOKEN = {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjEwYWFiNTllYzQ1ZDBiN2YyZTYiLCJlbWFpbGNvbmZpcm1lZCI6dHJ1ZSwic3RhdHVzIjoxLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwiZmlyc3RuYW1lIjoiZGVtbzEiLCJsYXN0bmFtZSI6Imxhc3QxIiwidXNlclR5cGVDb2RlIjoxLCJpYXQiOjE2Mjk0Mzc0NjR9.XOGmb48mQtQQlSk374JFF2jNs_s5OmRgV7KuCa9XbL4'}

describe("Portal APIs", () => {

  describe("CREATE New Portal",  () => {    
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('portals/'+'cd')
        .send({        
        })
        .expect(404);  
    });

    let empty_data = {
        name: "", 
        url: "", 
        status: ''
    }
    it('Data should not be empty', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            empty_data
           )
          .expect(400);  
    });

    let name_data = {
        name: "", 
        url: "https://hello.corpnet.co.in/", 
        status: 1
    }
    it('Name should not be empty', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            name_data
           )
          .expect(400);  
    });
    let name_int_data = {
        name: 123, 
        url: "https://hello.corpnet.co.in/", 
        status: 1
    }
    it('Name must be in string', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            name_int_data
           )
          .expect(400);  
    });
    let portal_int_data = {
        name: "Hello 1", 
        url: "123456", 
        status: 1
    }
    it('Portal name must be string', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            portal_int_data
           )
          .expect(400);  
    });
    let portal_empty_data = {
        name: "Hello 1", 
        url: "", 
        status: 1
    }
    it('Portal should not be empty', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            portal_empty_data
           )
          .expect(400);  
    });

    let status_int_data = {
        name: "Hello 1", 
        url: "https://hello.corpnet.co.in/", 
        status: "1"
    }
    it('Portal should not be empty', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            status_int_data
           )
          .expect(400);  
    });
    let exist_data = {
        name: "Hello", 
        url: "https://hello.corpnet.co.in/", 
        status: 1
    }
    it('Portal already exists', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            exist_data
           )
          .expect(400);  
    });
    let portal_exist_data = {
        name: "Hello New", 
        url: "https://hello.corpnet.co.in/", 
        status: 1
    }
    it('Poratl URL already exist', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            portal_exist_data
           )
          .expect(400);  
    });
    let data = {
        name: "HDFS", 
        url: "https://hdfs.corpnet.co.in/", 
        status: 1
    }
    it('Record created successfully......', async () => {
        return request(BASE_URL)
          .post('portals/')
          .send(
            data
           )
          .expect(201);  
    });
  });
  
  describe("UPDATE Portal",  () => {

    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .put('portal/8')
        .send({        
        })
        .expect(404);  
    });

    let name_int_data = {
      name: 123, 
      url: "https://hello.corpnet.co.in/", 
      owner : "138", 
      status: 1
    }
    it('Portal name must be a string', async () => {
        return request(BASE_URL)
          .put('portals/3')
          .send(
            name_int_data
           )
          .expect(400);  
    });
    let url_data = {
        name: "HDFS", 
        url: "", 
        owner: "138", 
        status: 1
    }
    it('URL should not be empty', async () => {
        return request(BASE_URL)
          .put('portals/8')
          .send(
            url_data           
        )
        .expect(400);  
    });
    let status_data = {
        name: "HDFS", 
        url: "https://hdfs.corpnet.co.in/", 
        owner: "138", 
        status: "yes1"
    }
    it('status must be an integer number', async () => {
        return request(BASE_URL)
          .put('portals/3')
          .send(
            status_data           
        )
        .expect(400);  
    });

    let invalid_data = {
        name: "HDFS", 
        url: "https://hdfs.corpnet.co.in/", 
        owner: "138", 
        status: 1
    }
    it('Record(s) not updated/Invalid Id', async () => {
        return request(BASE_URL)
          .put('portals/686')
          .send(
            invalid_data           
        )
        .expect(400);  
    });

    let portal_exist_data = {
        name: "HDFS new one", 
        url: "https://hdfs.corpnet.co.in/", 
        owner: "138", 
        status: 1
    }
    it('Portal already exists(Name)', async () => {
        return request(BASE_URL)
          .put('portals/3')
          .send(
            portal_exist_data           
        )
        .expect(400);  
    });

    let portal_url_exist_data = {
        name: "HDFS new one", 
        url: "https://hdfs.corpnet.co.in/", 
        owner: "138", 
        status: 1
    }
    it('Portal already exists(URL)', async () => {
        return request(BASE_URL)
          .put('portals/3')
          .send(
            portal_url_exist_data           
        )
        .expect(400);  
    });

    let data = {
        name: "HDFS new one1", 
        url: "https://hdfsnewone.corpnet.co.in/", 
        status: 1
    }
    it('Record(s) updated successfully...', async () => {
        return request(BASE_URL)
          .put('portals/3')
          .send(
            data
           )
          .expect(200);  
    });
            
  });
  
  describe("VIEW Portal Data ",  () => {
    it('Requested URL not found', async () => {
        return request(BASE_URL)
          .post('portal/search')
          .send({        
          })
          .expect(404);  
    });
    it('Retrive all data successfully.....', async () => {
        return request(BASE_URL)
          .post('portals/search')
          .send({        
          })
          .expect(200);  
    });
    it('Retrive specific data successfully.....', async () => {
        return request(BASE_URL)
          .get('portals/8')
          .send({        
          })
          .expect(200);  
    });
    it('Id is invalid', async () => {
        return request(BASE_URL)
          .get('portals/h889')
          .send({        
          })
          .expect(400);  
    });
  });
 
  describe("DELETE Portal",  () => {
    it('Requested URL not found', async () => {
        return request(BASE_URL)
          .delete('portal/3')
          .send({        
          })
          .expect(404);  
    });
    it('Record(s) not deleted/Invalid id', async () => {
        return request(BASE_URL)
          .delete('portals/93')
          .send({        
          })
          .expect(400);  
    });
    it('Record deleted successfully..', async () => {
        return request(BASE_URL)
          .delete('portals/3')
          .send({        
          })
          .expect(200);  
    });
    it('Requested URL not found', async () => {
        return request(BASE_URL)
          .post('portal/delete-many')
          .send({        
          })
          .expect(404);  
    });
    let delete_data = 
    {
        "ids": "", 
        "value": 2, 
        "action": "delete"
    }
    it('Ids should not be empty', async () => {
        return request(BASE_URL)
          .post('portals/delete-many')
          .send(       
            delete_data
          )
          .expect(400);  
    });
    let int_data = 
    {
        "ids": 123, 
        "value": 2, 
        "action": "delete"
    }
    it('Ids must be string', async () => {
        return request(BASE_URL)
          .post('portals/delete-many')
          .send(       
            int_data
          )
          .expect(400);  
    });
    let data = 
    {
        "ids": "5,8", 
        "value": 2, 
        "action": "delete"
    }
    it('Record(s) deleted successfully', async () => {
        return request(BASE_URL)
          .post('portals/delete-many')
          .send(       
            data
          )
          .expect(200);  
    });
  });

  describe("Change Portal data status",  () => {
    it('Requested URL not found', async () => {
        return request(BASE_URL)
          .post('portal/toggle-status')
          .send({        
          })
          .expect(404);  
    });
    let ids_empty_data = {
        ids: "", 
        action: "update", 
        status: 1
    }
    it('ids should not be empty', async () => {
        return request(BASE_URL)
          .post('portals/toggle-status')
          .send(       
            ids_empty_data
          )
          .expect(400);  
    });
    let status_empty_data = {
        ids: "5,6", 
        action: "update", 
        status: ""
    }
    it('Status should not be empty', async () => {
        return request(BASE_URL)
          .post('portals/toggle-status')
          .send(       
            status_empty_data
          )
          .expect(400);  
    });
    let status_int_data = {
        ids: "5,6", 
        action: "update", 
        status: "1"
    }
    it('Status must be an integer number', async () => {
        return request(BASE_URL)
          .post('portals/toggle-status')
          .send(       
            status_int_data
          )
          .expect(400);  
    });
    let status_data = {
        ids: "7,5", 
        action: "update", 
        status: 1
    }
    it('Status updated successfully', async () => {
        return request(BASE_URL)
          .post('portals/toggle-status')
          .send(       
            status_data
          )
          .expect(200);  
    });
  });
}); 
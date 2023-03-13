//Require the dev-dependencies
import * as request from "supertest";
import { expect } from 'chai';

const BASE_URL = 'http://localhost:3001/api/v1/';
// const TOKEN = {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjEwYWFiNTllYzQ1ZDBiN2YyZTYiLCJlbWFpbGNvbmZpcm1lZCI6dHJ1ZSwic3RhdHVzIjoxLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwiZmlyc3RuYW1lIjoiZGVtbzEiLCJsYXN0bmFtZSI6Imxhc3QxIiwidXNlclR5cGVDb2RlIjoxLCJpYXQiOjE2Mjk0Mzc0NjR9.XOGmb48mQtQQlSk374JFF2jNs_s5OmRgV7KuCa9XbL4'}

describe("Rights APIs", () => {

  describe("ADD Rights",  () => {

    // it('Token not found', async () => {
    //   return request(BASE_URL)
    //     .post('rights')
    //     .send()
    //     .expect(401);  
    // });
    
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('rights'+'cd')
        .send({        
        })
        .expect(404);  
    });

    it('Data should not be empty', async () => {
      return request(BASE_URL)
        .post('rights')
        .send()
        .expect(400);  
    });

    let data = {
      "name": "Add new database",
      "module_id": 78,
      "status": 1,
      "created_by": 3
    } 
    
    let data3 ={
      "status" : 1,
      "remark" : null,
      "document_type" : "cf0c53e10fb4c47f4f4de7391298063f",
      "document_value" : "d6d892f92511adfb74f31ba0965a9806",
      "user" : {
          "userid" : "6255102eadca98209cdf3a5d",
          "userName" : "Shrushti Ponda"
      }
    }

    it('data should not be empty', async () => {
      return request(BASE_URL)
        .post('rights')
        .send({
          data3        
        })
        .expect(400);  
    });

    it('Rights Added sucessfully.....', async () => {
      return request(BASE_URL)
        .post('rights')
        .send(
          data      
        )
        .expect(201);  
    });
    let required_data = {
        "name": "", 
        "description": "Rights created", 
        "status": 0
    } 
    it('Name field required.....', async () => {
      return request(BASE_URL)
        .post('rights')
        .send(
          required_data      
        )
        .expect(400);  
    });

  });
  
  describe("UPDATE Rights",  () => {

    it('Rights not found', async () => {
      return request(BASE_URL)
        .put('rights'+'/50')
        .send()
        .expect(400);  
    });
    
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .patch('rights'+'up'+'/18')
        .send({        
        })
        .expect(404);  
    });
    it('Blank data not allow', async () => {
      return request(BASE_URL)
        .put('rights'+'/18')
        .send()
        .expect(400);  
    });
    let data3 = {
      "name": "data Updated",
      "module_id": 78,
      "status": 1
    }
    it('Rights data Updated', async () => {
      return request(BASE_URL)
        .put('rights'+'/18')
        .send(
          data3        
        )
        .expect(200);  
    });

    let required_data = {
      "name": "", 
      "description": "Rights created", 
      "status": 0
  } 
  it('Name field required', async () => {
      return request(BASE_URL)
        .put('rights'+'/18')
        .send(
          required_data        
        )
        .expect(400);  
    });

  });
  
  describe("VIEW Rights Data ",  () => {
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('rights/search'+'aa')
        .send({
        })
        .expect(404);  
    });

    // it('Internal Server Error', async () => {
    //   return request(BASE_URL)
    //     .get('right/2')
    //     // .set(TOKEN)
    //     .send({        
    //     })
    //     .expect(500);  
    // });

     it('Return Rights data for perticular event', async () => {
      return request(BASE_URL)
        .get('rights/2')
        .send({        
        })
        .expect(200);  
    });

    let data_view =
    {
      "page":1,
      "limit":2,
      "sortField": "name",
      "sortDir":"asc",
      "filters": {
        "search":"aa"    
      }
    }

    it('Return All rights data(only 10)', async () => {
      return request(BASE_URL)
        .post('rights'+'/search')
        .send(   
          data_view
        )
        .expect(200);  
    });
  });
 
  describe("DELETE Rights",  () => {
    //ig defined id status already delete
    it('Internal server error', async () => {
      return request(BASE_URL)
        .delete('rights/21')
        .send({        
        })
        .expect(500);  
    });

    it('Data deleted with specific id', async () => {
      return request(BASE_URL)
        .delete('rights/29')
        .send({        
        })
        .expect(200);  
    });

    it('Sent ID is invalid', async () => {
      return request(BASE_URL)
        .delete('rights/212')
        .send({        
        })
        .expect(400);  
    });
    
    let data = {
      "ids":"50,51",
      // "deleted":0
    };

    it('Delete multiple records', async () => {
      return request(BASE_URL)
        .post('rights/delete-many')
        .send(
          data
        )
        .expect(200);  
    });

    it('Delete multiple records if depend on role', async () => {
      return request(BASE_URL)
        .post('rights/delete-many')
        .send(
          data
        )
        .expect(400);  
    });
  });

  describe("Change Rights data status",  () => {
    let staus_data = {
      "ids":"18252",
      "status":0
    }
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('rights/toggle-status'+'aa')
        .send(
          staus_data
        )
        .expect(404);  
    });

    it('Update status Id not found', async () => {
      return request(BASE_URL)
        .post('rights/toggle-status')
        .send(
          staus_data
        )
        .expect(400);  
    });

    //if status already updated
    let error_update_data = {
      "ids":"52,58,60",
      "status":1
    }
    it('Internal server error', async () => {
      return request(BASE_URL)
        .post('rights/toggle-status')
        .send(
          error_update_data
        )
        .expect(500);  
    });
    let staus_update_data = {
      "ids":"61,5",
      "status":1
    }
    it('Status updated sucessfully....', async () => {
      return request(BASE_URL)
        .post('rights/toggle-status')
        .send(
          staus_update_data
        )
        .expect(200);  
    });
  });
}); 

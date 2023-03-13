//Require the dev-dependencies
import * as request from "supertest";
import { expect } from 'chai';

const BASE_URL = 'http://localhost:3001/api/v1/';
// const TOKEN = {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjEwYWFiNTllYzQ1ZDBiN2YyZTYiLCJlbWFpbGNvbmZpcm1lZCI6dHJ1ZSwic3RhdHVzIjoxLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwiZmlyc3RuYW1lIjoiZGVtbzEiLCJsYXN0bmFtZSI6Imxhc3QxIiwidXNlclR5cGVDb2RlIjoxLCJpYXQiOjE2Mjk0Mzc0NjR9.XOGmb48mQtQQlSk374JFF2jNs_s5OmRgV7KuCa9XbL4'}

describe("Module APIs", () => {

  describe("CREATE New Module",  () => {    
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('module/'+'cd')
        .send({        
        })
        .expect(404);  
    });

    let blank_data ={ 
      name: " ", 
      portal_id: "", 
      description: " ", 
      status: 0,
    }

    it('Data should not be empty', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          blank_data
        )
        .expect(400);  
    });

    let blank_name_data ={ 
        name: " ", 
        portal_id: "2",
        description: "Testing for name field ", 
        status: 0
    }
  
    it('Name should not be empty', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          blank_name_data
        )
        .expect(400);  
    });

    let status_int_data ={ 
        name: "Status check ", 
        portal_id: "2",
        description: "Testing for status must be int", 
        status: "0"
    }
  
    it('status must be int', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          status_int_data
        )
        .expect(400);  
    });
    
    let data3 ={
      name: 5555 ,
      portal_id: "2", 
      description: "It describe user rights", 
      status: 1
    }
    it('Please enter right data', async () => {
      return request(BASE_URL)
        .post('module/')
        .send({
          data3        
        })
        .expect(400);  
    });

    let portal_data = {
      name: "Rights", 
      portal_id: "",
      description: "It describe user rights", 
      status: 1
    }
    it('Poral id must be required', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          portal_data      
        )
        .expect(400);  
    });

    let number_portal_data = {
      name: "Rights", 
      portal_id: "hello",
      description: "It describe user rights", 
      status: 1
    }
    it('Portal id should not string', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          number_portal_data      
        )
        .expect(400);  
    });
    
    let exist_data = {
      name: "Rights", 
      portal_id: "2",
      description: "It describe user rights", 
      status: 1
    }
    it('Module name already exist', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          exist_data      
        )
        .expect(400);  
    });

    let data = {
      name: "Rights New",
      portal_id: "2", 
      description: "It describe user rights", 
      status: 1
    }
    it('Module added successfully.....', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          data      
        )
        .expect(201);  
    });
  });
  
  describe("UPDATE Module",  () => {

    it('Id not exist', async () => {
      return request(BASE_URL)
        .put('module'+'/501')
        .send()
        .expect(400);  
    });
    
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .patch('modules/18')
        .send({        
        })
        .expect(404);  
    });

    it('Required some data for update', async () => {
      return request(BASE_URL)
        .put('module'+'/18')
        .send()
        .expect(400);  
    });

    let blank_name_data ={ 
        name: " ", 
        portal_id: "2",
        description: "Testing for name field ", 
        status: 0
    }
  
    it('Name should not be empty', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          blank_name_data
        )
        .expect(400);  
    });

    let status_int_data ={ 
        name: "Status check ", 
        portal_id: "2",
        description: "Testing for status must be int", 
        status: "0"
    }
  
    it('status must be int', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          status_int_data
        )
        .expect(400);  
    });
    let portal_data = {
      name: "Rights", 
      portal_id: "",
      description: "It describe user rights", 
      status: 1
    }
    it('Poral id must be required', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          portal_data      
        )
        .expect(400);  
    });

    let number_portal_data = {
      name: "Rights", 
      portal_id: "hello",
      description: "It describe user rights", 
      status: 1
    }
    it('Portal id should not string', async () => {
      return request(BASE_URL)
        .post('module/')
        .send(
          number_portal_data      
        )
        .expect(400);  
    });

    let data3 = {
      name: "Email Template", 
      portal_id: "2",
      description: "Email Template use for", 
      status: 1
    }
    it('Module Exist(already use)', async () => {
      return request(BASE_URL)
        .put('module'+'/86')
        .send(
          data3
        )
        .expect(400);  
    });

    let update_data = {
      name: "My new module", 
      portal_id: "2",
      description: "Email Template use for", 
      status: 1
    }
    it('Module data Updated sucessfully ', async () => {
      return request(BASE_URL)
        .put('module'+'/18')
        .send(
          update_data        
        )
        .expect(200);  
    });
  });
  
  describe("VIEW Module Data ",  () => {
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('module/search'+'aa')
        .send({
        })
        .expect(404);  
    });

    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('modul/80')
        .send({
        })
        .expect(404);  
    });

  //   // it('Internal Server Error', async () => {
  //   //   return request(BASE_URL)
  //   //     .get('right/2')
  //   //     // .set(TOKEN)
  //   //     .send({        
  //   //     })
  //   //     .expect(500);  
  //   // });

    it('Return Module data for perticular event', async () => {
      return request(BASE_URL)
        .get('module/5')
        .send({        
        })
        .expect(200);  
    });

    it('If define id not avialable/Invalid Id', async () => {
      return request(BASE_URL)
        .get('module/hello')
        .send({        
        })
        .expect(400);  
    });

    let data_view =
    {
      allrecords: false,
      filters: {},
      limit: 10,
      locale: "en",
      page: 1,
      pagesize: 10,
      sortDir: "desc",
      sortField: "created_at"
    }

    it('Return All Module data(only 10)', async () => {
      return request(BASE_URL)
        .post('module/search')
        .send(   
          data_view
        )
        .expect(200);  
    });

    it('Return All Module data without limit', async () => {
      return request(BASE_URL)
        .post('module/search')
        .send({

         })
        .expect(200);  
    });
  });
 
  describe("DELETE Module",  () => {
    
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .delete('modul/18')
        .send({        
        })
        .expect(404);  
    });

    it('Sent ID is invalid', async () => {
      return request(BASE_URL)
        .delete('module/588')
        .send({        
        })
        .expect(400);  
    });

    it('Data not allow to deleted becouse module is used in rights and roles', async () => {
      return request(BASE_URL)
        .delete('module/1')
        .send({        
        })
        .expect(400);  
    });

    it('Data deleted with specific id', async () => {
      return request(BASE_URL)
        .delete('module/21')
        .send({        
        })
        .expect(200);  
    });
    
    let delete_data = {
      "action": "delete",
      "ids": "81,82,85",
      "value": 2
    };

    it('Delete multiple records', async () => {
      return request(BASE_URL)
        .post('module/delete-many')
        .send(
          delete_data
        )
        .expect(200);  
    });

    it('Note allow to delete becuase requested data is dependent', async () => {
      return request(BASE_URL)
        .post('rights/delete-many')
        .send(
          delete_data
        )
        .expect(400);  
    });
  });

  describe("Change Module data status",  () => {
    let staus_data = {
      "ids":"18252",
      "status":0
    }
    it('Requested URL not found', async () => {
      return request(BASE_URL)
        .post('module/toggle-status'+'aa')
        .send(
          staus_data
        )
        .expect(404);  
    });

    it('Update status Id not found', async () => {
      return request(BASE_URL)
        .post('module/toggle-status')
        .send(
          staus_data
        )
        .expect(400);  
    });

    let staus_update_data = {
      "ids":"30,31,32",
      "status":1
    }
    it('Status updated sucessfully....', async () => {
      return request(BASE_URL)
        .post('module/toggle-status')
        .send(
          staus_update_data
        )
        .expect(200);  
    });
    //Updated status failed(status already same)
    // let server_error_data = {
    //   "ids":"30,31,32",
    //   "status":1
    // }
    // it('Internal server error', async () => {
    //   return request(BASE_URL)
    //     .post('rights/toggle-status')
    //     .send(
    //       server_error_data
    //     )
    //     .expect(500);  
    // });

    it('Data not allow to update module status becouase it used in rights', async () => {
        return request(BASE_URL)
          .delete('rights/toggle-status')
          .send({        
          })
          .expect(400);  
      });
  });
}); 
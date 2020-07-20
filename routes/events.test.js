  
const request = require("supertest");

const server = require("../server");
const testUtils = require('../test-utils');

describe("/events", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB)

  describe("GET /:id", () => {
    it("should return 404 if no matching id", async () => {
      const res = await request(server).get("/events/id1");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('POST /', () => {
    it('should return a 400 without a provided name', async () => {
      const res = await request(server).post("/events/").send({});
      expect(res.statusCode).toEqual(400);    
    });
  });

  describe('GET /:id after multiple POST /', () => {
    let event1, event2;
    const mydate = new Date();

    beforeEach(async () => {
      event1 = (await request(server).post("/events").send({ name: 'event1', date: mydate })).body;
      event2 = (await request(server).post("/events").send({ name: 'event2', date: mydate })).body;
    });

    it('should return event1 using its id', async () => {
      const res = await request(server).get("/events/" + event1._id);
      expect(res.statusCode).toEqual(200);    
      const storedEvent = res.body;
      expect(storedEvent).toMatchObject({ 
        name: 'event1', date: mydate, 
        _id: event1._id 
      });
    });

    it('should return event2 using its id', async () => {
      const res = await request(server).get("/events/" + event2._id);
      expect(res.statusCode).toEqual(200);    
      const storedEvent = res.body;
      expect(storedEvent).toMatchObject({ 
        name: 'event2', date: mydate, 
        _id: event2._id 
      });
    });
  });

  describe('GET / after multiple POST /', () => {
    let event1, event2;
    const mydate = new Date();

    beforeEach(async () => {
      event1 = (await request(server).post("/events").send({  })).body;
      event2 = (await request(server).post("/events").send({ name: 'event2', date: mydate })).body;
    });

    it('should return all events', async () => {
      const res = await request(server).get("/events/");
      expect(res.statusCode).toEqual(200);    
      const storedEvents = res.body;
      expect(storedEvents).toMatchObject([event1, event2]);
    });
  });

  describe('PUT /:id after POST /', () => {
    let event1;
    const mydate = new Date();

    beforeEach(async () => {
      event1 = (await request(server).post("/events").send({ name: 'event1', date: mydate })).body;
    });

    it('should store and return event1 with new name', async () => {
      const res = await request(server)
        .put("/events/" + event1._id)
        .send({ name: 'new name' });
      expect(res.statusCode).toEqual(200);    

      const storedEvent = (await request(server).get("/events/" + event1._id)).body;
      expect(storedEvent).toMatchObject({ 
        name: 'new name', 
        _id: event1._id 
      });
    });
  });

  describe('DELETE /:id after POST /', () => {
    let event1;
    const mydate = new Date();

    beforeEach(async () => {
      event1 = (await request(server).post("/events").send({ name: 'event1', date: mydate })).body;
    });

    it('should delete and not return event1 on next GET', async () => {
      const res = await request(server).delete("/events/" + event1._id);
      expect(res.statusCode).toEqual(200);    
      const storedEventResponse = (await request(server).get("/events/" + event1._id));
      expect(storedEventResponse.status).toEqual(404);
    });
  });
});
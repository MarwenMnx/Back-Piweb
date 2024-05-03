import {
  post,
  get,
  getById,
  putById,
  deleteById,
} from '../controllers/airAlarmeController';

// Mocking the Mongoose model
jest.mock('../models/airAlarme');

// Mock console.error
console.error = jest.fn();

describe('AirAlarme Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('post', () => {
    it('should create a new alarme', async () => {
      const req = {
        body: {
          /* mock body data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const savedAirAlarme = {
        /* mock savedAirAlarme  data */
      };
      post(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'alarme created successfully',
        alarme: savedAirAlarme,
      });
    });

    
    it('should handle errors during alarme creation', async () => {
      const req = {
        body: {
          /* mock body data */
        },
      };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
  post(req, res);

      expect(console.error).toHaveBeenCalledWith('Error creating alarme:',error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({error: 'Failed to create alarme',});});
  });

  describe('get', () => {
    it('should retrieve all alarmes', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const airalarmes = [
        /* mock array of alarmes */
      ];
      get(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(airalarmes);
    });

    it('should handle errors during retrieval of alarmes', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      get(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error retrieving alarmes:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to retrieve alarmes',
      });
    });
  });

  describe('getById', () => {
    it('should retrieve an alarme by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const airalarmes = {
        /* mock alarme data */
      };
      getById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(airalarmes);
    });

    it('should handle errors during retrieval of an alarme by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      getById(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error retrieving alarme:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to retrieve alarme',
      });
    });

    it('should return 404 if alarme is not found by its ID', async () => {
      const req = { params: { id: 'nonExistentId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Alarme not found' });
    });
  });

  describe('putById', () => {
    it('should update an alarme by its ID', async () => {
      const req = {
        params: { id: 'mockId' },
        body: {
          /* mock updated alarme data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const updatedAirAlarme = {
        /* mock updated alarme data */
      };
      putById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Alarme updated successfully',
        alarme: updatedAirAlarme,
      });
    });

    it('should handle errors during update of an alarme by its ID', async () => {
      const req = {
        params: { id: 'mockId' },
        body: {
          /* mock updated alarme data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      putById(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error updating alarme:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to update alarme',
      });
    });

    it('should return 404 if alarme is not found for update by its ID', async () => {
      const req = {
        params: { id: 'nonExistentId' },
        body: {
          /* mock updated alarme data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      putById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Alarme not found' });
    });
  });

  describe('deleteById', () => {
    it('should delete an alarme by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const deletedAirAlarme = {
        /* mock deleted alarme data */
      };
      deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Alarme deleted successfully',
        alarme: deletedAirAlarme,
      });
    });

    it('should handle errors during deletion of an alarme by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      deleteById(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error deleting alarme:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to delete alarme',
      });
    });

    it('should return 404 if alarme is not found for deletion by its ID', async () => {
      const req = { params: { id: 'nonExistentId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Alarme not found' });
    });
  });
});

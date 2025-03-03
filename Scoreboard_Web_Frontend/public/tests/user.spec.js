import { authService } from '../src/auth.service.js';

//const authService = new AuthService();
//const users = new TestingList(authService);

describe('Testing for AuthService', () => {
    
    it('should initialize some HTML', () => {
        spyOn(users, 'init');
        users.init();

        expect(users)
        expect(users.init).toHaveBeenCalled();
    });
    
    it('should register a user', async () => {
        const user = {
            name: 'gadget',
            email: 'cool@toys.com',
            password: '1234',
        };

        const resp = await authService.register(user);
        expect(resp).toBeDefined();
        expect(resp.message).toBe('registration successful, redirecting to login page');
    });

    describe('Simple Test', () => {
        it('should be true', () => {
          expect(true).toBe(true);
        });
      });

});
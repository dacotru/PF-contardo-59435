import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthData } from '../../features/auth/models';
import { User } from '../../features/dashboard/users/models';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

const mockUser: User = {
  id: 'd639',
  firstName: 'Prueba',
  lastName: 'Usuario',
  email: 'prueba@mail.com',
  password: '123456',
  createdAt: new Date(),
  token: 'mockToken',
  role: 'User',
};

const mockAuthData: AuthData = {
  email: 'mockuser@mail.com',
  password: '123456',
};

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    });

    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  afterEach(() => {
    httpController.verify();
  });

  describe('Creación del servicio', () => {
    it('debería definir el servicio de autenticación', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('handleAuthentication', () => {
    it('debería establecer el usuario autenticado y almacenar el token en localStorage cuando el usuario existe', () => {
      const user = service['handleAuthentication']([mockUser]);
      expect(service.authUser$).toBeTruthy();
      expect(localStorage.getItem('token')).toEqual(mockUser.token);
      expect(user).toEqual(mockUser);
    });

    it('debería devolver null cuando no hay usuarios en la respuesta', () => {
      const user = service['handleAuthentication']([]);
      expect(service.authUser$).toBeTruthy();
      expect(localStorage.getItem('token')).toBeNull();
      expect(user).toBeNull();
    });
  });

  describe('Funcionalidad de login', () => {
    it('debería realizar login y almacenar el token en localStorage', (done) => {
      service.login(mockAuthData).subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
          expect(localStorage.getItem('token')).toEqual(mockUser.token);
          done();
        },
      });

      const req = httpController.expectOne(`${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`);
      req.flush([mockUser]);
    });

    it('debería devolver un error en caso de login con credenciales inválidas', (done) => {
      service.login(mockAuthData).subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe('Los datos son inválidos');
          done();
        },
      });

      const req = httpController.expectOne(`${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`);
      req.flush([], { status: 401, statusText: 'Unauthorized' });
    });

    it('debería lanzar un error cuando no se encuentra un usuario', (done) => {
      service.login(mockAuthData).subscribe({
        error: (err) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe('Los datos son inválidos');
          done();
        },
      });

      const req = httpController.expectOne(`${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`);
      req.flush([]);
    });
  });

  describe('Funcionalidad de logout', () => {
    it('debería eliminar el token de localStorage, desloguear al usuario y redirigir a /auth/login', (done) => {
      service.login(mockAuthData).subscribe();
      const req = httpController.expectOne(`${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`);
      req.flush([mockUser]);

      service.logout();
      expect(localStorage.getItem('token')).toBeNull();

      service.authUser$.subscribe({
        next: (user) => {
          expect(user).toBeNull();
          expect(router.navigate).toHaveBeenCalledWith(['auth', 'login']);
          done();
        },
      });
    });
  });

  describe('verifyToken', () => {
    it('debería devolver true si el token es válido y el usuario está autenticado', (done) => {
      localStorage.setItem('token', mockUser.token);

      service.verifyToken().subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeTrue();
        done();
      });

      const req = httpController.expectOne(`${service['baseURL']}/users?token=${mockUser.token}`);
      req.flush([mockUser]);
    });

    it('debería devolver false si el token es inválido y no se encuentra el usuario', (done) => {
      localStorage.setItem('token', 'token-invalido');

      service.verifyToken().subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBeFalse();
        done();
      });

      const req = httpController.expectOne(`${service['baseURL']}/users?token=token-invalido`);
      req.flush([]);
    });
  });
});

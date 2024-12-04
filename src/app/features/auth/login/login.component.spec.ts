import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { SharedModule } from '../../../shared/shared.module';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { User } from '../../../features/dashboard/users/models';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      providers: [
        provideHttpClientTesting(),
        MockProvider(AuthService, {
          login: () => of(),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('Creación del componente', () => {
    it('debería crear el componente de login', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Validaciones de formulario', () => {
    it('debería requerir que el email esté completo', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('');
      expect(emailControl?.hasError('required')).toBeTrue();
    });

    it('debería requerir un formato de email válido', () => {
      const emailControl = component.loginForm.get('email');
      emailControl?.setValue('correo-invalido');
      expect(emailControl?.hasError('email')).toBeTrue();
    });

    it('debería requerir que la contraseña esté completa', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('');
      expect(passwordControl?.hasError('required')).toBeTrue();
    });

    it('debería requerir que la contraseña tenga una longitud mínima', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl?.setValue('123');
      expect(passwordControl?.hasError('minlength')).toBeTrue();
    });
  });

  describe('Acciones de formulario', () => {
    it('debería marcar todos los campos como "touched" si el formulario es inválido al enviarse', () => {
      component.loginForm.setValue({
        email: '',
        password: '',
      });

      const markAllAsTouchedSpy = spyOn(component.loginForm, 'markAllAsTouched');
      component.onSubmit();
      expect(markAllAsTouchedSpy).toHaveBeenCalledTimes(1);
    });

    it('debería llamar al método "login" de AuthService al enviar un formulario válido', () => {
      component.loginForm.setValue({
        email: 'prueba@mail.com',
        password: '123456',
      });

      const userMock: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'prueba@mail.com',
        createdAt: new Date(),
        role: 'User',
        password: 'hashedPassword',
        token: 'mockToken'
      };

      const loginSpy = spyOn(authService, 'login').and.returnValue(of(userMock));
      const routerSpy = spyOn(router, 'navigate');
      component.onSubmit();

      expect(loginSpy).toHaveBeenCalledWith(component.loginForm.value);
      expect(routerSpy).toHaveBeenCalledWith(['dashboard', 'home']);
    });

    it('debería manejar un error de servidor al iniciar sesión', () => {
      component.loginForm.setValue({
        email: 'prueba@mail.com',
        password: '123456',
      });
    
      const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
      spyOn(authService, 'login').and.returnValue(throwError(() => errorResponse));
      const consoleSpy = spyOn(console, 'error');
      const alertSpy = spyOn(window, 'alert');
    
      component.doLogin();
    
      expect(consoleSpy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('Error del servidor: Http failure response for (unknown url): 500 Server Error');
    });
  });

  describe('Interacciones de usuario', () => {
    it('debería alternar el tipo de input del campo password entre "password" y "text"', () => {
      component.passwordInputType = 'password';
      component.togglePasswordInputType();
      expect(component.passwordInputType).toBe('text');
    
      component.togglePasswordInputType();
      expect(component.passwordInputType).toBe('password');
    });
  });

  describe('handleError', () => {
    it('debería mostrar un mensaje de error de conexión cuando el status es 0', () => {
      const error = new HttpErrorResponse({ status: 0, statusText: 'Unknown Error' });
      const alertSpy = spyOn(window, 'alert');
  
      component['handleError'](error);
  
      expect(alertSpy).toHaveBeenCalledWith('Error: No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    });
  
    it('debería mostrar un mensaje de credenciales incorrectas cuando el status es 401', () => {
      const error = new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' });
      const alertSpy = spyOn(window, 'alert');
  
      component['handleError'](error);
  
      expect(alertSpy).toHaveBeenCalledWith('Error: Credenciales incorrectas. Por favor, intenta nuevamente.');
    });
  
    it('debería mostrar un mensaje de error del servidor para otros códigos de error', () => {
      const error = new HttpErrorResponse({ status: 500, statusText: 'Server Error', error: 'Internal Server Error' });
      const alertSpy = spyOn(window, 'alert');
  
      component['handleError'](error);
  
      expect(alertSpy).toHaveBeenCalledWith('Error del servidor: Http failure response for (unknown url): 500 Server Error');
    });
  
    it('debería mostrar un mensaje de error genérico para errores no HTTP', () => {
      const error = new Error('Unexpected error');
      const alertSpy = spyOn(window, 'alert');
  
      component['handleError'](error);
  
      expect(alertSpy).toHaveBeenCalledWith('Error: Unexpected error');
    });
  
    it('debería mostrar un mensaje de error desconocido para errores de tipo desconocido', () => {
      const unknownError = { message: 'Unknown error' }; // Error que no es instancia de Error ni HttpErrorResponse
      const alertSpy = spyOn(window, 'alert');
  
      component['handleError'](unknownError);
  
      expect(alertSpy).toHaveBeenCalledWith('Ocurrió un error desconocido. Por favor, intenta nuevamente.');
    });
  });
});

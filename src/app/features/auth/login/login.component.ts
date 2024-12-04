import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordInputType: 'password' | 'text' = 'password';
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordInputType(): void {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
  }

  doLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert('Por favor, completa todos los campos obligatorios correctamente.');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['dashboard', 'home']),
      error: (err) => this.handleError(err),
    });
  }

  onSubmit(): void {
    this.doLogin();
  }

  private handleError(err: unknown): void {
    console.error('Error en el proceso de autenticación:', err);
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        alert('Error: No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else if (err.status === 401) {
        alert('Error: Credenciales incorrectas. Por favor, intenta nuevamente.');
      } else {
        alert(`Error del servidor: ${err.message}`);
      }
    } else if (err instanceof Error) {
      alert(`Error: ${err.message}`);
    } else {
      alert('Ocurrió un error desconocido. Por favor, intenta nuevamente.');
    }
  }
  
  
}

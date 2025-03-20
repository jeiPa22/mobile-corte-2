import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonicModule,
  AlertController,
  LoadingController,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const { email, password, confirmPassword } = this.registerForm.value;
      if (password !== confirmPassword) {
        this.showAlert('Las contraseñas no coinciden.');
        return;
      }

      const loading = await this.loadingCtrl.create({
        message: 'Creando cuenta...',
      });
      await loading.present();

      this.authService
        .register(email, password)
        .then(async () => {
          await loading.dismiss();
          this.showAlert('Registro exitoso. Ahora inicia sesión.');
          this.router.navigate(['/login']);
        })
        .catch(async (error) => {
          await loading.dismiss();
          this.showAlert(error.message);
        });
    } else {
      this.showAlert('Por favor completa todos los campos correctamente.');
    }
  }

  private async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Registro',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

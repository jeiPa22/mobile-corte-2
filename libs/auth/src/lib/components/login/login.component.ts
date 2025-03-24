import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthRootService } from '../../services/auth-root.service';

@Component({
  selector: 'lib-auth-login',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthRootService);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    const { email, password } = this.loginForm.value;
    try {
      await this.authService.login(email, password);
      const toast = await this.toastCtrl.create({
        message: '¡Inicio de sesión exitoso!',
        duration: 2000,
        color: 'success',
      });
      toast.present();
      this.loginForm.reset();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error al iniciar sesión. Verifica tus datos.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    } finally {
      loading.dismiss();
    }
  }

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(async () => {
        const toast = await this.toastCtrl.create({
          message: '¡Sesión iniciada con Google!',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      })
      .catch(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Error al iniciar sesión con Google.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      });
  }
}

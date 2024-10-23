import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { SignInComponent } from './signin.component';
import { SignUpComponent } from './signup.component';
import { ForgetPasswordComponent } from './forget-password.component';

describe('AuthComponent Tests', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login', 'register', 'forgetPassword']);

    await TestBed.configureTestingModule({
      declarations: [SignInComponent, SignUpComponent, ForgetPasswordComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: spy }]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  /**
   * Function to test SignIn functionality
   */
  function testSignIn(fixture: ComponentFixture<SignInComponent>) {
    let component = fixture.componentInstance;

    it('should call login when form is valid', () => {
      component.signInForm.controls['email'].setValue('test@example.com');
      component.signInForm.controls['password'].setValue('password123');

      authServiceSpy.login.and.returnValue(of({ token: 'fake-jwt-token' }));

      component.onSubmit();
      expect(authServiceSpy.login).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should show error on invalid login', () => {
      component.signInForm.controls['email'].setValue('test@example.com');
      component.signInForm.controls['password'].setValue('wrongpassword');

      authServiceSpy.login.and.returnValue(throwError({ status: 401 }));

      component.onSubmit();
      expect(component.errorMessage).toBe('Invalid credentials');
    });
  }

  /**
   * Function to test SignUp functionality
   */
  function testSignUp(fixture: ComponentFixture<SignUpComponent>) {
    let component = fixture.componentInstance;

    it('should call register when form is valid', () => {
      component.signUpForm.controls['email'].setValue('newuser@example.com');
      component.signUpForm.controls['password'].setValue('password123');
      component.signUpForm.controls['confirmPassword'].setValue('password123');

      authServiceSpy.register.and.returnValue(of({ message: 'Registration successful' }));

      component.onSubmit();
      expect(authServiceSpy.register).toHaveBeenCalledWith('newuser@example.com', 'password123');
    });

    it('should show error on failed registration', () => {
      component.signUpForm.controls['email'].setValue('newuser@example.com');
      component.signUpForm.controls['password'].setValue('password123');
      component.signUpForm.controls['confirmPassword'].setValue('password123');

      authServiceSpy.register.and.returnValue(throwError({ status: 400 }));

      component.onSubmit();
      expect(component.errorMessage).toBe('Registration failed. Please try again.');
    });
  }

  /**
   * Function to test ForgetPassword functionality
   */
  function testForgetPassword(fixture: ComponentFixture<ForgetPasswordComponent>) {
    let component = fixture.componentInstance;

    it('should call forgetPassword when form is valid', () => {
      component.forgetPasswordForm.controls['email'].setValue('user@example.com');

      authServiceSpy.forgetPassword.and.returnValue(of({ message: 'Password reset link sent' }));

      component.onSubmit();
      expect(authServiceSpy.forgetPassword).toHave
Écrire à Les babies

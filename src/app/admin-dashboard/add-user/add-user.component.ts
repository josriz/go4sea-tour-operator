// src/app/admin-dashboard/add-user/add-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;

  // Backend URL
  private apiUrl = 'https://go4sea-tour-operator.onrender.com/api/users';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['COLLABORATOR', Validators.required],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const newUser = this.userForm.value;

    this.http.post(this.apiUrl, newUser).subscribe({
      next: (res: any) => {
        alert(`Utente ${res.name || newUser.name} creato con successo!`);
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        console.error('Errore API:', err);
        alert('Errore nel creare l\'utente. Riprova.');
      }
    });
  }
}

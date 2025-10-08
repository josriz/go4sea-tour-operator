// src/app/admin-dashboard/add-user/add-user.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  description: string;
  clientName: string;
  flight: string;
  arrivalTime: string;
  hotel: string;
  operatorId: number;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newTask: Task = {
    description: '',
    clientName: '',
    flight: '',
    arrivalTime: '',
    hotel: '',
    operatorId: 1
  };

  addTask() {
    console.log('Task aggiunto:', this.newTask);
  }

  cancelTask() {
    this.newTask = {
      description: '',
      clientName: '',
      flight: '',
      arrivalTime: '',
      hotel: '',
      operatorId: 1
    };
  }
}

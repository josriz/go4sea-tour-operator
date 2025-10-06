import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  clientName: string;
  flight: string;
  arrivalTime: string;
  hotel: string;
  hotelAddress: string;
  operatorId: number;
  status: string;
}

interface Operator {
  id: number;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  showNewTaskForm = false;
  tasks: Task[] = [];
  operators: Operator[] = [
    { id: 1, name: 'Giuseppe Bianchi', phone: '3331234567' },
    { id: 2, name: 'Maria Rossi', phone: '3478765432' }
  ];

  newTask: Partial<Task> = {
    status: 'assigned'
  };

  openNewTask() {
    this.showNewTaskForm = true;
  }

  cancelTask() {
    this.showNewTaskForm = false;
    this.newTask = {};
  }

  createTask() {
    const task: Task = {
      id: Date.now(),
      clientName: this.newTask.clientName || '',
      flight: this.newTask.flight || '',
      arrivalTime: this.newTask.arrivalTime || '',
      hotel: this.newTask.hotel || '',
      hotelAddress: this.newTask.hotelAddress || '',
      operatorId: this.newTask.operatorId || 0,
      status: 'assigned'
    };

    this.tasks.push(task);
    this.showNewTaskForm = false;
    this.newTask = {};

    // Simula invio WhatsApp
    const operator = this.operators.find(o => o.id === task.operatorId);
    if (operator) {
      console.log(`WhatsApp inviato a ${operator.phone}: Nuovo incarico per ${task.clientName}, arrivo ${task.arrivalTime}`);
    }
  }

  getOperatorName(id: number): string {
    const op = this.operators.find(o => o.id === id);
    return op ? op.name : 'N/D';
  }
}

import { NotificationService } from './../service/notification.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent  {
  
  notifications: string[] = [];
  constructor(private notificationService:NotificationService) { 
    this.notificationService.notification$.subscribe(message => {
    this.showNotification(message);
  });}

  showNotification(message: string) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.textContent = message;
  
    // Ajoutez des classes de notification en fonction du type (success, error)
    if (message.includes('succès')) {
      notification.classList.add('notification', 'success');
    } else if (message.includes('erreur')) {
      notification.classList.add('notification', 'error');
    }
  
    notificationContainer?.appendChild(notification);
  
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);
  
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000); // Retirez la notification après 5 secondes
  }
}  
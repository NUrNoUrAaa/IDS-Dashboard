import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  // Theme toggle
  darkMode: boolean = false;

  // Notifications toggle
  notificationsEnabled: boolean = true;

  // Model options
  models = ['RandomForest', 'XGBoost', 'Deep Neural Network'];
  selectedModel: string = this.models[0];

  // Account info (دي مفترض هتيجي من الباك اند)
  account = {
    username: 'cyber_admin',
    email: 'admin@cyber-ids.com'
  };

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
  }

  saveSettings() {
    console.log('Saving settings...');
    console.log({
      theme: this.darkMode ? 'Dark' : 'Light',
      notifications: this.notificationsEnabled,
      model: this.selectedModel
    });
    alert('Settings saved successfully!');
  }
}
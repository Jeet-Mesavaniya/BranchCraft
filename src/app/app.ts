import { Component } from '@angular/core';
import { BranchNameToolComponent } from './branch-name-tool/branch-name-tool.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BranchNameToolComponent],
  template: `
    <header class="app-header">
      <h1>⚡ Generate Branch Name</h1>
    </header>

    <main>
      <app-branch-name-tool></app-branch-name-tool>
    </main>
  `,
  styleUrl: './app.css'
})
export class App {}

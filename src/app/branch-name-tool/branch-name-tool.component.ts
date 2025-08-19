import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-branch-name-tool',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './branch-name-tool.component.html',
  styleUrls: ['./branch-name-tool.component.css']
})
export class BranchNameToolComponent {
  // Defaults that most users will keep
  team = 'FX_PC';
  pi = 'PI2025Q3';
  sprint = '1';

  // Required by the user
  workItemText = '';

  branchName = '';
  copyMessage = '';

  generateBranch() {
    // if user cleared any defaults, block generation
    if (!this.team.trim() || !this.pi.trim() || !this.sprint.trim() || !this.workItemText.trim()) {
      this.branchName = '';
      return;
    }

    // Extract ID and title from "Bug 1315475: Some text ..."
    const match = this.workItemText.match(/(\d+):\s*(.*)/);
    const id = match ? match[1] : '';
    const title = match ? match[2] : this.workItemText;

    const cleanTitle = title
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .split(' ')
      .filter(w => w.length > 0)
      .slice(0, 7)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('_');

    this.branchName = `${this.team}_${this.pi}_${this.sprint}_${id}_${cleanTitle}`;
    this.copyMessage = ''; // reset inline toast
  }

  copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copyMessage = `✅ Copied${text.length > 40 ? ': ' + text.slice(0, 40) + '...' : ''}`;
      setTimeout(() => (this.copyMessage = ''), 3000);
    });
  }
}

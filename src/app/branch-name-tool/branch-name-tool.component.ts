import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-branch-name-tool',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './branch-name-tool.component.html',
  styleUrl: './branch-name-tool.component.css'
})
export class BranchNameToolComponent implements OnInit {
  team: string = 'PE';
  pi: string = 'PI2025Q3';
  sprint: string = '3';
  workItemText: string = '';
  branchName: string = '';
  copyMessage: string = '';
  wasTruncated: boolean = false;
  invalidInput: boolean = false;
  history: string[] = [];

  readonly maxLength = 80;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const savedTeam = localStorage.getItem('team');
      const savedPi = localStorage.getItem('pi');
      const savedSprint = localStorage.getItem('sprint');
  
      this.team = savedTeam ?? this.team;    // Use saved value if exists, otherwise default
      this.pi = savedPi ?? this.pi;
      this.sprint = savedSprint ?? this.sprint;
  
      const savedHistory = localStorage.getItem('branchHistory');
      if (savedHistory) {
        this.history = JSON.parse(savedHistory);
      }
    }
  }
  
  generateBranch(branchForm: NgForm) {
    this.wasTruncated = false;
    this.invalidInput = false;
  
    // Mark all fields as touched to trigger validations
    branchForm.control.markAllAsTouched();
  
    // ✅ Validate required fields
    if (!this.team || !this.pi || !this.sprint || !this.workItemText.trim()) {
      this.invalidInput = true;
      this.branchName = '';
      return;
    }
  
    // ✅ Save defaults
    if (typeof window !== 'undefined') {
      localStorage.setItem('team', this.team);
      localStorage.setItem('pi', this.pi);
      localStorage.setItem('sprint', this.sprint);
    }
  
    const regex = /(Bug|Req|CR)\s*(\d+):?\s*(.*)/i;
    const match = this.workItemText.match(regex);
  
    let id = '';
    let title = this.workItemText;
  
    if (match) {
      id = match[2];       // Only set ID if present
      title = match[3];    // Rest of text is title
    }
  
    // ✅ Clean and lowercase only the title part
    let cleanTitle = title
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .trim()
      .replace(/\s+/g, '_')
      .toLowerCase();
  
    // ✅ Build branch name without _xxxx_
    let fullName = `${this.team.toUpperCase()}_${this.pi.toUpperCase()}_${this.sprint}`;
    if (id) {
      fullName += `_${id}`;
    }
    fullName += `_${cleanTitle}`;
  
    // ✅ Truncate if exceeds maxLength
    if (fullName.length > this.maxLength) {
      const allowedTitleLength =
        this.maxLength -
        (this.team.length + this.pi.length + this.sprint.length + (id ? id.length + 1 : 0) + 3); // 3 underscores
  
      let truncated = cleanTitle.substring(0, allowedTitleLength);
  
      if (truncated.includes('_')) {
        truncated = truncated.substring(0, truncated.lastIndexOf('_'));
      }
  
      truncated = truncated.replace(/_+$/, '');
      fullName = `${this.team.toUpperCase()}_${this.pi.toUpperCase()}_${this.sprint}`;
      if (id) {
        fullName += `_${id}`;
      }
      fullName += `_${truncated}`;
      this.wasTruncated = true;
    }
  
    this.branchName = fullName.replace(/_+/g, '_');
  
    // ✅ Save history
    if (typeof window !== 'undefined') {
      this.history.unshift(this.branchName);
      this.history = this.history.slice(0, 5);
      localStorage.setItem('branchHistory', JSON.stringify(this.history));
    }
  }
  

  copy(text: string, msg: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copyMessage = msg;
        setTimeout(() => (this.copyMessage = ''), 2000);
      });
    }
  }
}

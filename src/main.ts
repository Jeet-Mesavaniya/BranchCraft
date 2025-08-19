import { bootstrapApplication } from '@angular/platform-browser';
import { BranchNameToolComponent } from './app/branch-name-tool/branch-name-tool.component';

bootstrapApplication(BranchNameToolComponent)
  .catch(err => console.error(err));

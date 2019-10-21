import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
  selector: 'app-processors-upload',
  templateUrl: './processors-upload.component.html',
  styleUrls: ['./processors-upload.component.css']
})
export class ProcessorsUploadComponent implements OnInit {
  @Output() addingProcessor = new EventEmitter<boolean>();

  constructor(private taskMgr: TaskManagerService) {}

  ngOnInit() {}

  uploadProcessor(nameInput: HTMLInputElement, filePathInput: HTMLInputElement) {
    // add processor to backend
    console.log(nameInput.value + ', ' + filePathInput.value);
    this.addingProcessor.emit(false);
  }

  cancel(): void {
    this.addingProcessor.emit(false);
  }
}

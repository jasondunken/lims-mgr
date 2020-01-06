import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { TaskManagerService } from "src/app/services/task-manager.service";

@Component({
  selector: "app-processors-upload",
  templateUrl: "./processors-upload.component.html",
  styleUrls: ["./processors-upload.component.css"]
})
export class ProcessorsUploadComponent implements OnInit {
  @Output() addingProcessor = new EventEmitter<boolean>();

  selectedFile: string;

  constructor(private taskMgr: TaskManagerService) {}

  ngOnInit() {}

  onSelectedFilesChanged($event) {
    this.selectedFile = "";
    for (const file of $event) {
      this.selectedFile = file.name;
    }
    console.log(this.selectedFile);
  }

  uploadProcessor(nameInput: HTMLInputElement) {
    // add processor to backend
    if (
      this.selectedFile !== null &&
      this.selectedFile !== undefined &&
      this.selectedFile !== ""
    ) {
      this.taskMgr.addProcessor(nameInput.value, this.selectedFile).subscribe();
      this.addingProcessor.emit(false);
    } else {
      console.log("No file selected");
    }
  }

  cancel(): void {
    this.addingProcessor.emit(false);
  }
}

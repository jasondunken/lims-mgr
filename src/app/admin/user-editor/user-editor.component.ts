import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
  @Output() editing = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}

  saveUser(): void {
    // add new user
  }

  cancel(): void {
    this.editing.emit(false);
  }
}

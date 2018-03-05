import { Component, ViewChild, ElementRef } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model = new go.GraphLinksModel([], []);

  @ViewChild('text')
  private textField: ElementRef;

  data: any;
  node: go.Node;

  showDetails(node: go.Node | null) {
    // this.node = node;
    // if (node) {
    //   // copy the editable properties into a separate Object
    //   this.data = {
    //     text: node.data.text,
    //     color: node.data.color
    //   };
    // } else {
    //   this.data = null;
    // }
  }

  onCommitDetails() {
    if (this.node) {
      const model = this.node.diagram.model;
      // copy the edited properties back into the node's model data,
      // all within a transaction
      model.startTransaction();
      model.setDataProperty(this.node.data, 'text', this.data.text);
      model.setDataProperty(this.node.data, 'color', this.data.color);
      model.commitTransaction('modified properties');
    }
  }

  onCancelChanges() {
    // wipe out anything the user may have entered
    this.showDetails(this.node);
  }

  onModelChanged(c: go.ChangedEvent) {
    // who knows what might have changed in the selected node and data?
    this.showDetails(this.node);
  }
}

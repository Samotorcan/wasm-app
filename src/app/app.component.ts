import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wasm-app';

  jsonInput = `
{
  "FirstName": "Filip",
  "LastName": "Samotorcan",
  // some comment that we want to remove
  "Company": {
    "CompanyName": "Agitavit Solutions"
  }
  /* other comment that we want to remove */
}`.trim();

  jsonOutput = '';

  removeComments() {
    this.handleError(() => {
      this.jsonOutput = window.dotnet.Wasm.Program.RemoveComments(this.jsonInput);
    });
  }

  parsePerson() {
    this.handleError(() => {
      this.jsonOutput = window.dotnet.Wasm.Program.ParsePerson(this.jsonInput);
    });
  }

  handleError(action: () => void) {
    try {
      action();
    }
    catch (error) {
      this.jsonOutput = (error as object)?.toString();
      throw error;
    }
  }
}

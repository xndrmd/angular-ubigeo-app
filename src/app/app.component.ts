import { Component, ViewChild, ElementRef } from '@angular/core';

import { Ubigeo } from './models/ubigeo';
import { ArchivoPlanoService } from './services/archivo-plano.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ubigeo File Parser';

  departamentos: Ubigeo[] = [];
  provincias: Ubigeo[] = [];
  distritos: Ubigeo[] = [];

  filename = '';

  @ViewChild('file')
  file: ElementRef;

  constructor(private planoService: ArchivoPlanoService) {}

  onFileChange($event: any): void {
    const file = $event.target.files[0];
    if (!file) {
      return;
    }

    this.filename = file.name;

    this.planoService.readFile(file).subscribe(
      x => {
        this.departamentos = x.filter(v => !v.padre);
        this.provincias = x.filter(v => v.padre && !v.padre.padre);
        this.distritos = x.filter(v => v.padre && v.padre.padre);
      },
      err => alert(err)
    );
  }

  onLimpiarClick(): void {
    this.filename = '';

    this.file.nativeElement.value = '';

    this.departamentos = [];
    this.provincias = [];
    this.distritos = [];
  }
}

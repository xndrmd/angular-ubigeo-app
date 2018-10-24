import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubigeo } from '../models/ubigeo';

@Injectable({
  providedIn: 'root'
})
export class ArchivoPlanoService {
  // solo funciona para un archivo y tiene que ser plano
  public readFile(file: File): Observable<Ubigeo[]> {
    return Observable.create(observer => {
      if (!file || file.type !== 'text/plain') {
        observer.error('El archivo no es valido');
      }

      const fr = new FileReader();
      fr.readAsText(file);

      fr.onload = () => {
        try {
          observer.next(this.parseResult(fr.result.toString()));
        } catch (error) {
          observer.error(error);
        }
      };

      fr.onerror = error => observer.error(error);
    });
  }

  private parseResult(result: string): Ubigeo[] {
    const lineas = result.split(/\r\n|\n/);
    return lineas.map(v => {
      return this.parseLine(v);
    });
  }

  private parseLine(line: string): Ubigeo {
    const ubigeo = line.trim().slice(1, -1).split('/');

    if (ubigeo.length !== 3) {
      throw new Error('No debe existir más de dos \'/\' por linea');
    }

    const deps = ubigeo[0].trim() ? ubigeo[0].trim().split(/\s(.+)/) : null;
    const provs = ubigeo[1].trim() ? ubigeo[1].trim().split(/\s(.+)/) : null;
    const dists = ubigeo[2].trim() ? ubigeo[2].trim().split(/\s(.+)/) : null;

    if (dists) {
      return this.parseArrays(dists, provs, deps);
    } else if (provs) {
      return this.parseArrays(provs, deps);
    } else {
      return this.parseArrays(deps);
    }
  }

  private parseArrays(nivel1: string[], nivel2?: string[], nivel3?: string[]): Ubigeo {
    if (!nivel1) {
      return null;
    }

    return {
      id: nivel1[0].trim(),
      nombre: nivel1[1].trim(),
      padre: this.parseArrays(nivel2, nivel3)
    };
  }
}

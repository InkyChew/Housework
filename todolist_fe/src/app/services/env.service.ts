import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor() { }

  get APIOption(): IAPIOption {
    return {
      work: `${environment.api.url}${environment.api.endpoint.work}`
    }
  }
}

interface IAPIOption {
  work: string
}
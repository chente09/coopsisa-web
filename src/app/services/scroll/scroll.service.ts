import { ElementRef, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private navbarHeight = 80; // Ajusta según la altura de tu navbar
  
  constructor(private router: Router) {
    // Suscribirse a eventos de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Desplazarse al inicio después de cada navegación
      window.scrollTo(0, 0);
    });
  }
  
  // Método para configurar la altura del navbar
  setNavbarHeight(height: number): void {
    this.navbarHeight = height;
  }
  
  // Método para hacer scroll a un elemento por ElementRef
  scrollToElement(element: ElementRef | HTMLElement): void {
    const targetElement = element instanceof ElementRef ? element.nativeElement : element;
    
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - this.navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  
  // Método para hacer scroll por ID
  scrollToElementById(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      this.scrollToElement(element);
    }
  }
}

import { Component, HostListener } from '@angular/core';

type ModalId = 'machinery' | 'smartreserve' | 'petadoption';

@Component({
  selector: 'app-project',
  standalone: true,                           
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  openModalId: ModalId | null = null;

  // Each modal has 3 slides
  currentSlide: Record<ModalId, number> = {
    machinery: 0,
    smartreserve: 0,
    petadoption: 0
  };

  openModal(id: ModalId): void {
    this.openModalId = id;
  }

  closeModal(): void {
    this.openModalId = null;
  }

  changeSlide(id: ModalId, delta: number): void {
    const total = 3;
    const current = this.currentSlide[id];
    this.currentSlide[id] = (current + delta + total) % total;
  }

  goToSlide(id: ModalId, index: number): void {
    this.currentSlide[id] = index;
  }

  // No parameter -> no TS error about Event vs KeyboardEvent
  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.openModalId) {
      this.closeModal();
    }
  }
}

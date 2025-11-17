import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

type ModalId = 'machinery' | 'smartreserve' | 'petadoption' | 'payroll' | 'todolist';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  openModalId: ModalId | null = null;

  // Each modal has 3 slides
  currentSlide: Record<ModalId, number> = {
    machinery: 0,
    smartreserve: 0,
    petadoption: 0,
    payroll: 0,
    todolist: 0
  };

  // Map of images per modal for gallery preview (use your actual file paths)
  private imageMap: Record<ModalId, string[]> = {
    machinery: ['gantt3.JPG', 'gantt4.JPG', 'gantt2.JPG'],
    smartreserve: ['res2.JPG', 'res3.JPG', 'res4.JPG'],
    petadoption: ['pet2.JPG', 'pet3.JPG', 'pet4.JPG'],
    payroll: ['pay1.JPG', 'pay2.JPG', 'pay3.JPG'],
    todolist: ['todo1.JPG', 'todo2.JPG', 'todo3.JPG']
  };

  // Global image preview modal state
  isImagePreviewOpen = false;
  previewSrc: string | null = null;
  previewAlt: string | null = null;

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

  // For gallery overlay: get the current image src
  getActiveImage(id: ModalId): string {
    const index = this.currentSlide[id] ?? 0;
    return this.imageMap[id][index];
  }

  // Image preview modal controls
  openImagePreview(src: string, alt: string): void {
    this.previewSrc = src;
    this.previewAlt = alt;
    this.isImagePreviewOpen = true;
  }

  closeImagePreview(): void {
    this.isImagePreviewOpen = false;
    this.previewSrc = null;
    this.previewAlt = null;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    // Close image preview first if open
    if (this.isImagePreviewOpen) {
      this.closeImagePreview();
      return;
    }

    // Otherwise close any open project modal
    if (this.openModalId) {
      this.closeModal();
    }
  }
}

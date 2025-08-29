import { Component, ElementRef, ViewChild, signal } from "@angular/core";

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})

export class AboutComponent {
    resumeOpen = signal(false);

    @ViewChild('panel') panel?: ElementRef<HTMLElement>;

    openResume() {
        this.resumeOpen.set(true);
        //focus the panel for Escape-to-close keyboard support
        queueMicrotask(() => this.panel?.nativeElement.focus());
        document.body.style.overflow = 'hidden'; //prevent page scroll under modal

    }

    closeResume() {
        this.resumeOpen.set(false);
        document.body.style.overflow = ''; //restore scroll
    }

    //Close when clicking backdrop(not when clicking inside panel)
    onBackdrop(ev: MouseEvent) {
        if ((ev.target as HTMLElement).classList.contains('modal')) {
            this.closeResume();
        }
    }

}
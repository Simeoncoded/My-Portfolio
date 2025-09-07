import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Your Formspree endpoint
  private readonly endpoint = 'https://formspree.io/f/xovnyezy';

  sending = signal(false);
  sent = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]], // Formspree expects name="email"
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
    _honeypot: [''] // hidden spam-trap
  });

  ngOnInit(): void {
    // If redirected with ?sent=1, show success and clean URL
    if (this.route.snapshot.queryParamMap.get('sent') === '1') {
      this.sent.set(true);
      // optional: clean the URL so ?sent=1 disappears
      setTimeout(() => {
        this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true, fragment: 'contact' });
      });
    }
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // honeypot filled? likely a bot—just ignore
    if (this.form.value._honeypot) return;

    this.sending.set(true);
    this.error.set(null);

    const data = new FormData();
    data.append('name', this.form.value.name!);
    data.append('email', this.form.value.email!);
    data.append('message', this.form.value.message!);
    data.append('_subject', 'New message from your portfolio');
    data.append('_honeypot', this.form.value._honeypot!);

    try {
      await this.http.post(this.endpoint, data, {
        headers: new HttpHeaders({ 'Accept': 'application/json' }),
        responseType: 'json'
      }).toPromise();

      // redirect to same route with success flag & anchor
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sent: '1' },
        fragment: 'contact'
      });
    } catch (err: any) {
      const msg = err?.error?.errors?.map((e: any) => e.message).join(', ')
               || 'Something went wrong. Please try again.';
      this.error.set(msg);
    } finally {
      this.sending.set(false);
    }
  }
}

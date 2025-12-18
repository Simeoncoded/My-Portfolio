import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent {
  // Your Formspree endpoint
  private readonly FORMSPREE_URL = "https://formspree.io/f/xovnyezy";

  isSending = false;
  statusMessage = "";
  statusType: "idle" | "ok" | "err" = "idle";

  async onSubmit(form: NgForm) {
    if (this.isSending) return;

    // Angular template-driven validation
    if (form.invalid) {
      this.statusType = "err";
      this.statusMessage = "Please fill out the form correctly.";
      return;
    }

    this.isSending = true;
    this.statusType = "idle";
    this.statusMessage = "Sending…";

    try {
      const payload = { ...form.value };

      // Honeypot (bots)
      const hp = (payload._honeypot ?? "").toString().trim();
      if (hp) {
        form.resetForm();
        this.statusType = "ok";
        this.statusMessage = "Message sent ✅";
        return;
      }

      const res = await fetch(this.FORMSPREE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        form.resetForm(); // ✅ clears inputs
        this.statusType = "ok";
        this.statusMessage = "Message sent ✅";
      } else {
        this.statusType = "err";
        this.statusMessage =
          data?.error || "Form submission failed. Please try again.";
        console.error("Formspree error:", res.status, data);
      }
    } catch (err) {
      this.statusType = "err";
      this.statusMessage = "Network error. Please try again.";
      console.error(err);
    } finally {
      this.isSending = false;
    }
  }
}

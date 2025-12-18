import { Component } from "@angular/core";

@Component({
  selector: "app-contact",
  standalone: true,
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent {
  isSending = false;
  statusMessage = "";
  statusType: "idle" | "ok" | "err" = "idle";

  async onSubmit(e: Event) {
    e.preventDefault();
    if (this.isSending) return;

    const form = e.target as HTMLFormElement;

    // Use built-in HTML validation
    if (!form.checkValidity()) {
      form.reportValidity();
      this.statusType = "err";
      this.statusMessage = "Please fill out the form correctly.";
      return;
    }

    this.isSending = true;
    this.statusMessage = "Sending…";
    this.statusType = "idle";

    try {
      const formData = new FormData(form);

      // Honeypot (spam bots)
      const hp = (formData.get("_honeypot") ?? "").toString().trim();
      if (hp) {
        form.reset();
        this.statusType = "ok";
        this.statusMessage = "Message sent ✅";
        this.isSending = false;
        return;
      }

      const res = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        form.reset(); // ✅ clears inputs
        this.statusType = "ok";
        this.statusMessage = "Message sent ✅";
      } else {
        this.statusType = "err";
        this.statusMessage = "Something went wrong. Please try again.";
      }
    } catch {
      this.statusType = "err";
      this.statusMessage = "Network error. Please try again.";
    } finally {
      this.isSending = false;
    }
  }
}

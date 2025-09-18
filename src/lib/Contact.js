import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    // Initialize EmailJS once with the public key
    if (process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY });
    }
  }, []);

  useEffect(() => {
    if (status.type === "success" || status.type === "error") {
      const timer = setTimeout(() => {
        setStatus({ type: "idle", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Validate env vars to prevent silent failures
    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message: "Email service is not configured. Check .env keys and restart dev server.",
      });
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      if (result.status === 200) {
        setStatus({ type: "success", message: "Thanks! Your message has been sent." });
        formRef.current?.reset();
      } else {
        setStatus({ type: "error", message: `Failed to send (status ${result.status}).` });
      }
    } catch (err) {
      const errMsg = typeof err?.text === "string" ? err.text : (err?.message || "Something went wrong. Please try later.");
      setStatus({ type: "error", message: errMsg });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent dark:bg-surface-dark section-bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-2 text-text dark:text-text-dark">Contact</h2>
          <p className="text-sm sm:text-base lg:text-lg text-text-light dark:text-text-dark-light">Have a question or want to work together? Send me a message.</p>
        </div>

        {status.type !== "idle" && (
          <div className={`mb-6 rounded-xl border p-4 flex items-start gap-3 ${status.type === "success" ? "border-green-200 bg-green-50 text-green-700" : status.type === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-surface-muted bg-surface"}`}>
            <div className="flex-1">
              <p className="font-medium">{status.type === "success" ? "Success" : status.type === "error" ? "Error" : "Status"}</p>
              <p className="text-sm opacity-90">{status.message}</p>
            </div>
            <button aria-label="Dismiss" className="text-inherit opacity-60 hover:opacity-100" onClick={() => setStatus({ type: "idle", message: "" })}>✕</button>
          </div>
        )}

        <form ref={formRef} onSubmit={sendEmail} className="space-y-4 sm:space-y-6 glass-card p-4 sm:p-6 lg:p-8">
          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-text dark:text-text-dark mb-2">Name</label>
            <input id="name" name="user_name" type="text" required className="w-full rounded-xl border border-surface-muted dark:border-surface-dark bg-white/60 dark:bg-[#0b1220]/60 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-text dark:text-text-dark mb-2">Email</label>
            <input id="email" name="user_email" type="email" required className="w-full rounded-xl border border-surface-muted dark:border-surface-dark bg-white/60 dark:bg-[#0b1220]/60 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-text dark:text-text-dark mb-2">Message</label>
            <textarea id="message" name="message" rows="4" required className="w-full rounded-xl border border-surface-muted dark:border-surface-dark bg-white/60 dark:bg-[#0b1220]/60 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors" placeholder="How can I help?" />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="btn-fancy" disabled={status.type === "loading"}>
              {status.type === "loading" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventType: "", date: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Bhabuji! I'd like to book your services.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nEvent: ${form.eventType}\nDate: ${form.date}\nDetails: ${form.message}`;
    window.open(
      `https://wa.me/919619885451?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Book Your <span className="text-gradient-gold">Experience</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-3 glass p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                required
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-charcoal-light/50 border border-gold/10 rounded-lg px-4 py-3 text-cream font-body placeholder:text-cream/30 focus:border-gold/40 focus:outline-none transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-charcoal-light/50 border border-gold/10 rounded-lg px-4 py-3 text-cream font-body placeholder:text-cream/30 focus:border-gold/40 focus:outline-none transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-charcoal-light/50 border border-gold/10 rounded-lg px-4 py-3 text-cream font-body placeholder:text-cream/30 focus:border-gold/40 focus:outline-none transition-colors"
              />
              <select
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                className="bg-charcoal-light/50 border border-gold/10 rounded-lg px-4 py-3 text-cream font-body focus:border-gold/40 focus:outline-none transition-colors"
              >
                <option value="" className="bg-charcoal">Event Type</option>
                <option value="Wedding" className="bg-charcoal">Wedding</option>
                <option value="Corporate Event" className="bg-charcoal">Corporate Event</option>
                <option value="Private Party" className="bg-charcoal">Private Party</option>
                <option value="Workshop" className="bg-charcoal">Workshop</option>
                <option value="Academy Enrollment" className="bg-charcoal">Academy Enrollment</option>
              </select>
            </div>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-charcoal-light/50 border border-gold/10 rounded-lg px-4 py-3 text-cream font-body focus:border-gold/40 focus:outline-none transition-colors"
            />
            <textarea
              rows={4}
              placeholder="Tell us about your event..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-charcoal-light/50 border border-gold/10 rounded-lg px-4 py-3 text-cream font-body placeholder:text-cream/30 focus:border-gold/40 focus:outline-none transition-colors resize-none"
            />
            <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
              <Send size={16} /> Send via WhatsApp
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="md:col-span-2 space-y-6"
          >
            {[
              { icon: MapPin, title: "Location", text: "Mumbai, India — Available Nationwide" },
              { icon: Phone, title: "Phone", text: "+91 96198 85451" },,
              { icon: Mail, title: "Email", text: "hello@bhabujijinga.com" },
            ].map((item) => (
              <div key={item.title} className="glass p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <item.icon className="text-gold" size={18} />
                </div>
                <div>
                  <p className="font-display text-cream font-semibold">{item.title}</p>
                  <p className="text-cream/50 font-body text-sm">{item.text}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="glass p-6">
              <p className="font-display text-cream font-semibold mb-3">Follow Us</p>
              <div className="flex gap-3">
                {["Instagram", "YouTube", "Facebook"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="px-4 py-2 rounded-lg border border-gold/10 text-cream/50 text-sm font-body hover:border-gold/30 hover:text-gold transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

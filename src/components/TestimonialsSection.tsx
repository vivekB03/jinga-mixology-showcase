import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, LogIn, LogOut, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import headTrainerImg from "@/assets/real-head-trainer.jpg";

type Review = {
  id: string;
  reviewer_name: string;
  role: string;
  review_text: string;
  stars: number;
  created_at: string;
};

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", role: "Student", text: "", stars: 5 });
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  // Static client feedback (always shown first)
  const staticReview: Review = {
    id: "static-1",
    reviewer_name: "Industry Recognition",
    role: "Client Feedback",
    review_text: "Known for his extensive bartending knowledge and ability to deliver exceptional guest experiences. Recognized for his strong reputation in luxury hospitality and event bartending.",
    stars: 5,
    created_at: "",
  };

  useEffect(() => {
    fetchReviews();
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setShowAuth(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("id, reviewer_name, role, review_text, stars, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  const allReviews = [staticReview, ...reviews];
  const t = allReviews[current] || staticReview;

  const next = () => setCurrent((c) => (c + 1) % allReviews.length);
  const prev = () => setCurrent((c) => (c - 1 + allReviews.length) % allReviews.length);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (authMode === "signup") {
        const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
        if (error) throw error;
        toast({ title: "Account created!", description: "You can now submit your review." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) throw error;
        toast({ title: "Welcome back!" });
      }
      setAuthEmail("");
      setAuthPassword("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        reviewer_name: reviewForm.name.trim(),
        role: reviewForm.role.trim(),
        review_text: reviewForm.text.trim(),
        stars: reviewForm.stars,
      });
      if (error) throw error;
      toast({ title: "Review submitted!", description: "Thank you for your feedback." });
      setReviewForm({ name: "", role: "Student", text: "", stars: 5 });
      setShowReviewForm(false);
      fetchReviews();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast({ title: "Logged out" });
  };

  const inputClass = "w-full bg-charcoal-light/50 border border-gold/10 rounded-lg px-4 py-3 text-cream font-body placeholder:text-cream/30 focus:border-gold/40 focus:outline-none transition-colors";

  return (
    <section id="testimonials" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 font-body text-sm tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mt-3">
            Real <span className="text-gradient-gold">Reviews</span>
          </h2>
          <p className="text-cream/50 font-body mt-3">
            {allReviews.length} review{allReviews.length !== 1 ? "s" : ""} from real students & clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Trainer image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2 hidden md:block"
          >
            <div className="rounded-2xl overflow-hidden border border-gold/10">
              <img
                src={headTrainerImg}
                alt="Bhabuji Jinaga - Head Trainer & Mixologist"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-3 glass p-8 md:p-10 text-center relative"
          >
            <Quote className="text-gold/20 mx-auto mb-4" size={36} />
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-cream/70 font-body text-lg md:text-xl leading-relaxed mb-8 italic">
                  "{t.review_text}"
                </p>
                <p className="font-display text-xl font-semibold text-cream">{t.reviewer_name}</p>
                <p className="text-gold/60 font-body text-sm">{t.role}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 hover:border-gold/50 hover:text-gold transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                {allReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-gold w-6" : "bg-gold/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 hover:border-gold/50 hover:text-gold transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Write a Review area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          {!user ? (
            <div>
              <button
                onClick={() => setShowAuth(!showAuth)}
                className="btn-gold inline-flex items-center gap-2"
              >
                <LogIn size={16} /> Sign in to Leave a Review
              </button>

              <AnimatePresence>
                {showAuth && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAuth}
                    className="glass max-w-md mx-auto mt-6 p-6 space-y-4 overflow-hidden"
                  >
                    <div className="flex gap-2 justify-center mb-2">
                      <button
                        type="button"
                        onClick={() => setAuthMode("login")}
                        className={`px-4 py-1.5 rounded-lg text-sm font-body transition-colors ${
                          authMode === "login" ? "bg-gold/20 text-gold" : "text-cream/50"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMode("signup")}
                        className={`px-4 py-1.5 rounded-lg text-sm font-body transition-colors ${
                          authMode === "signup" ? "bg-gold/20 text-gold" : "text-cream/50"
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className={inputClass}
                    />
                    <input
                      required
                      type="password"
                      placeholder="Password (min 6 chars)"
                      minLength={6}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className={inputClass}
                    />
                    <button type="submit" disabled={authLoading} className="btn-gold w-full flex items-center justify-center gap-2">
                      {authLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                      {authMode === "login" ? "Login" : "Create Account"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-cream/50 font-body text-sm">Signed in as {user.email}</span>
                <button onClick={handleLogout} className="text-gold/60 hover:text-gold transition-colors">
                  <LogOut size={16} />
                </button>
              </div>

              {!showReviewForm ? (
                <button onClick={() => setShowReviewForm(true)} className="btn-gold inline-flex items-center gap-2">
                  <Star size={16} /> Write a Review
                </button>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmitReview}
                  className="glass max-w-lg mx-auto mt-4 p-6 space-y-4 text-left"
                >
                  <input
                    required
                    placeholder="Your Name"
                    maxLength={100}
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    required
                    placeholder="Your Role (e.g. Student, Bartender)"
                    maxLength={100}
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    className={inputClass}
                  />
                  <div>
                    <label className="text-cream/50 font-body text-sm mb-2 block">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, stars: s })}
                        >
                          <Star
                            size={24}
                            className={`transition-colors ${s <= reviewForm.stars ? "fill-gold text-gold" : "text-cream/20"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={1000}
                    placeholder="Share your experience..."
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                  <div className="flex gap-3">
                    <button type="submit" disabled={submitting} className="btn-gold flex-1 flex items-center justify-center gap-2">
                      {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 rounded-lg border border-gold/10 text-cream/50 font-body hover:border-gold/30 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

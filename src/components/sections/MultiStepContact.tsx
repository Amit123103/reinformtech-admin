"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

type FormState = {
  service: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  details: string;
};

const services = ["Custom Software", "Web App Development", "Mobile App Development", "UI/UX Design", "Cloud Migration", "Other"];
const budgets = ["< $10k", "$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"];
const timelines = ["ASAP", "1-3 Months", "3-6 Months", "Flexible"];

export function MultiStepContact() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<FormState>({
    service: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const updateForm = (field: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStep(5); // Success step
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was a problem submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column: Form */}
          <div className="w-full">
            <SectionHeading
              eyebrow="Start a Project"
              title="Let's build something great."
              align="left"
              className="mb-10"
            />

          <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            
            {/* Progress Bar */}
            {step < 5 && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[var(--color-surface)]">
                <div 
                  className="h-full bg-[var(--color-accent)] transition-all duration-500 ease-in-out"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            )}

            <div className="min-h-[400px] flex flex-col">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Service */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow"
                  >
                    <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">What do you need help with?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map(service => (
                        <button
                          key={service}
                          onClick={() => { updateForm("service", service); nextStep(); }}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            formData.service === service 
                              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-text)]" 
                              : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                          }`}
                        >
                          <span className="font-medium">{service}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget & Timeline */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">What is your expected budget?</h3>
                      <div className="flex flex-wrap gap-3">
                        {budgets.map(budget => (
                          <button
                            key={budget}
                            onClick={() => updateForm("budget", budget)}
                            className={`px-5 py-3 rounded-xl border transition-all ${
                              formData.budget === budget 
                                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white" 
                                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] bg-[var(--color-surface)]"
                            }`}
                          >
                            <span className="font-medium">{budget}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">What is your timeline?</h3>
                      <div className="flex flex-wrap gap-3">
                        {timelines.map(timeline => (
                          <button
                            key={timeline}
                            onClick={() => updateForm("timeline", timeline)}
                            className={`px-5 py-3 rounded-xl border transition-all ${
                              formData.timeline === timeline 
                                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white" 
                                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] bg-[var(--color-surface)]"
                            }`}
                          >
                            <span className="font-medium">{timeline}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow"
                  >
                    <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">Tell us more about the project</h3>
                    <textarea
                      value={formData.details}
                      onChange={(e) => updateForm("details", e.target.value)}
                      placeholder="Briefly describe your goals, current challenges, and any specific requirements..."
                      className="w-full h-48 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none"
                    />
                  </motion.div>
                )}

                {/* Step 4: Contact Info */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-grow"
                  >
                    <h3 className="text-2xl font-bold text-[var(--color-text)] mb-6">How can we reach you?</h3>
                    <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Full Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateForm("name", e.target.value)}
                          className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Work Email</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Company (Optional)</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => updateForm("company", e.target.value)}
                            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                          />
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-grow flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-[var(--color-accent)]" />
                    </div>
                    <h3 className="text-3xl font-bold text-[var(--color-text)] mb-4">Request Received!</h3>
                    <p className="text-lg text-[var(--color-muted)] max-w-md">
                      Thank you for reaching out, {formData.name || 'there'}. We've received your project details and one of our technical partners will be in touch within 24 hours.
                    </p>
                    <Button className="mt-8" onClick={() => { setStep(1); setFormData({ service: "", budget: "", timeline: "", name: "", email: "", company: "", details: "" }); }}>
                      Submit Another Project
                    </Button>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation */}
              {step < 5 && (
                <div className="mt-8 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-text)] font-medium disabled:opacity-30 disabled:hover:text-[var(--color-muted)] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  
                  {step < 4 ? (
                    <Button 
                      onClick={nextStep} 
                      disabled={(step === 1 && !formData.service) || (step === 2 && (!formData.budget || !formData.timeline))}
                      className="gap-2"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      form="contact-form"
                      disabled={isSubmitting || !formData.name || !formData.email}
                      className="gap-2 bg-[var(--color-text)] text-[var(--color-background)] hover:bg-[var(--color-muted)]"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Project"}
                    </Button>
                  )}
                </div>
              )}
            </div>

            </div>
          </div>

          {/* Right Column: Contact & Map */}
          <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden h-full flex flex-col mt-4 lg:mt-0">
            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-8">Contact & Location</h3>
            
            <div className="space-y-6 mb-8 flex-grow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 mt-1 border border-[var(--color-accent)]/20">
                  <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-[var(--color-text)] font-semibold mb-1">Company Location</h4>
                  <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                    Sector 63 A<br/>
                    Noida, Uttar Pradesh<br/>
                    Pin Code: 201301<br/>
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 mt-1 border border-[var(--color-accent)]/20">
                  <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="text-[var(--color-text)] font-semibold mb-1">Email Us</h4>
                  <a href="mailto:reinformtech@gmail.com" className="text-[var(--color-muted)] text-sm hover:text-[var(--color-accent)] transition-colors">
                    reinformtech@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-[var(--color-border)] mt-auto relative z-10 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14010.53630252554!2d77.3783!3d28.6180!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef9cf350a4bf%3A0x8cf25211d293f0b2!2sSector%2063A%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

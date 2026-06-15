import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Mail, Globe } from "lucide-react";
import Link from "next/link";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const teamMembers = [
  {
    name: "Aditya Kumar Singh",
    role: "Co-Founder & CEO",
    bio: "Visionary leader driving ReInformTech's mission to build scalable enterprise solutions. Aditya brings deep expertise in business strategy and technology leadership.",
    image: "/aditya-kumar-singh.png",
    skills: ["Business Strategy", "Tech Leadership", "Product Vision", "Enterprise Solutions", "DevOps Engineer", "Full-Stack Developer"],
    social: { linkedin: "https://www.linkedin.com/in/adityakumars/", github: "https://github.com/Aditya-k1-singh", mail: "mailto:reinformtech@gmail.com" }
  },
  {
    name: "Amit Kumar",
    role: "Co-Founder & CTO",
    bio: "Engineering powerhouse leading the technical architecture at ReInformTech. Amit ensures every product is built with scalability, performance, and excellence at its core.",
    image: "/amit-kumar.png",
    skills: ["System Architecture", "Full-Stack Development", "Cloud Infrastructure", "Machine Learning & AI Specialist", "DevOps Engineer", "Team Leadership"],
    social: { 
      linkedin: "https://www.linkedin.com/in/amit-akhil/", 
      github: "https://github.com/Amit123103", 
      mail: "mailto:reinformtech@gmail.com",
      portfolio: "https://amit123103.github.io/SmartPortfolio/"
    }
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Our People"
            title="Meet the engineers building your product."
            align="left"
            className="mb-16"
          />
        </AnimateOnScroll>

        <AnimateOnScroll variants={staggerContainer}>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <AnimateOnScroll key={index} variants={fadeUp}>
                <div className="group rounded-3xl bg-[var(--color-background)] border border-[var(--color-border)] overflow-hidden hover:shadow-lg hover:border-[var(--color-accent)] transition-all duration-300">
                  <div className="p-8">
                    <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-2 border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">{member.name}</h3>
                    <p className="text-sm font-semibold text-[var(--color-accent)] mb-4">{member.role}</p>
                    <p className="text-[var(--color-muted)] text-sm mb-6 leading-relaxed min-h-[60px]">{member.bio}</p>
                    
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map(skill => (
                          <span key={skill} className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] text-xs rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-border)]">
                      <Link href={member.social.linkedin} className="text-[var(--color-muted)] hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="w-5 h-5" />
                      </Link>
                      <Link href={member.social.github} className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="w-5 h-5" />
                      </Link>
                      <Link href={member.social.mail} className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors" aria-label="Email">
                        <Mail className="w-5 h-5" />
                      </Link>
                      {(member.social as any).portfolio && (
                        <Link href={(member.social as any).portfolio} className="text-[var(--color-muted)] hover:text-[#10b981] transition-colors" aria-label="Portfolio" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}

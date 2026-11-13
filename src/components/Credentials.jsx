import React from 'react';

export default function Credentials({ data }) {
  if (!data) return null;
  const { education, certifications, languages } = data;

  return (
    <section className="relative py-16 md:py-24 px-4 bg-void text-white border-t border-plasma/10" id="credentials">
      <div className="container mx-auto max-w-4xl z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Education */}
        <div className="glass-panel p-6 border-plasma/20">
          <h3 className="text-xl font-orbitron text-plasma mb-6 uppercase">Education</h3>
          <div className="flex flex-col gap-6">
            {education.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <h4 className="font-bold font-rajdhani text-lg">{item.degree}</h4>
                <p className="text-sm text-white/60">{item.institution}</p>
                <span className="text-[10px] font-mono text-solar">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="glass-panel p-6 border-plasma/20">
          <h3 className="text-xl font-orbitron text-plasma mb-6 uppercase">Certifications</h3>
          <div className="flex flex-col gap-6">
            {certifications.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <h4 className="font-bold font-rajdhani text-lg">{item.title}</h4>
                <p className="text-sm text-white/60">{item.issuer}</p>
                <span className="text-[10px] font-mono text-solar">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="glass-panel p-6 border-plasma/20">
          <h3 className="text-xl font-orbitron text-plasma mb-6 uppercase">Languages</h3>
          <div className="flex flex-col gap-4">
            {languages.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-plasma/10 pb-2 last:border-0">
                <h4 className="font-bold font-rajdhani text-lg">{item.name}</h4>
                <p className="text-sm text-solar/80 font-mono tracking-widest uppercase">{item.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

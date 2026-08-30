import { Archivo } from "next/font/google"
import { Playfair_Display, Instrument_Serif } from "next/font/google"

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

export default function Certificates() {
  return (
    <section className="bg-[#050505] text-white py-24 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">
              Certifications
            </span>
          </div>

          <h2 className="flex flex-col">
            <span className={`text-5xl md:text-7xl lg:text-[80px] font-bold leading-[0.9] tracking-tight text-white uppercase ${archivo.className}`}>
              PROFESSIONAL
            </span>
            <span className="text-6xl md:text-8xl lg:text-[90px] text-neutral-400 font-serif italic" style={{ fontFamily: 'var(--font-instrument), serif' }}>
              milestones
            </span>
          </h2>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Cert 1: JPMorgan */}
          <div className="flex flex-col gap-6 group">
            {/* The Certificate UI */}
            <div className="aspect-[4/3] bg-white rounded-xl relative overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Blue Ribbon */}
              <div className="absolute top-0 right-4 w-16 h-20 bg-[#00509E] flex flex-col items-center justify-center pt-2 clip-ribbon">
                <span className="text-white text-[10px] font-bold tracking-wider">Forage</span>
              </div>

              <div className="flex flex-col h-full">
                <div className="text-black font-serif text-lg tracking-widest mb-8">
                  JPMORGAN CHASE & CO.
                </div>

                <div className="mt-auto">
                  <h3 className="text-black text-2xl font-bold mb-1">Wasim Aktar</h3>
                  <h4 className="text-black text-xl font-semibold mb-6">Software Engineering Job Simulation</h4>

                  <p className="text-neutral-500 text-sm mb-1">Certificate of Completion</p>
                  <p className="text-neutral-500 text-xs">November 21st, 2025</p>
                </div>

                <div className="mt-12 flex justify-between items-end border-t border-neutral-200 pt-4">
                  <div className="text-[8px] text-neutral-400 max-w-[60%]">
                    Over the period of this simulation, Wasim Aktar has completed practical tasks in software engineering.
                  </div>
                  <div className="text-black text-xs border-t border-black pt-1 px-4 text-center">
                    Tom Brunskill
                  </div>
                </div>
              </div>
            </div>

            {/* Below Cert Text */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-[#a09e8a] uppercase">JPMORGAN CHASE & CO.</span>
              <h3 className={`text-xl text-white ${archivo.className}`}>Software Engineering Virtual Experience</h3>
            </div>
          </div>

          {/* Cert 2: Oracle */}
          <div className="flex flex-col gap-6 group">
            {/* The Certificate UI */}
            <div className="aspect-[4/3] bg-white rounded-xl relative overflow-hidden shadow-2xl p-3 transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Inner Border */}
              <div className="w-full h-full border-[3px] border-[#c0392b] rounded-lg p-2 relative">
                <div className="w-full h-full border border-orange-400 rounded p-6 flex flex-col justify-between relative z-10">

                  {/* Badge */}
                  <div className="absolute top-2 right-2 w-16 h-16 rounded-full border-2 border-[#c0392b] flex items-center justify-center p-1">
                    <div className="w-full h-full rounded-full border border-orange-400 bg-orange-50 flex items-center justify-center text-center text-[6px] text-black font-bold uppercase leading-tight">
                      Oracle<br />Certified<br />Foundations
                    </div>
                  </div>

                  <div>
                    <div className="text-[#c0392b] font-bold text-lg mb-6">ORACLE <span className="text-xs font-normal">University</span></div>
                    <h3 className="text-black text-xl font-bold mb-1">Oracle Certified Foundations Associate</h3>
                    <p className="text-neutral-500 text-xs italic mb-10">Certificate of Recognition</p>

                    <p className="text-black font-semibold text-lg border-b border-neutral-300 pb-1 mb-6 inline-block pr-10">Wasim Aktar</p>

                    <p className="text-[10px] text-black max-w-[80%] leading-relaxed mb-6">
                      This certifies that the above named is recognized by Oracle Corporation as Oracle Certified Foundations Associate.
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="text-[10px] text-black">
                      <p className="mb-2">December 17, 2025</p>
                      <p className="text-neutral-500">This eCertificate is valid until: December 17, 2027</p>
                    </div>
                    <div className="text-center">
                      <div className="text-black font-serif italic text-lg mb-1">Damien Carey</div>
                      <div className="text-[8px] text-black border-t border-black pt-1">Senior Vice President, Oracle University</div>
                    </div>
                  </div>

                </div>
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 rounded-lg pointer-events-none"></div>
              </div>
            </div>

            {/* Below Cert Text */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-[#a09e8a] uppercase">ORACLE</span>
              <h3 className={`text-xl text-white ${archivo.className}`}>Oracle Certified Professional</h3>
            </div>
          </div>

          {/* Cert 3: Lets Upgrade */}
          <div className="flex flex-col gap-6 group">
            {/* The Certificate UI */}
            <div className="aspect-[4/3] bg-white rounded-xl relative overflow-hidden shadow-2xl flex transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Left yellow bar */}
              <div className="w-[30%] h-full bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col justify-between p-4 z-10 text-white relative shadow-[4px_0_15px_rgba(0,0,0,0.1)]">
                <div className="bg-white text-black p-2 rounded w-fit">
                  <div className="font-bold leading-none text-sm">Lets<br />Upgrade</div>
                </div>
                <div className="text-[8px] uppercase opacity-80 leading-tight">
                  Date of Issue: October 2025<br /><br />
                  Certificate ID: LU-2025-WASM
                </div>
              </div>

              {/* Right white area */}
              <div className="w-[70%] h-full p-6 flex flex-col justify-center relative">
                {/* Faint repeating watermark */}
                <div className="absolute inset-0 overflow-hidden opacity-[0.02] flex flex-wrap content-start z-0 pointer-events-none">
                  {[...Array(40)].map((_, i) => (
                    <span key={i} className="text-[6px] text-black whitespace-nowrap p-1">LETSUPGRADE </span>
                  ))}
                </div>

                <div className="relative z-10">
                  <p className="text-[8px] text-neutral-500 uppercase tracking-widest mb-1">This is to certify that</p>
                  <h3 className="text-black text-xl font-medium mb-8">Wasim Aktar</h3>

                  <p className="text-[8px] text-neutral-500 uppercase tracking-widest mb-1">Has successfully completed</p>
                  <h4 className="text-black text-sm font-semibold mb-6">Idea to Deployment using Vibe Coding</h4>

                  <div className="text-[8px] text-neutral-600 mb-6 uppercase">
                    From 15 September 2025 to 17 September 2025<br />(3 Days)
                  </div>

                  <div className="text-[6px] text-neutral-500 uppercase mb-2">In Collaboration with</div>
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-[4px] text-black font-bold">NSDC</div>
                    <div className="w-6 h-6 rounded-full border border-neutral-300 flex items-center justify-center text-[4px] text-black font-bold">ITM</div>
                    <div className="text-[6px] font-bold text-black flex items-center gap-1"><span className="text-blue-500">&lt;</span><span className="text-green-500">&gt;</span> GDG MAD</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Below Cert Text */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-[#a09e8a] uppercase">LETSUPGRADE</span>
              <h3 className={`text-xl text-white ${archivo.className}`}>Vibe Coding</h3>
            </div>
          </div>

        </div>
      </div>

      {/* Ribbon CSS - simple inline injection for the JPMC ribbon */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .clip-ribbon {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
        }
      `}} />
    </section>
  )
}

// app/page.js
"use client";
import React, { useState } from 'react';
import { Heart, Music, Disc, Wind, Film, Sparkles, Globe, Flame, Copy, Check, ChevronRight, RefreshCw } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [userIdea, setUserIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);
  
  // Real AI Live Response State
  const [aiResult, setAiResult] = useState({
    sunoPrompt: "",
    title1: "",
    title2: "",
    lyrics: "",
    tags: ""
  });

  const niches = [
    { id: 'sad', title: 'Heartbreak & Sad Melodies', icon: <Heart className="w-6 h-6 text-red-400" />, ctr: '6%–9%', status: 'High View Duration', desc: 'Log thambnail ke dukh bhare quotes aur emotional chehre dekh kar foran click karte hain.' },
    { id: 'pop', title: 'Catchy Pop & Dance-Pop', icon: <Music className="w-6 h-6 text-pink-400" />, ctr: '5%–8%', status: 'Perfect for Shorts/Reels', desc: 'Trendy thumbnails, bright colors, aur vibrant visuals ki wajah se log ise jaldi open karte hain.' },
    { id: 'afro', title: 'Afrobeat & Latin Fusion', icon: <Flame className="w-6 h-6 text-orange-400" />, ctr: '5%–7%', status: 'High Viral Potential', desc: 'Log party vibes aur dance rhythm dhoondte hain. Tropical vibe ho to clicks achhe aate hain.' },
    { id: 'lofi', title: 'Lo-Fi Beats (Study/Chill)', icon: <Disc className="w-6 h-6 text-purple-400" />, ctr: '4%–6%', status: 'Infinite Loop Watch Time', desc: 'Iska CTR thora kam hota hai par watch time kamaal milta hai kyunki log ghanton loop par sunte hain.' },
    { id: 'cinema', title: 'Cinematic & Synthwave', icon: <Film className="w-6 h-6 text-blue-400" />, ctr: '4%–6%', status: 'Tech & Gaming Target', desc: 'Is niche mein Gamers aur Tech lovers click karte hain jo futuristic cyberpunk layouts pasand karte hain.' },
    { id: 'meditation', title: 'Meditation & Deep Focus', icon: <Wind className="w-6 h-6 text-teal-400" />, ctr: '2%–4%', status: 'Highest CPM/Ad Revenue', desc: 'Log video chala kar screen off kar dete hain ya so jate hain. Watch time aur ad revenue sab se high hota hai.' }
  ];

  const countries = [
    { id: 'US', name: 'United States (USA)', languages: ['English (US)', 'Spanish'] },
    { id: 'PK', name: 'Pakistan', languages: ['Urdu (Native)', 'Roman Urdu', 'Punjabi'] },
    { id: 'IN', name: 'India', languages: ['Hindi (Native)', 'Roman Hindi', 'Punjabi', 'Tamil'] },
    { id: 'BR', name: 'Brazil', languages: ['Portuguese (Brazilian)'] },
    { id: 'KR', name: 'South Korea', languages: ['Korean', 'Bilingual (Korean + English)'] },
    { id: 'PH', name: 'Philippines', languages: ['Tagalog', 'English (Global)'] },
    { id: 'UK', name: 'United Kingdom (UK)', languages: ['English (UK)'] }
  ];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedLanguage(country.languages[0]);
    setCurrentStep(3);
  };

  // Real API Fetch Logic
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: selectedNiche.title,
          country: selectedCountry.name,
          language: selectedLanguage,
          idea: userIdea
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      
      setAiResult(data);
      setCurrentStep(5);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-4 md:p-8 font-sans antialiased selection:bg-purple-500 selection:text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8 border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r flex items-center gap-2 from-purple-400 via-violet-500 to-indigo-500">
            🎵 ViralBeat AI <span className="text-[10px] uppercase tracking-widest bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded border border-purple-700/50 font-mono">BETA</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Global AI Music Metadata & Viral Prompt Generator — Powered by Claude & Gemini</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-8 bg-[#121218] p-4 rounded-xl border border-gray-800/40 flex flex-wrap justify-between items-center gap-2 text-xs md:text-sm">
        {['Music Niche', 'Country', 'Language', 'Your Idea', 'Results'].map((stepName, index) => (
          <div key={index} className={`flex items-center gap-2 ${currentStep === index + 1 ? 'text-purple-400 font-bold' : 'text-gray-500'}`}>
            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${currentStep === index + 1 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
              {index + 1}
            </span>
            <span>{stepName}</span>
            {index < 4 && <ChevronRight className="w-4 h-4 text-gray-700 hidden md:block" />}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto bg-[#121218] rounded-2xl border border-gray-800/60 p-6 md:p-8 shadow-2xl min-h-[450px] flex flex-col justify-between">
        
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-200">Select Your Music Niche</h2>
            <p className="text-sm text-gray-500 mb-6">Choose the emotional category — each niche has unique CTR benchmarks & audience behavior</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {niches.map((niche) => (
                <div 
                  key={niche.id} 
                  onClick={() => { setSelectedNiche(niche); setCurrentStep(2); }}
                  className={`bg-[#171721] border ${selectedNiche?.id === niche.id ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-gray-800/80'} rounded-xl p-5 hover:border-purple-600/70 transition-all cursor-pointer group flex flex-col justify-between`}
                >
                  <div>
                    <div className="mb-3 group-hover:scale-110 transition-transform w-fit">{niche.icon}</div>
                    <h3 className="text-base font-semibold text-gray-200 mb-1">{niche.title}</h3>
                    <p className="text-xs text-gray-500 mb-4">{niche.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[11px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-md border border-[#10B981]/20">CTR {niche.ctr}</span>
                    <span className="text-[11px] font-semibold text-[#A78BFA] bg-[#A78BFA]/10 px-2.5 py-1 rounded-md border border-[#A78BFA]/20">{niche.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-200">Target Country Selection</h2>
            <p className="text-sm text-gray-500 mb-6">Jis country ki audience ko target krna chahte hain wo select krein taa ke algorithm hit ho sake</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {countries.map((country) => (
                <div 
                  key={country.id}
                  onClick={() => handleCountrySelect(country)}
                  className="bg-[#171721] border border-gray-800 p-4 rounded-xl flex items-center gap-3 hover:border-purple-500 transition-all cursor-pointer group"
                >
                  <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-purple-950/40 transition-colors">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="font-medium text-gray-300 text-sm">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-200">Select Output Language & Script</h2>
            <p className="text-sm text-gray-500 mb-6">Lyrics aur keywords aapki selected country ke popular patterns ke mutabiq generate honge</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {selectedCountry?.languages.map((lang, idx) => (
                <div 
                  key={idx}
                  onClick={() => { setSelectedLanguage(lang); setCurrentStep(4); }}
                  className={`bg-[#171721] border ${selectedLanguage === lang ? 'border-purple-500' : 'border-gray-800'} p-5 rounded-xl flex items-center justify-between cursor-pointer hover:border-purple-500/50`}
                >
                  <span className="text-sm font-medium">{lang}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedLanguage === lang ? 'border-purple-500 bg-purple-500' : 'border-gray-600'}`}>
                    {selectedLanguage === lang && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex flex-col flex-grow justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1 text-gray-200">Explain Your Song Topic / Central Idea</h2>
              <p className="text-sm text-gray-500 mb-6">Ek line mein likhein ke aapka gaana kis cheez ke baare mein hoga</p>
              <textarea 
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                placeholder="Example: A painful heartbreak song about a late night drive in the heavy rain or missing an old school friend..."
                className="w-full min-h-[140px] bg-[#171721] border border-gray-800 rounded-xl p-4 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={!userIdea.trim() || isGenerating}
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:pointer-events-none font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Connecting Gemini AI Live Network...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-purple-200" />
                    Generate Live Lyrics & Prompts
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" /> Live Target Data Package Assembled!
                </h2>
                <p className="text-xs text-gray-500 mt-1">Configured for Niche: <span className="text-purple-400">{selectedNiche?.title}</span> | Country: <span className="text-purple-400">{selectedCountry?.name}</span></p>
              </div>
              <button onClick={() => { setCurrentStep(1); setUserIdea(""); }} className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg border border-gray-700/60 transition-colors flex items-center gap-1">
                Create Another Song
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Suno prompt container mapping */}
              <div className="bg-[#171721] border border-gray-800/80 p-5 rounded-xl relative group">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">1. Suno AI Prompt (Style Box)</h4>
                  <button onClick={() => copyToClipboard(aiResult.sunoPrompt, "suno")} className="text-gray-500 hover:text-white transition-colors">
                    {copiedSection === 'suno' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-gray-300 bg-[#0B0B0F] p-3 rounded-lg border border-gray-900 font-mono leading-relaxed select-all">
                  {aiResult.sunoPrompt}
                </p>
              </div>

              {/* YouTube titles map container */}
              <div className="bg-[#171721] border border-gray-800/80 p-5 rounded-xl relative group">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">2. Recommended High-CTR Titles</h4>
                  <button onClick={() => copyToClipboard(`${aiResult.title1}\n${aiResult.title2}`, 'title')} className="text-gray-500 hover:text-white transition-colors">
                    {copiedSection === 'title' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="bg-[#0B0B0F] p-2 rounded border border-gray-900"><span className="text-purple-400 font-bold">#1:</span> {aiResult.title1}</p>
                  <p className="bg-[#0B0B0F] p-2 rounded border border-gray-900"><span className="text-purple-400 font-bold">#2:</span> {aiResult.title2}</p>
                </div>
              </div>

              {/* Genuine AI Lyrics mapping box */}
              <div className="bg-[#171721] border border-gray-800/80 p-5 rounded-xl md:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">3. Generated Song Lyrics ({selectedLanguage})</h4>
                  <button onClick={() => copyToClipboard(aiResult.lyrics, 'lyrics')} className="text-gray-500 hover:text-white transition-colors">
                    {copiedSection === 'lyrics' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="bg-[#0B0B0F] p-4 rounded-lg border border-gray-900 font-mono text-sm max-h-[300px] overflow-y-auto text-gray-300 whitespace-pre-line leading-relaxed">
                  {aiResult.lyrics}
                </div>
              </div>

              {/* Tags block mapping */}
              <div className="bg-[#171721] border border-gray-800/80 p-5 rounded-xl md:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">4. Optimized YouTube SEO Hashtags</h4>
                  <button onClick={() => copyToClipboard(aiResult.tags, 'tags')} className="text-gray-500 hover:text-white transition-colors">
                    {copiedSection === 'tags' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-emerald-400 bg-[#0B0B0F] p-3 rounded-lg border border-gray-900 font-mono tracking-wide">
                  {aiResult.tags}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep < 5 && (
          <div className="mt-8 pt-4 border-t border-gray-900/60 flex justify-between items-center text-xs text-gray-500">
            <span>Step {currentStep} of 4</span>
            {currentStep > 1 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="hover:text-white font-medium underline underline-offset-4 transition-colors"
              >
                Back to previous step
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { ThemeContext } from "../context/ThemeContext";
import { Search, Bookmark, BookmarkCheck, Tv, Sun, Moon } from "lucide-react";

function Navbar() {
  const { 
    watchlist, 
    searchQuery, 
    setSearchQuery, 
    activeTab, 
    setActiveTab 
  } = useContext(WatchlistContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const totalEpisodes = watchlist.reduce(
    (total, anime) => total + anime.episodes,
    0
  );

  const activeEpisodes = watchlist.reduce(
    (total, anime) => total + (anime.progressEp || 0),
    0
  );

  const remainingEpisodes = totalEpisodes - activeEpisodes;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-theme-border shadow-md shadow-purple-950/5">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo Section */}
        <div 
          onClick={() => setActiveTab("Home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-theme-purple to-theme-pink flex items-center justify-center text-xl font-black tracking-tighter shadow-lg shadow-purple-500/30 text-white cursor-pointer relative group overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">A</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-widest text-theme-text font-display cursor-pointer hover:text-theme-pink transition-colors">
            ANIME<span className="text-theme-pink animate-pulse ml-1">UNIVERSE</span>
          </h1>
        </div>

        {/* Real-time Search Input */}
        <div className="flex-1 max-w-md md:max-w-lg relative hidden sm:block">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-theme-text-muted">
            <Search className="w-4.5 h-4.5 group-hover:text-theme-text transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search anime catalog, genres, studio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-12 pr-4 rounded-xl bg-theme-panel/50 hover:bg-theme-panel focus:bg-theme-panel border border-theme-border focus:border-theme-purple/40 text-sm text-theme-text placeholder-theme-text-muted transition-all shadow-inner"
          />
        </div>

        {/* Action Controls & Navigation Badges */}
        <div className="flex items-center gap-3.5 md:gap-5">
          
          <div className="flex items-center gap-1.5 md:gap-2.5">
            
            {/* Theme Toggle Button (Sun / Moon) */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-panel/80 transition-all cursor-pointer transform active:scale-90 relative overflow-hidden group shadow-sm"
              title={theme === "dark" ? "Switch to Light Cafe Theme" : "Switch to Dark Cyberpunk Theme"}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-theme-purple fill-theme-purple/10 transform rotate-0 scale-100 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500 fill-amber-500/10 transform rotate-0 scale-100 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110" />
                )}
              </div>
            </button>

            {/* Watchlist Quick Button */}
            <button
              onClick={() => setActiveTab("Watchlist")}
              className={`p-2.5 rounded-xl border transition-all relative cursor-pointer
                ${activeTab === "Watchlist" 
                  ? "bg-theme-purple/15 border-theme-purple/35 text-theme-purple" 
                  : "border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-panel/80"}`}
              title="Watchlist"
            >
              {watchlist.length > 0 ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
              {watchlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-theme-pink text-[10px] text-white font-extrabold flex items-center justify-center animate-pulse border-2 border-theme-panel shadow-md">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Total Episodes Left Badge (NEON SHIELD) */}
            <div className="hidden lg:flex items-center gap-2.5 bg-theme-panel border border-theme-border rounded-xl px-4 py-2 text-xs font-semibold text-theme-text shadow-sm shadow-purple-950/5">
              <Tv className="w-4 h-4 text-theme-pink" />
              <div className="space-y-0.5">
                <div className="text-[9px] text-theme-text-muted font-bold uppercase tracking-wider leading-none">Episodes Queued</div>
                <div className="text-sm font-black text-theme-text leading-none">
                  {remainingEpisodes > 0 ? remainingEpisodes : 0} <span className="text-[10px] font-bold text-theme-text-muted">eps</span>
                </div>
              </div>
            </div>

          </div>

          <div className="h-8 w-px bg-theme-border hidden sm:block" />

          {/* User Profile Avatar with Cyber Status Indicator */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
                alt="Profile Avatar"
                className="w-10 h-10 rounded-xl object-cover border border-theme-border group-hover:border-theme-pink transition-colors shadow-md"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-theme-panel shadow-[0_0_8px_#10b981]" />
            </div>
            <div className="hidden md:block text-left leading-tight">
              <div className="text-sm font-bold text-theme-text group-hover:text-theme-pink transition-colors">Nandeni</div>
              <div className="text-[10px] text-theme-purple font-black tracking-wide uppercase">
                {theme === "dark" ? "OTAKU ELITE" : "Mochiko Sensei"}
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
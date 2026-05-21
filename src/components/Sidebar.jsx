import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { ThemeContext } from "../context/ThemeContext";
import { 
  Home, 
  Bookmark, 
  Heart, 
  Filter,
  Tv
} from "lucide-react";

function Sidebar() {
  const { 
    activeTab, 
    setActiveTab, 
    activeGenre, 
    setActiveGenre,
    watchlist,
    favorites
  } = useContext(WatchlistContext);

  const { theme } = useContext(ThemeContext);

  const menuItems = [
    { name: "Home", icon: Home, count: null },
    { name: "Watchlist", icon: Bookmark, count: watchlist.length },
    { name: "Favorites", icon: Heart, count: favorites.length }
  ];

  const genres = ["All", "Action", "Fantasy", "Thriller", "Comedy"];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-6">
        
        {/* Navigation Menu */}
        <div className="glass-panel rounded-2xl p-4 space-y-2 shadow-lg shadow-purple-950/5">
          <p className="text-[11px] font-black text-theme-purple/80 tracking-widest uppercase px-3 mb-2 font-display">
            Menu Navigation
          </p>
          
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  if (item.name !== "Home") {
                    setActiveGenre("All");
                  }
                }}
                className={`
                  w-full flex items-center justify-between px-3 py-3 rounded-xl
                  transition-all duration-300 font-medium text-sm group cursor-pointer
                  ${isActive 
                    ? "bg-theme-purple/15 text-theme-purple border border-theme-purple/35 shadow-inner" 
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-panel/70 border border-transparent"}
                `}
              >
                <div className="flex items-center gap-3">
                  <IconComponent 
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 
                      ${isActive ? "text-theme-pink" : "text-theme-text-muted group-hover:text-theme-purple"}`} 
                  />
                  <span>{item.name}</span>
                </div>
                {item.count !== null && item.count > 0 && (
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black
                    ${isActive 
                      ? "bg-theme-pink text-white shadow-sm shadow-pink-500/40" 
                      : "bg-theme-panel border border-theme-border text-theme-purple"}`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Filter Section */}
        <div className="glass-panel rounded-2xl p-4 space-y-4 shadow-lg shadow-purple-950/5">
          <div className="flex items-center gap-2 px-3">
            <Filter className="w-4 h-4 text-theme-purple" />
            <p className="text-[11px] font-black text-theme-purple/80 tracking-widest uppercase font-display">
              Genre Catalog
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {genres.map((genre) => {
              const isActive = activeGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => {
                    setActiveGenre(genre);
                    setActiveTab("Home"); 
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left
                    transition-all duration-300 border cursor-pointer
                    ${isActive
                      ? "bg-gradient-to-r from-theme-purple/15 to-theme-pink/15 text-theme-purple border-theme-purple/35 shadow-md shadow-purple-950/5"
                      : "text-theme-text-muted hover:text-theme-text hover:bg-theme-panel/70 border-transparent"}
                  `}
                >
                  <span className={`w-2 h-2 rounded-full transition-all duration-500
                    ${isActive ? "bg-theme-pink scale-125 neon-glow" : "bg-theme-text-muted/50"}`} 
                  />
                  <span>{genre}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Info/Card */}
        <div className="glass-panel rounded-2xl p-4 shadow-lg shadow-purple-950/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-theme-purple/10 to-theme-pink/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative space-y-3 z-10">
            <div className="flex items-center gap-2 text-theme-pink text-xs font-black font-display uppercase tracking-wider">
              <Tv className="w-4 h-4 animate-bounce" />
              <span>
                {theme === "dark" ? "Cyber Binge Master" : "Cafe Origami Tier"}
              </span>
            </div>
            <p className="text-xs text-theme-text-muted leading-relaxed">
              Track episodes seamlessly, sync your watchlist, and unlock custom premium anime themes.
            </p>
            <div className="pt-2">
              <div className="w-full bg-theme-panel border border-theme-border rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-theme-purple to-theme-pink h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(236,72,153,0.3)]" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-theme-text-muted mt-1.5 font-bold">
                <span>Rank: Otaku Master</span>
                <span>85%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;

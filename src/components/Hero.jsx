import { useContext, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { ThemeContext } from "../context/ThemeContext";
import { Play, Plus, Trash2, Heart, Star, Calendar, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Hero({ anime }) {
  const { 
    watchlist, 
    addToWatchlist, 
    removeFromWatchlist, 
    favorites, 
    toggleFavorite 
  } = useContext(WatchlistContext);

  const { theme } = useContext(ThemeContext);
  const [imageError, setImageError] = useState(false);

  if (!anime) return null;

  const isAdded = watchlist.some((item) => item.id === anime.id);
  const isFavorite = favorites.includes(anime.id);

  // Gradient styles using CSS variable to blend image into the active background dynamically
  const gradientTStyle = {
    backgroundImage: `linear-gradient(to top, var(--bg-gradient-start) 0%, rgba(9, 5, 20, 0.2) 60%, transparent 100%)`
  };
  const gradientLStyle = {
    backgroundImage: `linear-gradient(to right, var(--bg-gradient-start) 0%, rgba(9, 5, 20, 0.3) 50%, transparent 100%)`
  };
  const gradientBStyle = {
    backgroundImage: `linear-gradient(to bottom, transparent 0%, var(--bg-gradient-start) 90%)`
  };

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-theme-border shadow-2xl min-h-[480px] flex items-end">
      
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0 bg-[#05020c]">
        {imageError ? (
          /* Cinematic fallback background overlay */
          <div className="w-full h-full bg-gradient-to-br from-[#120524] via-[#090514] to-[#1e083c] relative flex items-center justify-center opacity-85">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#a855f7]/15 via-transparent to-transparent pointer-events-none" />
            <Tv className="w-32 h-32 text-theme-purple/20 animate-pulse" />
          </div>
        ) : (
          <img 
            src={anime.bannerImage || anime.coverImage} 
            alt={anime.title} 
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center scale-[1.01] brightness-[0.72] contrast-[1.05]"
          />
        )}
        
        {/* Adaptive Gradients to Blend Banner into active theme backgrounds */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={gradientTStyle} />
        <div className="absolute inset-0 z-10 pointer-events-none" style={gradientLStyle} />
        <div className="absolute inset-0 z-10 pointer-events-none" style={gradientBStyle} />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 p-8 md:p-12 w-full max-w-3xl space-y-6">
        
        {/* Spotlight Label & Tags */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-theme-purple to-theme-pink text-white font-extrabold px-3 py-1 font-display tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-pink-500/20 border-0">
            <Star className="w-3.5 h-3.5 fill-white" />
            SPOTLIGHT
          </Badge>
          <Badge className="bg-theme-panel/75 backdrop-blur-md text-theme-purple border border-theme-border font-extrabold px-3 py-1 text-xs">
            {anime.genre}
          </Badge>
          <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-theme-panel/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-theme-border shadow-sm">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span>{anime.rating}</span>
          </div>
        </div>

        {/* Anime Title */}
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          {anime.title}
        </h1>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-200 font-bold drop-shadow-md">
          <span className="flex items-center gap-1.5 text-theme-text-muted bg-theme-panel/60 px-2.5 py-1 rounded-lg border border-theme-border">
            <Calendar className="w-4 h-4 text-theme-purple" />
            {anime.year}
          </span>
          <span className="flex items-center gap-1.5 text-theme-text-muted bg-theme-panel/60 px-2.5 py-1 rounded-lg border border-theme-border">
            <Tv className="w-4 h-4 text-theme-pink" />
            {anime.studio}
          </span>
          <span className="px-2 py-0.5 rounded bg-theme-panel border border-theme-border text-theme-purple font-black uppercase text-[10px]">
            {anime.status}
          </span>
          <span className="text-theme-pink font-extrabold">
            {anime.episodes} Episodes
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] line-clamp-3 md:line-clamp-none">
          {anime.description}
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          
          {/* Watch Now Button */}
          <Button 
            className="h-12 px-8 bg-gradient-to-r from-theme-purple to-theme-pink hover:brightness-110 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 transform hover:scale-[1.03] flex items-center gap-2 cursor-pointer border-0"
          >
            <Play className="w-5 h-5 fill-white text-white" />
            <span>Watch Now</span>
          </Button>

          {/* Add / Remove Watchlist */}
          {isAdded ? (
            <Button 
              variant="outline"
              onClick={() => removeFromWatchlist(anime.id)}
              className="h-12 px-6 border-theme-pink/40 text-theme-pink hover:bg-theme-pink/10 backdrop-blur-md rounded-xl font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer bg-theme-panel/40"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove watchlist</span>
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={() => addToWatchlist(anime)}
              className="h-12 px-6 border-theme-purple/30 text-theme-text hover:bg-theme-purple/10 backdrop-blur-md rounded-xl font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer bg-theme-panel/40"
            >
              <Plus className="w-4 h-4" />
              <span>Add Watchlist</span>
            </Button>
          )}

          {/* Favorite Toggle Button */}
          <button 
            onClick={() => toggleFavorite(anime.id)}
            className={`
              w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 backdrop-blur-md cursor-pointer
              ${isFavorite 
                ? "bg-theme-pink/20 border-theme-pink text-theme-pink shadow-[0_0_15px_rgba(236,72,153,0.3)]" 
                : "border-theme-border text-theme-text-muted hover:text-white hover:bg-theme-panel"}
            `}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-theme-pink animate-pulse" : ""}`} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default Hero;

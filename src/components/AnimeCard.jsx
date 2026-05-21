import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContext, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Star, Heart, Bookmark, BookmarkCheck, Plus, Minus, Tv, Trash2, Play } from "lucide-react";

function AnimeCard({ anime, onSelect }) {
  const {
    watchlist,
    favorites,
    addToWatchlist,
    removeFromWatchlist,
    toggleFavorite,
    updateEpisodeProgress,
    activeTab
  } = useContext(WatchlistContext);

  const [imageError, setImageError] = useState(false);

  const isAdded = watchlist.some((item) => item.id === anime.id);
  const isFavorite = favorites.includes(anime.id);
  
  const watchlistAnime = watchlist.find((item) => item.id === anime.id);
  const currentProgress = watchlistAnime ? (watchlistAnime.progressEp || 0) : 0;

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    if (isAdded) {
      removeFromWatchlist(anime.id);
    } else {
      addToWatchlist(anime);
    }
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    toggleFavorite(anime.id);
  };

  const adjustProgress = (e, amount) => {
    e.stopPropagation();
    updateEpisodeProgress(anime.id, currentProgress + amount);
  };

  return (
    <Card 
      onClick={() => onSelect(anime)}
      className="
        bg-theme-panel/80 backdrop-blur-xl
        border border-theme-border hover:border-theme-purple/50
        text-theme-text rounded-2xl overflow-hidden
        transition-all duration-500 hover:-translate-y-2
        hover:shadow-lg hover:shadow-theme-purple/20 group cursor-pointer
        flex flex-col h-full
      "
    >
      {/* Poster Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-theme-panel z-0 shrink-0">
        
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-theme-card to-theme-bg relative">
            <Tv className="w-10 h-10 text-theme-purple/50 mb-3 animate-pulse" />
            <span className="font-display font-extrabold text-sm tracking-tight leading-snug line-clamp-2">
              {anime.title}
            </span>
          </div>
        ) : (
          <img
            src={anime.bannerImage || anime.coverImage}
            alt={anime.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
          />
        )}

        {/* Cinematic Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/90 via-transparent to-black/30 z-10 pointer-events-none" />

        {/* Floating Studio Badge (Top Left) */}
        <div className="absolute top-2.5 left-2.5 z-20 bg-theme-purple/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-white font-extrabold border border-white/20 uppercase tracking-wider shadow-md">
          {anime.studio || "Studio"}
        </div>
      </div>

      {/* Card Contents - Bottom Info Section */}
      <CardContent className="p-4 flex flex-col flex-1 justify-between gap-3 bg-theme-panel/40 relative z-20 -mt-4 rounded-t-2xl">
        
        <div className="space-y-2">
          {/* Title Row */}
          <h3 className="text-lg font-black tracking-tight text-theme-text group-hover:text-theme-pink transition-colors line-clamp-1 leading-tight">
            {anime.title}
          </h3>
          
          {/* Genre & Rating Row */}
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <Badge className="bg-theme-purple/10 text-theme-purple border border-theme-border px-2 py-0.5 uppercase tracking-wide">
              {anime.genre}
            </Badge>
            <div className="flex items-center gap-1 text-[11px] font-black text-yellow-500">
              <Star className="w-3.5 h-3.5 fill-yellow-500" />
              <span>{anime.rating}</span>
            </div>
          </div>
          
          <p className="text-[11px] text-theme-text-muted font-normal leading-relaxed line-clamp-2 min-h-[34px]">
            {anime.description}
          </p>
        </div>

        {/* Dynamic Episode Progress Panel */}
        {isAdded ? (
          <div className="bg-theme-card/50 rounded-lg p-2 border border-theme-border flex items-center justify-between gap-2 mt-auto">
            <span className="text-[10px] text-theme-text-muted flex items-center gap-1 font-semibold">
              <Tv className="w-3 h-3 text-theme-purple" /> {currentProgress}/{anime.episodes}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => adjustProgress(e, -1)}
                disabled={currentProgress === 0}
                className="w-6 h-6 rounded bg-theme-bg hover:bg-theme-border disabled:opacity-30 flex items-center justify-center transition-all border border-theme-border text-theme-text cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => adjustProgress(e, 1)}
                disabled={currentProgress === anime.episodes}
                className="w-6 h-6 rounded bg-theme-purple/20 hover:bg-theme-purple text-theme-purple hover:text-white disabled:opacity-30 flex items-center justify-center transition-all border border-theme-purple/30 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-[11px] font-semibold text-theme-text-muted mt-auto pt-2">
            <span className="flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5" /> 
              <span>{anime.episodes} episodes</span>
            </span>
            <span className="uppercase tracking-widest text-[9px] text-theme-purple font-bold">
              {anime.status}
            </span>
          </div>
        )}

        {/* Action Buttons Container (Watchlist + Favorite) */}
        <div className="flex items-center gap-2 pt-2 mt-2 border-t border-theme-border">
          {/* Play Continue Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isAdded) addToWatchlist(anime);
              // Trigger play logic here if needed
            }}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer
              ${isAdded 
                ? "bg-theme-purple border-theme-purple text-white shadow-lg shadow-purple-500/20 hover:brightness-110" 
                : "bg-theme-bg/50 border-theme-border text-theme-text hover:text-white hover:bg-theme-border"}
            `}
          >
            {isAdded ? <Play className="w-4 h-4 fill-white" /> : <Bookmark className="w-4 h-4" />}
            {isAdded ? "Continue" : "Watchlist"}
          </button>

          {/* Remove/Toggle Button (Trash icon if added/favorite, Heart if not) */}
          <button
            onClick={(e) => {
               e.stopPropagation();
               if (activeTab === "Favorites") {
                 handleFavoriteToggle(e);
               } else if (isAdded) {
                 removeFromWatchlist(anime.id);
               } else {
                 handleFavoriteToggle(e);
               }
            }}
            className={`
              w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl border transition-all cursor-pointer
              ${(isAdded || isFavorite)
                ? "border-pink-500/20 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 hover:text-pink-400 shadow-md shadow-pink-900/10" 
                : "bg-theme-bg/50 border-theme-border text-theme-text hover:text-white hover:bg-theme-border"}
            `}
          >
            {(isAdded || isFavorite) ? <Trash2 className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
          </button>
        </div>

      </CardContent>
    </Card>
  );
}

export default AnimeCard;
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContext, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Star, Heart, Bookmark, BookmarkCheck, Plus, Minus, Tv, Trash2, Play } from "lucide-react";

function HorizontalAnimeCard({ anime, onSelect }) {
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
        transition-all duration-500 hover:-translate-y-1
        hover:shadow-lg hover:shadow-theme-purple/20 group cursor-pointer
        flex flex-col sm:flex-row w-full min-h-[160px]
      "
    >
      {/* Poster Image (Left Side) */}
      <div className="relative w-full sm:w-[240px] shrink-0 overflow-hidden bg-theme-bg">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <Tv className="w-8 h-8 text-theme-purple/50 mb-2 animate-pulse" />
          </div>
        ) : (
          <img
            src={anime.bannerImage || anime.coverImage}
            alt={anime.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        
        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <div className="w-12 h-12 rounded-full bg-theme-pink/90 flex items-center justify-center shadow-lg shadow-pink-500/50 transform scale-75 group-hover:scale-100 transition-transform">
             <Play className="w-5 h-5 text-white fill-white ml-1" />
           </div>
        </div>

        {/* Floating Studio Badge */}
        <div className="absolute top-2 left-2 z-20 bg-theme-purple/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] text-white font-extrabold border border-white/20 uppercase tracking-wider shadow-md">
          {anime.studio || "Studio"}
        </div>
      </div>

      {/* Info & Actions (Right Side) */}
      <CardContent className="p-4 flex flex-1 flex-col sm:flex-row gap-4 justify-between relative z-20 items-center">
        
        {/* Anime Details */}
        <div className="space-y-2 flex-1 w-full">
          <h3 className="text-lg font-black tracking-tight text-theme-text group-hover:text-theme-pink transition-colors line-clamp-1 leading-tight">
            {anime.title}
          </h3>
          
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <Badge className="bg-theme-purple/10 text-theme-purple border border-theme-border px-2 py-0.5 uppercase tracking-wide">
              {anime.genre}
            </Badge>
            <div className="flex items-center gap-1 text-[11px] font-black text-yellow-500">
              <Star className="w-3.5 h-3.5 fill-yellow-500" />
              <span>{anime.rating}</span>
            </div>
            <span className="text-theme-text-muted flex items-center gap-1">
               <Tv className="w-3.5 h-3.5" /> {anime.episodes} eps
            </span>
          </div>
          
          <p className="text-xs text-theme-text-muted font-normal leading-relaxed line-clamp-2">
            {anime.description}
          </p>

          {/* Episode Tracker Progress Bar (For Watchlist) */}
          {activeTab === "Watchlist" && isAdded && (
            <div className="mt-3 pt-3 border-t border-theme-border flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-theme-text-muted">Progress</span>
                 <span className="text-theme-pink font-display">Ep {currentProgress} / {anime.episodes}</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex-1 bg-theme-bg h-1.5 rounded-full overflow-hidden">
                   <div 
                     className="bg-gradient-to-r from-theme-purple to-theme-pink h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                     style={{ width: `${Math.round((currentProgress / anime.episodes) * 100)}%` }}
                   />
                 </div>
                 {/* Quick increment buttons */}
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
            </div>
          )}
        </div>

        {/* Action Buttons Column */}
        <div className="flex sm:flex-col items-center gap-2 w-full sm:w-[160px] shrink-0 border-t sm:border-t-0 sm:border-l border-theme-border pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0 h-full justify-center">
          
          <button
            onClick={handleWatchlistToggle}
            className={`
              w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer
              ${isAdded 
                ? "bg-theme-purple border-theme-purple text-white shadow-lg shadow-purple-500/20" 
                : "bg-theme-bg/50 border-theme-border text-theme-text hover:text-white hover:bg-theme-border"}
            `}
          >
            {isAdded ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {isAdded ? "In Watchlist" : "Watchlist"}
          </button>

          {activeTab === "Favorites" ? (
             <button
               onClick={handleFavoriteToggle}
               className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border border-pink-500/20 bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 hover:text-pink-400 cursor-pointer shadow-md shadow-pink-900/10"
             >
               <Trash2 className="w-4 h-4" />
               Remove
             </button>
          ) : (
             <button
               onClick={handleFavoriteToggle}
               className={`
                 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer
                 ${isFavorite 
                   ? "bg-theme-pink border-theme-pink text-white shadow-lg shadow-pink-500/20" 
                   : "bg-theme-bg/50 border-theme-border text-theme-text hover:text-white hover:bg-theme-border"}
               `}
             >
               <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
               {isFavorite ? "Favorited" : "Favorite"}
             </button>
          )}
          
        </div>

      </CardContent>
    </Card>
  );
}

export default HorizontalAnimeCard;

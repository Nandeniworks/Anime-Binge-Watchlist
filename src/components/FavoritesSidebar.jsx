import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Trash2, MessageSquare } from "lucide-react";

function FavoriteMiniCard({ anime }) {
  const { toggleFavorite } = useContext(WatchlistContext);
  
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-theme-panel/50 border border-transparent hover:border-theme-border transition-all group">
      {/* Thumbnail */}
      <img 
        src={anime.coverImage} 
        alt={anime.title} 
        className="w-12 h-12 rounded-lg object-cover bg-theme-panel"
      />
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-theme-text truncate group-hover:text-theme-pink transition-colors">
          {anime.title}
        </h4>
        <p className="text-[10px] text-theme-text-muted truncate">
          {anime.studio || "Studio"} • {anime.episodes} episodes
        </p>
      </div>

      {/* Remove Action */}
      <button 
        onClick={() => toggleFavorite(anime.id)}
        className="px-2 py-1.5 rounded-lg border border-pink-500/20 bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white transition-all text-[10px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <Trash2 className="w-3 h-3" />
        Remove
      </button>
    </div>
  );
}

function FavoritesSidebar({ animeList }) {
  const { favorites, setFavorites } = useContext(WatchlistContext);
  
  const favoriteAnimes = animeList.filter(a => favorites.includes(a.id));

  return (
    <div className="w-full xl:w-[320px] shrink-0 space-y-6">
      
      {/* Live Chat Lobby Block */}
      <div className="glass-panel rounded-2xl p-5 border-theme-border flex flex-col gap-3 shadow-lg shadow-purple-900/5">
        <div className="flex justify-between items-center">
           <h3 className="text-sm font-black text-theme-text flex items-center gap-2">
             <MessageSquare className="w-4 h-4 text-theme-pink" />
             LIVE CHAT LOBBY
           </h3>
           <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <p className="text-xs text-theme-text-muted leading-relaxed">
          Join 12,420 other Otakus discussing the latest episodes in real-time!
        </p>
        <button className="w-full py-2 rounded-xl bg-theme-purple/10 hover:bg-theme-purple border border-theme-purple/20 text-theme-purple hover:text-white font-bold text-xs transition-all cursor-pointer">
          Enter Chat Lobby
        </button>
      </div>

      {/* My Favorites Library Block */}
      <div className="glass-panel rounded-2xl p-4 border-theme-border flex flex-col shadow-lg shadow-purple-900/5">
        <div className="flex justify-between items-center mb-4 px-2">
           <h3 className="text-sm font-black text-theme-text uppercase">My Favorites Library</h3>
           <span className="text-[10px] text-theme-purple font-bold px-2 py-0.5 rounded-md bg-theme-purple/10 border border-theme-purple/20">
             {favoriteAnimes.length} Shows
           </span>
        </div>
        
        <div className="flex flex-col gap-1 max-h-[500px] overflow-y-auto no-scrollbar">
          {favoriteAnimes.length > 0 ? (
            favoriteAnimes.map(anime => (
              <FavoriteMiniCard key={anime.id} anime={anime} />
            ))
          ) : (
            <div className="py-8 text-center text-xs text-theme-text-muted">
              No favorites yet. Start hearting!
            </div>
          )}
        </div>

        {favoriteAnimes.length > 0 && (
          <button 
            onClick={() => setFavorites([])}
            className="w-full mt-4 py-2 rounded-xl text-theme-pink hover:bg-theme-pink/10 font-bold text-xs transition-all cursor-pointer border border-transparent hover:border-pink-500/20"
          >
            Clear All Favorites
          </button>
        )}
      </div>

    </div>
  );
}

export default FavoritesSidebar;

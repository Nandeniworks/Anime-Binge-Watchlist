import { useState } from "react";
import { Flame, Star, Newspaper, MessageSquare, Tv } from "lucide-react";

function TrendingItem({ anime, onSelect }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      onClick={() => onSelect && onSelect(anime.id)}
      className="flex items-center justify-between gap-3 p-2 rounded-xl border border-transparent hover:border-theme-border hover:bg-theme-panel/60 transition-all duration-300 group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl font-black text-theme-purple/30 tracking-wider group-hover:text-theme-purple font-display">
          {anime.rank}
        </span>
        
        <div className="w-12 h-16 bg-purple-950/20 rounded-lg overflow-hidden flex-shrink-0 border border-theme-border">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#120524] to-[#090514]">
              <Tv className="w-4 h-4 text-theme-purple/40" />
            </div>
          ) : (
            <img 
              src={anime.cover} 
              alt={anime.title} 
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold text-theme-text group-hover:text-theme-pink transition-colors line-clamp-1">
            {anime.title}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-theme-text-muted bg-theme-panel border border-theme-border px-2 py-0.5 rounded">
              {anime.genre}
            </span>
            <div className="flex items-center gap-0.5 text-[10px] text-yellow-500 font-bold">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{anime.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendingSidebar({ onSelectAnime, animeDataList }) {
  const trendingAnime = [
    {
      id: 3, // Solo Leveling
      title: "Solo Leveling",
      genre: "Action",
      rating: 4.8,
      cover: "https://media.kitsu.app/anime/46231/poster_image/large-cdadff31f42490b9f48a035939a01a92.jpeg",
      rank: "01"
    },
    {
      id: 8, // Bleach TYBW
      title: "Bleach TYBW",
      genre: "Action",
      rating: 4.9,
      cover: "https://media.kitsu.app/anime/43078/poster_image/large-bf36dc3ed0097c8b8c49e064bf0eaa79.jpeg",
      rank: "02"
    },
    {
      id: 7, // Chainsaw Man
      title: "Chainsaw Man",
      genre: "Action",
      rating: 4.7,
      cover: "https://media.kitsu.app/anime/43806/poster_image/large-815d6008fb3b56f4291b9f0ffa05cd8f.jpeg",
      rank: "03"
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: "Solo Leveling Season 2 confirmed for Fall 2026",
      source: "Crunchyroll",
      time: "2h ago"
    },
    {
      id: 2,
      title: "Chainsaw Man - Reze Arc movie drops new visual keys",
      source: "MAPPA Studio",
      time: "5h ago"
    },
    {
      id: 3,
      title: "Bleach: Thousand-Year Blood War Part 3 final teaser released",
      source: "Pierrot",
      time: "1d ago"
    }
  ];

  const handleSelect = (id) => {
    const found = animeDataList.find(a => a.id === id);
    if (found && onSelectAnime) {
      onSelectAnime(found);
    }
  };

  return (
    <aside className="w-full xl:w-80 flex-shrink-0 space-y-6">
      
      {/* Trending Now Panel */}
      <div className="glass-panel rounded-2xl p-5 shadow-lg shadow-purple-950/5">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-theme-pink fill-theme-pink/15" />
          <h3 className="text-md font-bold tracking-tight text-theme-text font-display uppercase">
            Trending Now
          </h3>
        </div>

        <div className="space-y-4">
          {trendingAnime.map((anime) => (
            <TrendingItem 
              key={anime.id} 
              anime={anime} 
              onSelect={handleSelect} 
            />
          ))}
        </div>
      </div>

      {/* Latest News / Announcements Panel */}
      <div className="glass-panel rounded-2xl p-5 shadow-lg shadow-purple-950/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-theme-pink/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="w-5 h-5 text-theme-purple" />
          <h3 className="text-md font-bold tracking-tight text-theme-text font-display uppercase">
            Anime Bulletin
          </h3>
        </div>

        <div className="space-y-4">
          {newsItems.map((news) => (
            <div 
              key={news.id} 
              className="p-3 rounded-xl bg-theme-panel/40 border border-theme-border hover:border-theme-purple/20 transition-all duration-300 space-y-1.5"
            >
              <h4 className="text-xs font-bold text-theme-text leading-snug line-clamp-2 hover:text-theme-purple cursor-pointer">
                {news.title}
              </h4>
              <div className="flex justify-between items-center text-[10px] text-theme-purple font-bold">
                <span>{news.source}</span>
                <span className="text-theme-text-muted font-normal">{news.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fan Discussion Card */}
      <div className="glass-panel rounded-2xl p-5 shadow-lg shadow-purple-950/5 border border-theme-pink/10">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-theme-pink" />
          <h4 className="text-xs font-black tracking-wider uppercase text-theme-pink font-display">
            Live Chat Lobby
          </h4>
        </div>
        <p className="text-xs text-theme-text-muted leading-relaxed mb-3">
          Join 12,420 other Otakus discussing the latest episodes in real-time!
        </p>
        <button className="w-full py-2 bg-theme-purple/10 hover:bg-theme-purple/20 border border-theme-purple/25 rounded-xl text-xs font-bold text-theme-purple transition-all duration-300 cursor-pointer">
          Enter Chat Lobby
        </button>
      </div>

    </aside>
  );
}

export default TrendingSidebar;

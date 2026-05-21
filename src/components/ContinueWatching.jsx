import { useContext, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { Play, ChevronRight, CheckCircle, Tv } from "lucide-react";

function ContinueWatchingItem({ anime, onSelect }) {
  const { updateEpisodeProgress } = useContext(WatchlistContext);
  const [imageError, setImageError] = useState(false);

  const progress = anime.progressEp || 0;
  const percentage = Math.round((progress / anime.episodes) * 100);

  const handleIncrement = (e) => {
    e.stopPropagation(); // Prevent choosing as featured hero
    updateEpisodeProgress(anime.id, progress + 1);
  };

  return (
    <div
      onClick={() => onSelect && onSelect(anime)}
      className="flex-shrink-0 w-72 snap-start glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer relative"
    >
      {/* Thumbnail Container */}
      <div className="relative h-40 w-full overflow-hidden bg-purple-950/20">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#120524] to-[#090514] text-center p-4">
            <Tv className="w-6 h-6 text-purple-500/40 mb-1.5" />
            <span className="font-display font-black text-xs text-gray-300 truncate w-full px-2">
              {anime.title}
            </span>
          </div>
        ) : (
          <img
            src={anime.bannerImage || anime.coverImage}
            alt={anime.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-75"
          />
        )}

        {/* Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Hover Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Episode Tag in Corner */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-pink-300 font-bold border border-white/10">
          EPISODE {progress}
        </div>
      </div>

      {/* Progress Detail */}
      <div className="p-4 space-y-3 bg-black/40">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-0.5 flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors truncate">
              {anime.title}
            </h4>
            <p className="text-[10px] text-gray-400 font-medium">
              Episode {progress} of {anime.episodes}
            </p>
          </div>

          {/* +1 Episode Quick Trigger Button */}
          <button
            onClick={handleIncrement}
            className="w-7 h-7 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-white flex items-center justify-center transition-all border border-purple-500/20 hover:border-transparent cursor-pointer shadow-sm flex-shrink-0"
            title="Quick log +1 Episode watched"
          >
            {progress === anime.episodes ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <span className="text-xs font-extrabold font-display">+1</span>
            )}
          </button>
        </div>

        {/* Custom Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, percentage)}%` }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-gray-400 font-bold">
            <span>PROGRESS</span>
            <span>{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContinueWatching({ onSelectAnime }) {
  const { watchlist } = useContext(WatchlistContext);

  // Fallbacks if user hasn't added any shows
  const displayList = watchlist.length > 0 
    ? watchlist 
    : [
        {
          id: 1,
          title: "Jujutsu Kaisen",
          genre: "Action",
          episodes: 47,
          progressEp: 6,
          coverImage: "https://media.kitsu.app/anime/42765/poster_image/large-5ce19551c1a6cf995b378205b9149b5c.jpeg",
          bannerImage: "https://media.kitsu.app/anime/cover_images/42765/large.jpg"
        },
        {
          id: 2,
          title: "Attack on Titan",
          genre: "Action",
          episodes: 87,
          progressEp: 12,
          coverImage: "https://media.kitsu.app/anime/poster_images/7442/large.jpg",
          bannerImage: "https://media.kitsu.app/anime/cover_images/7442/large.jpg"
        },
        {
          id: 4,
          title: "Demon Slayer",
          genre: "Fantasy",
          episodes: 55,
          progressEp: 4,
          coverImage: "https://media.kitsu.app/anime/poster_images/41370/large.jpg",
          bannerImage: "https://media.kitsu.app/anime/41370/cover_image/large-3de3cc6d2b33162c928de10aa201e4ba.jpeg"
        }
      ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-pink-500 rounded-full neon-glow" />
          <h3 className="text-xl font-bold tracking-tight text-theme-text font-display uppercase">
            Continue Watching
          </h3>
        </div>
        <span className="text-xs text-theme-purple font-bold hover:text-theme-pink cursor-pointer flex items-center gap-0.5">
          View All <ChevronRight className="w-4 h-4" />
        </span>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar">
        {displayList.map((anime) => (
          <ContinueWatchingItem 
            key={anime.id} 
            anime={anime} 
            onSelect={onSelectAnime} 
          />
        ))}
      </div>
    </div>
  );
}

export default ContinueWatching;

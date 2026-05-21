import {
  createContext,
  useState,
  useEffect
} from "react";

export const WatchlistContext = createContext();

function WatchlistProvider({ children }) {
  // Watchlist State
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // UI Navigation and Filter States
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  // Persist Watchlist
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add to Watchlist
  function addToWatchlist(anime) {
    if (watchlist.some((item) => item.id === anime.id)) return;
    setWatchlist([
      ...watchlist,
      { ...anime, progressEp: anime.progressEp || 0 }
    ]);
  }

  // Remove from Watchlist
  function removeFromWatchlist(id) {
    setWatchlist(watchlist.filter((anime) => anime.id !== id));
  }

  // Toggle Favorite Status
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  // Update Episode Progress
  function updateEpisodeProgress(id, progress) {
    setWatchlist(
      watchlist.map((anime) => {
        if (anime.id === id) {
          const clampedProgress = Math.min(
            anime.episodes,
            Math.max(0, progress)
          );
          return { ...anime, progressEp: clampedProgress };
        }
        return anime;
      })
    );
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        favorites,
        setFavorites,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        activeGenre,
        setActiveGenre,
        addToWatchlist,
        removeFromWatchlist,
        toggleFavorite,
        updateEpisodeProgress
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistProvider;
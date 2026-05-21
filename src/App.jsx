import { useEffect, useState, useContext } from "react";
import animeData from "./data/AnimeData";
import AnimeCard from "./components/AnimeCard";
import HorizontalAnimeCard from "./components/HorizontalAnimeCard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import TrendingSidebar from "./components/TrendingSidebar";
import ContinueWatching from "./components/ContinueWatching";
import { WatchlistContext } from "./context/WatchlistContext";
import { ThemeContext } from "./context/ThemeContext";
import { Grid, Sparkles, AlertCircle, RefreshCw, Bookmark, Heart, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredAnime, setFeaturedAnime] = useState(null);

  // Consume Global State Context
  const { theme } = useContext(ThemeContext);
  const {
    watchlist,
    favorites,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    activeGenre,
    setActiveGenre
  } = useContext(WatchlistContext);

  // Mock API Loading Skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimeList(animeData);
      
      // Select default spotlight hero (Jujutsu Kaisen, which has ID 1)
      const defaultFeatured = animeData.find(a => a.id === 1) || animeData[0];
      setFeaturedAnime(defaultFeatured);
      
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Filter Logic: Search query + Genre filter + Active tab filter
  const filteredAnime = animeList.filter((anime) => {
    // 1. Filter by Active Navigation Tab (Home vs Watchlist vs Favorites)
    if (activeTab === "Watchlist") {
      const isInWatchlist = watchlist.some((w) => w.id === anime.id);
      if (!isInWatchlist) return false;
    } else if (activeTab === "Favorites") {
      const isFavorited = favorites.includes(anime.id);
      if (!isFavorited) return false;
    }

    // 2. Filter by Quick Genre Pill Buttons (if not All)
    if (activeGenre !== "All" && anime.genre !== activeGenre) {
      return false;
    }

    // 3. Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchTitle = anime.title.toLowerCase().includes(query);
      const matchGenre = anime.genre.toLowerCase().includes(query);
      const matchStudio = anime.studio?.toLowerCase().includes(query) || false;
      const matchDesc = anime.description?.toLowerCase().includes(query) || false;
      
      return matchTitle || matchGenre || matchStudio || matchDesc;
    }

    return true;
  });

  // Action: Select show as active Hero Spotlight
  const handleSelectFeatured = (anime) => {
    // Find the full details in our animeList
    const fullDetail = animeList.find((a) => a.id === anime.id) || anime;
    setFeaturedAnime(fullDetail);
    
    // Smooth scroll back to top of the dashboard hero section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setActiveTab("Home");
    setActiveGenre("All");
    setSearchQuery("");
  };

  // Futuristic loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-theme-panel to-theme-card text-theme-text p-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-purple/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-pink/5 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative flex flex-col items-center gap-6 z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-theme-purple to-theme-pink flex items-center justify-center text-3xl font-black tracking-tighter animate-spin shadow-lg shadow-purple-500/20 text-white">
            A
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-black tracking-widest font-display bg-gradient-to-r from-theme-purple to-theme-pink bg-clip-text text-transparent">
              LOADING SYSTEM
            </h2>
            <p className="text-xs text-theme-purple font-bold uppercase tracking-wider animate-pulse flex items-center gap-2 justify-center">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Synchronizing Anime Database...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      
      {/* Global Cinematic Anime Banner behind Hero */}
      <div className="absolute top-0 inset-x-0 h-[70vh] w-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-theme-panel/40 z-10 mix-blend-overlay" />
        <img 
          src={theme === "light" 
            ? "https://media.kitsu.app/anime/43078/cover_image/large-45a93d1d5a68cf93aa314a9efbe8bf72.jpeg" // Bleach TYBW
            : "https://media.kitsu.app/anime/43248/cover_image/large-0438973fb0b000f9782294827beea9dd.jpeg" // Cyberpunk Edgerunners
          }
          alt="Cinematic Background" 
          className="w-full h-full object-cover object-top opacity-40 blur-[2px] transform scale-105"
        />
        {/* Smooth fade edges into background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-card/60 to-theme-bg z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-theme-bg via-transparent to-theme-bg z-20 opacity-80" />
      </div>

      {/* Premium Glass Sticky Navbar */}
      <Navbar />

      {/* Main Core Dashboard Layout */}
      <main className="flex-1 max-w-[1500px] w-full mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        
        {/* Left Column: Floating Sidebar Menu (Hidden on md, shown on lg) */}
        <Sidebar />

        {/* Center Column: Main Stream Feed */}
        <div className="flex-1 space-y-8 overflow-hidden">

          {/* Spotlight Hero Banner (only shows if we have an active spotlight show selected) */}
          {featuredAnime && (
            <Hero anime={featuredAnime} />
          )}

          {/* Continue Watching Section */}
          <ContinueWatching onSelectAnime={handleSelectFeatured} />

          {/* Catalog Grid Header & Genre horizontal pill scroll for mobile/tablet */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Category Title */}
              <div className="flex items-center gap-2.5">
                <Grid className="w-5 h-5 text-theme-pink" />
                <h3 className="text-2xl font-black tracking-tight text-theme-text font-display uppercase">
                  {activeTab === "Home" && activeGenre === "All" && "All Anime Catalog"}
                  {activeTab === "Home" && activeGenre !== "All" && `${activeGenre} Anime`}
                  {activeTab === "Watchlist" && "My Watching Queue"}
                  {activeTab === "Favorites" && "My Favorites Library"}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-theme-panel border border-theme-border text-theme-purple font-extrabold shadow-sm">
                  {filteredAnime.length} Shows
                </span>
              </div>

              {/* Reset filter shortcut if search/filters are active */}
              {(activeGenre !== "All" || activeTab !== "Home" || searchQuery !== "") && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-theme-pink font-bold hover:underline self-start sm:self-auto cursor-pointer"
                >
                  Clear Filters & Show All
                </button>
              )}
            </div>

            {/* Horizontal genre pills for responsive smaller screens (hidden on lg since Sidebar has them) */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:hidden">
              {["All", "Action", "Fantasy", "Thriller", "Comedy"].map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setActiveGenre(genre);
                    setActiveTab("Home");
                  }}
                  className={`
                    px-4 py-2 text-xs font-bold rounded-xl transition-all border flex-shrink-0 cursor-pointer
                    ${activeGenre === genre
                      ? "bg-gradient-to-r from-theme-purple to-theme-pink text-white border-transparent shadow-md shadow-pink-500/25"
                      : "bg-theme-panel/70 border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-panel"}`}
                >
                  {genre}
                </button>
              ))}

            </div>
          </div>

          {/* Catalog Grid View */}
          {/* Catalog Grid View */}
          {filteredAnime.length > 0 ? (
            <div className={
              activeTab === "Watchlist" || activeTab === "Favorites"
                ? "grid grid-cols-1 xl:grid-cols-2 gap-6 pb-16"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16"
            }>
              {filteredAnime.map((anime) => {
                if (activeTab === "Watchlist" || activeTab === "Favorites") {
                  return (
                    <HorizontalAnimeCard
                      key={anime.id}
                      anime={anime}
                      onSelect={handleSelectFeatured}
                    />
                  );
                }
                return (
                  <AnimeCard
                    key={anime.id}
                    anime={anime}
                    onSelect={handleSelectFeatured}
                  />
                );
              })}
            </div>
          ) : (
            /* Glass Empty State Banner */
            <div className="glass-panel rounded-3xl p-12 text-center space-y-6 max-w-xl mx-auto border-theme-border shadow-xl shadow-purple-950/5">
              <div className="w-16 h-16 rounded-2xl bg-theme-purple/10 border border-theme-border text-theme-pink flex items-center justify-center mx-auto animate-bounce">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-theme-text font-display">No Anime Found</h4>
                <p className="text-sm text-theme-text-muted leading-relaxed max-w-md mx-auto">
                  We couldn't find any shows matching your current filters. Start adding anime to your watchlist or favorites from the home library catalog!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button 
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-theme-purple to-theme-pink hover:brightness-110 font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-pink-500/20 border-0 text-white"
                >
                  <Compass className="w-4 h-4" />
                  <span>Discover Catalog</span>
                </Button>
                {activeTab !== "Home" && (
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab("Home")}
                    className="border-theme-border text-theme-text-muted hover:text-theme-text rounded-xl font-bold bg-theme-panel/40 cursor-pointer"
                  >
                    Go back Home
                  </Button>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Trending Spotlights & News Bulletins (Hidden on lg, shown on xl) */}
        <div className="hidden xl:block">
          <TrendingSidebar 
            onSelectAnime={handleSelectFeatured} 
            animeDataList={animeList} 
          />
        </div>

      </main>

      {/* Elegant Line Art Branch Decor for Light Japanese Cafe Mode */}
      <div className="light-mode-art" />
      <div className="light-speed-lines" />
    </div>
  );
}

export default App;
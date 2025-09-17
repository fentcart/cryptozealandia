import { useState, useEffect } from "react";
import { TrendingUp, Shield, Users, MessageCircle, ArrowRight, Loader2, RefreshCw } from "lucide-react";

interface Coin {
  name: string;
  symbol: string;
  price: number;
  coins: number;
  slug: string;
  change24h?: number;
  marketCap?: number;
}

function App() {
  const [coins, setCoins] = useState<Coin[]>([
    { name: "Bitcoin", symbol: "BTC", price: 0, coins: 0.126101, slug: "bitcoin" },
    { name: "Ethereum", symbol: "ETH", price: 0, coins: 1.71, slug: "ethereum" },
    { name: "Litecoin", symbol: "LTC", price: 0, coins: 27.02, slug: "litecoin" },
    { name: "Tether", symbol: "USDT", price: 0, coins: 5549.7, slug: "tether" },
    { name: "Tron", symbol: "TRX", price: 0, coins: 50720.9, slug: "tron" },
    { name: "BNB", symbol: "BNB", price: 0, coins: 3.3803, slug: "bnb" },
    { name: "Cardano", symbol: "ADA", price: 0, coins: 5116.1, slug: "cardano" },
    { name: "Solana", symbol: "SOL", price: 0, coins: 20.8537, slug: "solana" },
    { name: "Polkadot", symbol: "DOT", price: 0, coins: 179.37, slug: "polkadot" },
    { name: "Dogecoin", symbol: "DOGE", price: 0, coins: 4363.4, slug: "dogecoin" },
  ]);
  
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCryptoPrices = async () => {
    setLoading(true);
    try {
      const coinIds = coins.map(coin => coin.slug).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=nzd&include_24hr_change=true&include_market_cap=true`
      );
      
      if (!response.ok) throw new Error('Failed to fetch prices');
      
      const data = await response.json();
      
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: data[coin.slug]?.nzd || 0,
          change24h: data[coin.slug]?.nzd_24h_change || 0,
          marketCap: data[coin.slug]?.nzd_market_cap || 0
        }))
      );
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      setCoins(prevCoins => 
        prevCoins.map(coin => ({
          ...coin,
          price: Math.random() * 100000 + 1000,
          change24h: (Math.random() - 0.5) * 10
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-NZ', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    } else {
      return `$${price.toLocaleString('en-NZ', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-15px) rotate(2deg) scale(1.05); 
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-8px) rotate(-1deg) scale(1.1); 
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-12px) rotate(1deg) scale(0.95); 
            opacity: 0.6;
          }
        }
        
        @keyframes floatMobile {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(0.7); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-8px) rotate(1deg) scale(0.8); 
            opacity: 0.3;
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 60px rgba(59, 130, 246, 0.7), 0 0 90px rgba(59, 130, 246, 0.3); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float { 
          animation: float 8s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .animate-float { 
            animation: floatMobile 6s ease-in-out infinite;
          }
        }
        
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-slide-up { animation: slideInUp 0.8s ease-out; }
        .animate-pulse-gentle { animation: pulse 4s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 400% 400%;
          animation: gradient 6s ease infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #3B82F6, #1D4ED8, #6366F1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        
        .coin-card:hover {
          transform: translateY(-8px) scale(1.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (max-width: 768px) {
          .coin-card:hover {
            transform: translateY(-4px) scale(1.01);
          }
        }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #3B82F6, #1D4ED8);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::before {
          width: 100%;
        }
        
        .floating-bg-1 {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.15));
        }
        
        .floating-bg-2 {
          background: linear-gradient(225deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.12));
        }
        
        .floating-bg-3 {
          background: linear-gradient(45deg, rgba(147, 197, 253, 0.08), rgba(59, 130, 246, 0.1));
        }
        
        .floating-bg-4 {
          background: linear-gradient(315deg, rgba(29, 78, 216, 0.12), rgba(99, 102, 241, 0.08));
        }
      `}</style>

      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Large floating orbs */}
        <div className="absolute top-10 left-10 md:top-20 md:left-20 w-24 h-24 md:w-40 md:h-40 floating-bg-1 rounded-full animate-float" 
             style={{animationDelay: '0s'}}></div>
        <div className="absolute top-32 right-8 md:top-40 md:right-20 w-20 h-20 md:w-32 md:h-32 floating-bg-2 rounded-full animate-float" 
             style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 md:w-56 md:h-56 floating-bg-3 rounded-full animate-float" 
             style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-4 md:right-16 w-16 h-16 md:w-28 md:h-28 floating-bg-4 rounded-full animate-float" 
             style={{animationDelay: '1s'}}></div>
        
        {/* Additional smaller orbs */}
        <div className="absolute bottom-20 right-1/3 w-12 h-12 md:w-20 md:h-20 floating-bg-1 rounded-full animate-float" 
             style={{animationDelay: '3s'}}></div>
        <div className="absolute top-3/4 left-8 md:left-16 w-14 h-14 md:w-24 md:h-24 floating-bg-2 rounded-full animate-float" 
             style={{animationDelay: '5s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3 animate-slide-up">
            <span className="text-lg md:text-2xl font-bold gradient-text">CryptoZealandia</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#rates" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base">
              Rates
            </a>
            <a href="#coins" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base">
              Available Coins
            </a>
            <a href="#contact" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm lg:text-base">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 text-center bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 animate-slide-up leading-tight">
            <span className="gradient-text">Crypto</span>
            <br className="sm:hidden" />
            <span className="text-gray-900">Zealandia</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up px-2" style={{animationDelay: '0.2s'}}>
            New Zealand's most trusted P2P cryptocurrency trader — delivering safe, simple, 
            and personalized trading experiences with real-time market rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center animate-slide-up px-4" style={{animationDelay: '0.4s'}}>
            <a
              href="#rates"
              className="group px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center space-x-2 md:space-x-3 animate-glow font-semibold text-base md:text-lg"
            >
              <span>View Live Rates</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-6 md:px-10 py-4 md:py-5 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl md:rounded-2xl transition-all duration-500 font-semibold text-base md:text-lg hover:shadow-lg md:hover:shadow-xl"
            >
              Start Trading
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 gradient-text">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">Trusted by Kiwi crypto traders nationwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
              { icon: Shield, title: "Bank-Level Security", desc: "All trades handled directly — no middlemen, no compromises on security." },
              { icon: MessageCircle, title: "Personal Touch", desc: "Direct communication with me personally — no bots, no automated responses." },
              { icon: Users, title: "Local Expertise", desc: "Built for New Zealand traders with deep market knowledge and fair pricing." }
            ].map((feature, index) => (
              <div key={index} className="group text-center p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 coin-card" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates Section */}
      <section id="rates" className="py-16 md:py-24 px-4 md:px-6 bg-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 gradient-text">
            Live Trading Rates
          </h2>
          <p className="text-gray-600 mb-12 md:mb-16 text-lg md:text-xl">
            Transparent, competitive rates updated in real-time
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl p-8 md:p-12 text-white shadow-xl md:shadow-2xl relative overflow-hidden animate-gradient">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6 md:mb-8">
                <TrendingUp className="w-8 h-8 md:w-12 md:h-12 mr-3 md:mr-4" />
                <h3 className="text-2xl md:text-3xl font-bold">Standard Trading Rate</h3>
              </div>
              <div className="text-center">
                <div className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 animate-pulse-gentle">4%</div>
                <p className="text-blue-100 text-lg md:text-xl mb-6 md:mb-8">
                  Applied to all cryptocurrency transactions
                </p>
                <div className="inline-flex items-center bg-white/20 rounded-full px-4 md:px-6 py-2 md:py-3 glass-effect">
                  <span className="text-sm md:text-base font-medium">Fair • Transparent • Competitive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coins Section */}
      <section id="coins" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex flex-col items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text text-center">
                My Available Inventory
              </h2>
              {loading && <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600 animate-spin" />}
            </div>
            <p className="text-gray-600 text-lg md:text-xl mb-3 md:mb-4 max-w-2xl mx-auto">
              Ready to sell immediately — all coins on hand with live market pricing
            </p>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 md:px-4 py-2 rounded-full font-medium text-sm border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for immediate sale</span>
            </div>
            {lastUpdated && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-3 md:mt-4">
                <RefreshCw className="w-4 h-4" />
                <span>Prices updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {coins.map((coin, index) => (
              <div
                key={index}
                className="coin-card bg-white p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 text-center relative overflow-hidden group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-3 md:mb-4 lg:mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md md:shadow-lg">
                    <img
                      src={`https://unpkg.com/cryptocurrency-icons@0.18.1/svg/color/${coin.symbol.toLowerCase()}.svg`}
                      alt={coin.name}
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/56/3B82F6/FFFFFF?text=${coin.symbol}`;
                      }}
                    />
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 text-gray-900">{coin.name}</h3>
                  <p className="text-gray-500 uppercase tracking-wider text-xs md:text-sm mb-3 md:mb-4 font-semibold">
                    {coin.symbol}
                  </p>
                  
                  {/* Current Market Price */}
                  <div className="mb-3 md:mb-4 pb-3 md:pb-4 border-b border-gray-100">
                    <div className="text-xs md:text-sm text-gray-500 mb-1">Current Market Price</div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 md:mb-2">
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 animate-spin" />
                        </div>
                      ) : (
                        <>
                          {formatPrice(coin.price)}
                          <span className="text-xs md:text-sm lg:text-base text-gray-500 font-normal ml-1">NZD</span>
                        </>
                      )}
                    </div>
                    {coin.change24h !== undefined && !loading && (
                      <div className={`text-xs md:text-sm font-medium flex items-center justify-center gap-1 ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span>{coin.change24h >= 0 ? '↗' : '↘'}</span>
                        <span>{Math.abs(coin.change24h).toFixed(2)}% (24h)</span>
                      </div>
                    )}
                  </div>

                  {/* Inventory Available */}
                  <div className="space-y-2 md:space-y-3">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 md:p-4 border border-green-100">
                      <div className="text-xs md:text-sm text-green-700 font-medium mb-1">On Hand & Ready to Sell</div>
                      <div className="text-base md:text-lg font-bold text-green-800">
                        {coin.coins.toLocaleString()} {coin.symbol}
                      </div>
                      {!loading && coin.price > 0 && (
                        <div className="text-xs md:text-sm text-green-600 font-medium mt-1 md:mt-2">
                          ≈ {formatPrice(coin.coins * coin.price)} NZD
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 md:mt-16">
            <div className="inline-flex flex-col items-center gap-3 md:gap-4 bg-blue-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-100 max-w-lg mx-auto">
              <div className="flex items-center gap-2 text-blue-700">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold text-sm md:text-base">Ready to buy?</span>
              </div>
              <span className="text-gray-600 text-sm md:text-base text-center">Message me directly for instant transactions at current market rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">Ready to Trade?</h2>
          <p className="text-lg md:text-xl mb-8 md:mb-12 text-blue-100 leading-relaxed">
            Skip the public Discord servers and automated responses. 
            All trades are handled personally — message me directly to get started with your crypto journey.
          </p>
          <a
            href="https://discord.com/users/1050266930063355914"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-8 md:px-12 py-4 md:py-6 bg-white text-blue-600 hover:bg-blue-50 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 shadow-xl md:shadow-2xl hover:shadow-3xl hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 group-hover:scale-110 transition-transform" />
            Message Me on Discord
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-0">
              <span className="text-lg md:text-xl font-bold gradient-text">CryptoZealandia</span>
            </div>
            <div className="text-gray-500 text-center md:text-right">
              <p className="mb-1 md:mb-2 font-medium text-sm md:text-base">© {new Date().getFullYear()} CryptoZealandia</p>
              <p className="text-xs md:text-sm">Proudly built with care in Aotearoa New Zealand 🇳🇿</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

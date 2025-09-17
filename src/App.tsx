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
      // Using CoinGecko API to get real-time prices in NZD
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
      // Fallback to demo data if API fails
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
    // Update prices every 30 seconds
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
    <div className="min-h-screen bg-white text-gray-900 font-poppins overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
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
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slideInUp 0.6s ease-out; }
        .animate-pulse-gentle { animation: pulse 3s ease-in-out infinite; }
        
        .gradient-text {
          background: linear-gradient(135deg, #3B82F6, #1D4ED8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .coin-card:hover {
          transform: translateY(-10px) scale(1.02);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
          height: 2px;
          background: linear-gradient(90deg, #3B82F6, #1D4ED8);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::before {
          width: 100%;
        }
      `}</style>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-50 rounded-full opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-slide-up">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg animate-pulse-gentle">
              CZ
            </div>
            <span className="text-2xl font-bold gradient-text">CryptoZealandia</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#rates" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Rates
            </a>
            <a href="#coins" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Available Coins
            </a>
            <a href="#contact" className="nav-link text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-6 text-center bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-6xl md:text-8xl font-black mb-8 animate-slide-up">
            <span className="gradient-text">Crypto</span>
            <span className="text-gray-900">Zealandia</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            New Zealand's most trusted P2P cryptocurrency trader — delivering safe, simple, 
            and personalized trading experiences with real-time market rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <a
              href="#rates"
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center space-x-3 animate-glow font-semibold text-lg"
            >
              <span>View Live Rates</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-10 py-5 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl transition-all duration-500 font-semibold text-lg hover:shadow-xl"
            >
              Start Trading
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-xl">Trusted by Kiwi crypto traders nationwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Shield, title: "Bank-Level Security", desc: "All trades handled directly — no middlemen, no compromises on security." },
              { icon: MessageCircle, title: "Personal Touch", desc: "Direct communication with me personally — no bots, no automated responses." },
              { icon: Users, title: "Local Expertise", desc: "Built for New Zealand traders with deep market knowledge and fair pricing." }
            ].map((feature, index) => (
              <div key={index} className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 coin-card" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates Section */}
      <section id="rates" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Live Trading Rates
          </h2>
          <p className="text-gray-600 mb-16 text-xl">
            Transparent, competitive rates updated in real-time
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-8">
                <TrendingUp className="w-12 h-12 mr-4" />
                <h3 className="text-3xl font-bold">Standard Trading Rate</h3>
              </div>
              <div className="text-center">
                <div className="text-8xl font-black mb-6 animate-pulse-gentle">4%</div>
                <p className="text-blue-100 text-xl mb-8">
                  Applied to all cryptocurrency transactions
                </p>
                <div className="inline-flex items-center bg-white/20 rounded-full px-6 py-3 glass-effect">
                  <span className="text-sm font-medium">Fair • Transparent • Competitive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coins Section */}
      <section id="coins" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                Available Cryptocurrencies
              </h2>
              {loading && <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />}
            </div>
            <p className="text-gray-600 text-xl mb-8">
              Real-time inventory with live market pricing
            </p>
            {lastUpdated && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <RefreshCw className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {coins.map((coin, index) => (
              <div
                key={index}
                className="coin-card bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 text-center relative overflow-hidden group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <img
                      src={`https://unpkg.com/cryptocurrency-icons@0.18.1/svg/color/${coin.symbol.toLowerCase()}.svg`}
                      alt={coin.name}
                      className="w-14 h-14"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/56/3B82F6/FFFFFF?text=${coin.symbol}`;
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{coin.name}</h3>
                  <p className="text-gray-500 uppercase tracking-wider text-sm mb-4 font-semibold">
                    {coin.symbol}
                  </p>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                      ) : (
                        <>
                          {formatPrice(coin.price)}
                          <span className="text-base text-gray-500 font-normal ml-1">NZD</span>
                        </>
                      )}
                    </div>
                    {coin.change24h !== undefined && !loading && (
                      <div className={`text-sm font-medium ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {coin.change24h >= 0 ? '↗' : '↘'} {Math.abs(coin.change24h).toFixed(2)}%
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                    <span className="font-medium">Available: </span>
                    <span className="font-bold text-gray-800">
                      {coin.coins.toLocaleString()} {coin.symbol}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Trade?</h2>
          <p className="text-xl mb-12 text-blue-100 leading-relaxed">
            Skip the public Discord servers and automated responses. 
            All trades are handled personally — message me directly to get started with your crypto journey.
          </p>
          <a
            href="https://discord.com/users/1050266930063355914"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-12 py-6 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
            Message Me on Discord
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center font-bold text-white">
                CZ
              </div>
              <span className="text-xl font-bold gradient-text">CryptoZealandia</span>
            </div>
            <div className="text-gray-500 text-center md:text-right">
              <p className="mb-2 font-medium">© {new Date().getFullYear()} CryptoZealandia</p>
              <p className="text-sm">Proudly built with care in Aotearoa New Zealand 🇳🇿</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

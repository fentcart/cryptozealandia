import { useState } from "react";
import Tilt from "react-parallax-tilt";
import { TrendingUp, Shield, Users, MessageCircle, ArrowRight } from "lucide-react";

interface Coin {
  name: string;
  symbol: string;
  price: number;
  slug: string;
}

function App() {
  const [stock] = useState<Coin[]>([
    { name: "Bitcoin", symbol: "BTC", price: 24631, slug: "bitcoin" },
    { name: "Ethereum", symbol: "ETH", price: 12958, slug: "ethereum" },
    { name: "Litecoin", symbol: "LTC", price: 5227, slug: "litecoin" },
    { name: "Tether", symbol: "USDT", price: 9285, slug: "tether" },
    { name: "Tron", symbol: "TRX", price: 24631, slug: "tron" },
    { name: "Binance Coin", symbol: "BNB", price: 5428, slug: "binance-coin" },
    { name: "Cardano", symbol: "ADA", price: 7510, slug: "cardano" },
    { name: "Solana", symbol: "SOL", price: 8225, slug: "solana" },
    { name: "Polkadot", symbol: "DOT", price: 1273, slug: "polkadot" },
    { name: "Dogecoin", symbol: "DOGE", price: 1957, slug: "dogecoin" },
  ]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="bg-transparent sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="CryptoZealandia"
              className="w-10 h-10"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="w-10 h-10 bg-blue-600 rounded-lg items-center justify-center font-bold text-white text-sm hidden">
              CZ
            </div>
            <span className="text-xl font-bold text-gray-900">CryptoZealandia</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#rates" className="text-gray-600 hover:text-blue-600 transition-colors">
              Rates
            </a>
            <a href="#stock" className="text-gray-600 hover:text-blue-600 transition-colors">
              Available Coins
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-6">
            CryptoZealandia
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            New Zealand's trusted P2P cryptocurrency trader - safe, simple, and
            personal service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#rates"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span className="font-semibold">View Current Rates</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Trade With Me?
            </h2>
            <p className="text-gray-600 text-lg">Personal service you can trust</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Trading</h3>
              <p className="text-gray-600">
                All trades handled directly with me - no middlemen, no scams.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Direct Contact</h3>
              <p className="text-gray-600">
                I don’t run a Discord server - instead, you contact me personally.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Personal Service</h3>
              <p className="text-gray-600">
                Friendly, fast, and transparent for the NZ market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rates Section */}
      <section id="rates" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Current Trading Rates
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Fair and competitive rates for all supported cryptocurrencies
          </p>
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Standard Rate</h3>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">4%</div>
              <p className="text-gray-600 text-lg mb-6">
                Applied to all cryptocurrency trades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Section */}
      <section id="stock" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Available Cryptocurrencies
            </h2>
            <p className="text-gray-600 text-lg">
              Fixed inventory ready for immediate trading
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {stock.map((coin, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                perspective={1000}
                scale={1.05}
                transitionSpeed={250}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <img
                    src={`https://unpkg.com/cryptocurrency-icons@0.18.1/svg/color/${coin.symbol.toLowerCase()}.svg`}
                    alt={coin.name}
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{coin.name}</h3>
                <p className="text-gray-500 uppercase tracking-wider text-sm mb-4 font-semibold">
                  {coin.symbol}
                </p>
                <div className="text-3xl font-bold text-blue-600 mb-6">
                  ${coin.price.toLocaleString()}
                  <span className="text-base text-gray-500 font-normal ml-1">NZD</span>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Trade?</h2>
          <p className="text-xl mb-8 text-blue-100">
            I don’t have a public Discord server. All trades are handled directly -
            message me on Discord to get started.
          </p>
          <a
            href="https://discord.com/users/1050266930063355914"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-colors inline-flex items-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Me on Discord
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="/logo.png"
                alt="CryptoZealandia"
                className="w-8 h-8"
              />
              <span className="text-lg font-semibold text-gray-900">CryptoZealandia</span>
            </div>
            <div className="text-gray-500 text-center md:text-right">
              <p className="mb-1">© {new Date().getFullYear()} CryptoZealandia</p>
              <p>Built with care in New Zealand</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

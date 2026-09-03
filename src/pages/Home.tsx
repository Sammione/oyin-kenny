import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Wedding date: November 14, 2026
    const weddingDate = new Date('2026-11-14T10:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center text-center overflow-hidden pt-12 pb-24">
        <div className="absolute inset-0 bg-stone-100 -z-20"></div>
        {/* Background Image using the couple's picture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/DSC_2053-Edit.jpg" 
            alt="Couple Background" 
            className="w-full h-full object-cover opacity-30 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-transparent to-stone-50"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto z-10 px-4 mt-8 flex flex-col items-center"
        >
          {/* Couple Image Profile */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#CC5500] shadow-2xl mb-8 relative bg-stone-200">
            <img 
              src="/DSC_1918-Edit.jpg" 
              alt="The Couple" 
              className="object-cover w-full h-full"
            />
          </div>

          <span className="uppercase tracking-widest text-sm text-[#CC5500] font-bold mb-4 block bg-white/80 px-6 py-2 rounded-full shadow-sm">
            We are getting married
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#556B2F] mb-4 tracking-tight drop-shadow-sm px-2">Oyinkansiye</h1>
          <h2 className="text-4xl md:text-5xl font-serif text-[#CC5500] mb-4">&amp;</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-[#556B2F] mb-6 tracking-tight drop-shadow-sm px-2">Kehinde</h1>
          
          <p className="text-md md:text-xl text-stone-700 mb-8 italic bg-white/60 px-6 py-2 rounded-full backdrop-blur-sm max-w-2xl">
            "Together is a beautiful place to be. With joyful hearts and endless love, we invite you to celebrate our union as we begin our journey of a lifetime together."
          </p>
          
          <div className="flex justify-center gap-3 md:gap-6 text-stone-700 mb-10">
            <div className="flex flex-col items-center p-3 md:p-5 bg-white/80 backdrop-blur-md rounded-2xl min-w-[70px] md:min-w-[90px] shadow-lg border border-[#556B2F]/20">
              <span className="text-3xl font-bold text-[#556B2F]">{timeLeft.days}</span>
              <span className="text-xs uppercase tracking-wider font-semibold">Days</span>
            </div>
            <div className="flex flex-col items-center p-3 md:p-5 bg-white/80 backdrop-blur-md rounded-2xl min-w-[70px] md:min-w-[90px] shadow-lg border border-[#556B2F]/20">
              <span className="text-3xl font-bold text-[#556B2F]">{timeLeft.hours}</span>
              <span className="text-xs uppercase tracking-wider font-semibold">Hrs</span>
            </div>
            <div className="flex flex-col items-center p-3 md:p-5 bg-white/80 backdrop-blur-md rounded-2xl min-w-[70px] md:min-w-[90px] shadow-lg border border-[#556B2F]/20">
              <span className="text-3xl font-bold text-[#556B2F]">{timeLeft.minutes}</span>
              <span className="text-xs uppercase tracking-wider font-semibold">Mins</span>
            </div>
            <div className="flex flex-col items-center p-3 md:p-5 bg-white/80 backdrop-blur-md rounded-2xl min-w-[70px] md:min-w-[90px] shadow-lg border border-[#CC5500]/20">
              <span className="text-3xl font-bold text-[#CC5500]">{timeLeft.seconds}</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#CC5500]">Secs</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full justify-center px-4">
            <Link to="/rsvp" className="w-full sm:w-auto text-center bg-[#556B2F] hover:bg-[#37461E] text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-xl transform hover:-translate-y-1">
              RSVP Now
            </Link>
          </div>

          <div className="mt-8">
            <span className="inline-block bg-[#CC5500]/10 text-[#CC5500] border border-[#CC5500]/30 px-6 py-2 rounded-full font-bold tracking-wider text-xs md:text-sm shadow-sm">
              STRICTLY BY INVITATION &middot; THIS CARD ADMITS ONLY ONE
            </span>
          </div>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-4 bg-white relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Heart className="mx-auto text-[#CC5500] mb-4" size={40} />
            <h2 className="text-4xl font-serif text-[#556B2F]">The Details</h2>
            <div className="w-24 h-1 bg-[#CC5500] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-stone-50 p-10 rounded-3xl text-center border-t-8 border-[#556B2F] shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-center h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#556B2F]/5 rounded-bl-full -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#556B2F]/5 rounded-tr-full -z-10"></div>
              
              <Calendar className="mx-auto text-[#556B2F] mb-4" size={40} strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-[#556B2F] mb-6 tracking-widest uppercase text-sm">When</h3>
              
              <div className="flex justify-center items-center mb-8">
                <div className="text-right pr-6 border-r-2 border-[#556B2F]/20">
                  <div className="text-3xl font-serif text-[#556B2F] leading-none mb-1">NOV</div>
                  <div className="text-lg text-stone-500 tracking-widest font-semibold">2026</div>
                </div>
                <div className="px-6">
                  <div className="text-7xl font-serif text-[#556B2F] leading-none">14</div>
                </div>
                <div className="text-left pl-6 border-l-2 border-[#556B2F]/20">
                  <div className="text-xl font-medium text-stone-700 leading-none mb-1">SATURDAY</div>
                  <div className="text-lg text-[#CC5500] font-bold">10:00 AM</div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-10 rounded-3xl text-center border-t-8 border-[#CC5500] shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
              <MapPin className="mx-auto text-[#CC5500] mb-6" size={48} strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-[#CC5500] mb-3">Where</h3>
              <p className="text-lg text-stone-700 font-medium leading-tight">Oba Sir Olateru Olagbegi II,<br/>K.B.E. Civic Centre</p>
              <p className="text-stone-500 mt-2 mb-6">Fajuyi Road, Owo, Ondo State</p>
              
              <div className="w-full h-48 rounded-xl overflow-hidden shadow-inner border border-stone-200">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=Oba+Sir+Olateru+Olagbegi+II+Civic+Centre,+Owo,+Ondo+State&output=embed"
                  title="Wedding Venue Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="py-12 bg-stone-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-stone-200">
             <img src="/DSC_2055-Edit.jpg" alt="Couple 1" className="object-cover w-full h-full" />
          </div>
          <div className="grid grid-rows-2 gap-4 h-96 md:h-[500px]">
             <div className="relative rounded-3xl overflow-hidden shadow-xl bg-stone-200">
               <img src="/WhatsApp Image 2026-09-02 at 20.52.44.jpeg" alt="Event 1" className="object-cover object-center w-full h-full" />
             </div>
             <div className="relative rounded-3xl overflow-hidden shadow-xl bg-stone-200">
               <img src="/WhatsApp Image 2026-09-02 at 20.52.52.jpeg" alt="Event 2" className="object-cover object-top w-full h-full" />
             </div>
          </div>
        </div>
      </section>

      {/* Programme Section */}
      <section className="py-24 px-4 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#556B2F]">Programme of Events</h2>
            <div className="w-24 h-1 bg-[#CC5500] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100">
            <div className="flex gap-6 items-start">
              <div className="bg-[#CC5500]/10 p-4 rounded-2xl text-[#CC5500]">
                <Clock size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#556B2F]">Arrival of Guests</h4>
                <p className="text-[#CC5500] font-bold text-lg mt-1">10:00 AM</p>
                <p className="text-stone-600 mt-2 text-lg">Please arrive early to find your seats.</p>
              </div>
            </div>
            
            <div className="w-full h-[1px] bg-stone-100 my-6"></div>
            
            <div className="flex gap-6 items-start">
              <div className="bg-[#556B2F]/10 p-4 rounded-2xl text-[#556B2F]">
                <Heart size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#556B2F]">Traditional Wedding</h4>
                <p className="text-[#CC5500] font-bold text-lg mt-1">11:00 AM</p>
                <p className="text-stone-600 mt-2 text-lg">Joining of the couple in holy matrimony.</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-stone-100 my-6"></div>

            <div className="flex gap-6 items-start">
              <div className="bg-[#CC5500]/10 p-4 rounded-2xl text-[#CC5500]">
                <Calendar size={28} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-[#556B2F]">Reception & Party</h4>
                <p className="text-[#CC5500] font-bold text-lg mt-1">1:00 PM</p>
                <p className="text-stone-600 mt-2 text-lg">Food, drinks, dancing and celebration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#37461E] text-white py-16 text-center">
        <h3 className="text-4xl font-serif mb-6 text-[#CC5500]">Oyinkansiye & Kehinde</h3>
        <p className="text-stone-300 opacity-90 text-lg mb-8">We can't wait to celebrate with you!</p>
        <Link to="/rsvp" className="inline-block bg-white text-[#37461E] px-8 py-3 rounded-full font-bold hover:bg-stone-200 transition-colors">
          Confirm Your Attendance
        </Link>
      </footer>
    </div>
  )
}

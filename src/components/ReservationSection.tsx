import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, MapPin, CheckCircle, Search, HelpCircle, XCircle, Trash2, ShieldCheck, Mail, Phone, User, Compass } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationSectionProps {
  lookupTrigger: boolean;
  onResetLookupTrigger: () => void;
}

export default function ReservationSection({ lookupTrigger, onResetLookupTrigger }: ReservationSectionProps) {
  // Booking Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [seatingPref, setSeatingPref] = useState<'window' | 'fireplace' | 'forest' | 'glass-roof' | 'no-preference'>('no-preference');
  const [specialRequests, setSpecialRequests] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);

  // Validation & Result states
  const [validationError, setValidationError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);

  // Lookup existing reserving states
  const [showLookup, setShowLookup] = useState(false);
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupCode, setLookupCode] = useState('');
  const [lookupResults, setLookupResults] = useState<Reservation[]>([]);
  const [lookupDone, setLookupDone] = useState(false);

  // Trigger search view externally (from navbar click)
  useEffect(() => {
    if (lookupTrigger) {
      setShowLookup(true);
      onResetLookupTrigger();
      // Scroll to reservation section
      const element = document.getElementById('reservations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [lookupTrigger]);

  // Set default tomorrow's date for ease of booking
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
    setTime('19:00'); // Prime dinner slot
  }, []);

  const toggleDietary = (restriction: string) => {
    setDietary((prev) =>
      prev.includes(restriction) ? prev.filter((r) => r !== restriction) : [...prev, restriction]
    );
  };

  // Save Reservation handler
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Field audits
    if (!name.trim()) return setValidationError('Please supply your full guest name.');
    if (!email.trim() || !email.includes('@')) return setValidationError('Please declare a valid email address.');
    if (!phone.trim() || phone.length < 8) return setValidationError('Please supply a complete phone number.');
    if (!date) return setValidationError('Please select a dining date.');
    if (!time) return setValidationError('Please choose your arrival window.');

    const selectedDate = new Date(`${date}T${time}`);
    const today = new Date();
    if (selectedDate < today) {
      return setValidationError('Reservations must be booked for future times.');
    }

    // Create Reservation object
    const code = `WNW-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: code,
      name,
      email: email.trim().toLowerCase(),
      phone,
      date,
      time,
      guests,
      seatingPreference: seatingPref,
      specialRequests,
      dietaryRestrictions: dietary,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Save directly to localStorage
    const existingRaw = localStorage.getItem('wnw_reservations');
    const existing: Reservation[] = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem('wnw_reservations', JSON.stringify([newReservation, ...existing]));

    setConfirmedBooking(newReservation);

    // Reset fields
    setName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    setDietary([]);
  };

  // Lookup handler
  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupDone(true);

    const existingRaw = localStorage.getItem('wnw_reservations');
    const existing: Reservation[] = existingRaw ? JSON.parse(existingRaw) : [];

    const found = existing.filter((res) => {
      const emailMatches = lookupEmail.trim() ? res.email === lookupEmail.trim().toLowerCase() : false;
      const codeMatches = lookupCode.trim() ? res.id.toLowerCase() === lookupCode.trim().toLowerCase() : false;
      return emailMatches || codeMatches;
    });

    setLookupResults(found);
  };

  // Cancel reservation handler
  const handleCancelReservation = (id: string) => {
    if (!confirm('Are you sure you want to cancel this reservation? This cannot be undone.')) return;

    const existingRaw = localStorage.getItem('wnw_reservations');
    if (!existingRaw) return;

    const existing: Reservation[] = JSON.parse(existingRaw);
    const updated = existing.map((res) => {
      if (res.id === id) {
        return { ...res, status: 'cancelled' as const };
      }
      return res;
    });

    localStorage.setItem('wnw_reservations', JSON.stringify(updated));

    // Update lookup screen listing
    setLookupResults((prev) =>
      prev.map((res) => {
        if (res.id === id) {
          return { ...res, status: 'cancelled' as const };
        }
        return res;
      })
    );
  };

  return (
    <section id="reservations" className="py-24 md:py-32 bg-surface relative overflow-hidden">
      {/* Background organic ring overlay represent fireplace warmth */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.7) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Reservation lookup and switch bar */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setShowLookup(!showLookup);
              setLookupDone(false);
              setLookupResults([]);
            }}
            className="text-xs font-sans font-bold tracking-widest uppercase text-primary hover:text-secondary flex items-center gap-1.5 cursor-pointer"
          >
            {showLookup ? (
              <>
                <Calendar className="w-4 h-4" /> Book a New Table
              </>
            ) : (
              <>
                <Search className="w-4 h-4" /> Manage Existing Bookings
              </>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!showLookup ? (
            // NORMAL RESERVATION FORM / CONFIRMATION PANEL
            !confirmedBooking ? (
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="glass-panel p-8 md:p-12 rounded-3xl text-left border border-white/10"
              >
                {/* Header info */}
                <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-2 block" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary tracking-tight">
                    Reserve Your Table Today
                  </h2>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    Ensure your spots for an unforgettable evening of culinary immersion and sanctuary quiet luxury.
                  </p>
                </div>

                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  {/* Basic Contacts */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                        Guest Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-secondary/70 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-secondary/70 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@gmail.com"
                          className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-secondary/70 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schedule selection dates & guest selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                        Dining Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                        Arrival Time
                      </label>
                      <input
                        type="time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                        Seating Covers count
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-secondary/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 appearance-none"
                        >
                          <option value="2">2 Guests Table</option>
                          <option value="3">3 Guests Table</option>
                          <option value="4">4 Guests Table</option>
                          <option value="5">5 Guests Table</option>
                          <option value="6">6+ Guests (Tasting Alcove)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Restaurant seat-selection Map */}
                  <div className="bg-surface-container-low border border-primary-container/10 p-5 rounded-2xl">
                    <h4 className="font-serif text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-secondary" /> Seating Preference Spot Selection
                    </h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { id: 'fireplace', label: 'Fireplace Alcove', desc: 'Cosy wood-smoke fireside warmth' },
                        { id: 'window', label: 'Tall Wood Windows', desc: 'Panoramic forest scenery views' },
                        { id: 'forest', label: 'Forest-side Garden', desc: 'Raw fresh night woodland patio' },
                        { id: 'glass-roof', label: 'Glass-Roof Atrium', desc: 'Starry starlight skyline canopy' },
                        { id: 'no-preference', label: 'No Preference', desc: 'Any lovely open tables spot' }
                      ].map((pref) => (
                        <button
                          key={pref.id}
                          type="button"
                          onClick={() => setSeatingPref(pref.id as any)}
                          className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                            seatingPref === pref.id
                              ? 'bg-inverse-primary border-inverse-primary text-primary'
                              : 'bg-surface-container/80 border-primary-container/10 hover:border-primary-container/30 hover:bg-primary-container/70 text-primary'
                          }`}
                        >
                          <span className="font-serif text-xs font-bold leading-tight">
                            {pref.label}
                          </span>
                          <span className={`text-[9px] leading-tight ${seatingPref === pref.id ? 'text-primary/75' : 'text-on-surface-variant/70'}`}>
                            {pref.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Restrictions and Special Requests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dietary boxes */}
                    <div className="bg-surface-container-low border border-primary-container/10 p-5 rounded-2xl">
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-3">
                        Guest Dietary Alerts
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs text-primary">
                        {['Gluten-Free', 'Nut Allergy', 'Vegan', 'Vegetarian'].map((diet) => (
                          <label key={diet} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={dietary.includes(diet)}
                              onChange={() => toggleDietary(diet)}
                              className="rounded border-primary-container/20 text-secondary focus:ring-primary bg-transparent w-4 h-4"
                            />
                            <span className="group-hover:text-secondary transition-colors">
                              {diet}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Special requests field */}
                    <div>
                      <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                        Special Notes or allergies
                      </label>
                      <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Allergy alerts, wedding anniversary, wheel-chair access, high-chair needs..."
                        rows={3}
                        className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 placeholder:text-on-surface-variant/50 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit message and action button */}
                  {validationError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-semibold text-red-300 leading-none bg-red-950/20 border border-red-900/30 p-3.5 rounded-xl flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4 text-red-400" /> {validationError}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-primary text-inverse-primary font-serif text-lg font-bold py-4 rounded-xl hover:bg-forest-deep hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl transition-all duration-300 cursor-pointer shadow-lg mt-4 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5 text-secondary" /> Confirm Sanctuary Reservation
                  </button>
                </form>
              </motion.div>
            ) : (
              // GORGEOUS SUCCESS TINT CARD DETAIIL DISPLAY
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                tabIndex={0}
                className="bg-surface-container text-primary p-8 md:p-12 rounded-3xl max-w-2xl mx-auto shadow-2xl text-center space-y-6 border border-primary-container/10 focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-primary-container text-inverse-primary flex items-center justify-center mx-auto mb-2 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="font-sans text-xs tracking-[0.25em] text-secondary font-bold uppercase block">
                    SEAT SECURED SUCCESSFULLY
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary tracking-tight">
                    Welcome to the Woods, {confirmedBooking.name}
                  </h3>
                </div>

                <p className="font-sans text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Your table is formally reserved at Walk n Woods. We have generated your secure reservation reference ticket below.
                </p>

                {/* Simulated Ticket detail block */}
                <div className="bg-surface-container border border-primary-container/5 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-primary-container/5 pb-2 text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                    <span>SEAT BOOKING RECEIPT</span>
                    <span className="text-secondary"># {confirmedBooking.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                    <div>
                      <span className="text-outline text-xs block">Date & Time</span>
                      <span className="text-primary font-bold">
                        {new Date(confirmedBooking.date).toLocaleDateString(undefined, {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })} at {confirmedBooking.time}
                      </span>
                    </div>

                    <div>
                      <span className="text-outline text-xs block">Party Size</span>
                      <span className="text-primary font-bold">{confirmedBooking.guests} Guests table</span>
                    </div>

                    <div>
                      <span className="text-outline text-xs block">Choice Spot</span>
                      <span className="text-primary font-semibold capitalize">
                        {confirmedBooking.seatingPreference.replace('-', ' ')}
                      </span>
                    </div>

                    <div>
                      <span className="text-outline text-xs block font-bold">Dietary alerts</span>
                      <span className="text-primary font-bold">
                        {confirmedBooking.dietaryRestrictions.length > 0
                          ? confirmedBooking.dietaryRestrictions.join(', ')
                          : 'None declared'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions flow */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
                  <button
                    onClick={() => {
                      // print simulated ticket
                      window.print();
                    }}
                    className="flex-1 border border-primary-container/10 bg-white hover:bg-surface-container py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold text-primary cursor-pointer transition-all"
                  >
                    Print Ticket receipt
                  </button>
                  <button
                    onClick={() => setConfirmedBooking(null)}
                    className="flex-1 bg-primary text-white hover:bg-secondary py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold cursor-pointer transition-all shadow hover:shadow-lg"
                  >
                    Book another table
                  </button>
                </div>
              </motion.div>
            )
          ) : (
            // DYNAMIC PERSISTED LOOKUP AND MANAGE MODULE VIEW
            <motion.div
              key="booking-lookup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-8 md:p-12 rounded-3xl text-left border border-white/10"
            >
              <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                <Search className="w-8 h-8 text-inverse-primary mx-auto mb-1 block" />
                <h3 className="font-serif text-3xl font-bold text-primary tracking-tight">
                  Reservation Management Panel
                </h3>
                <p className="font-sans text-sm text-on-surface-variant">
                  Retrieve and verify your reservations, change seating preferences, or cancel your tables.
                </p>
              </div>

              {/* Search boxes form */}
              <form onSubmit={handleLookup} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-surface-container border border-primary-container/10 p-5 rounded-2xl mb-8">
                <div>
                  <label className="block text-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                    Guest Account Email
                  </label>
                  <input
                    type="email"
                    value={lookupEmail}
                    onChange={(e) => setLookupEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full bg-surface-container border border-primary-container/10 text-primary rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="text-center md:text-left self-center text-on-surface-variant text-xs font-semibold uppercase tracking-wider pt-2 md:pt-0">
                  - OR BY TICKET CODE -
                </div>

                <div>
                  <label className="block text-inverse-primary font-sans text-xs uppercase tracking-wider font-bold mb-2">
                    Reservation Ticket Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lookupCode}
                      onChange={(e) => setLookupCode(e.target.value)}
                      placeholder="e.g. WNW-8973"
                      className="flex-1 bg-surface-container border border-primary-container/10 text-primary rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary placeholder:text-on-surface-variant/50"
                    />
                    <button
                      type="submit"
                      className="bg-inverse-primary hover:bg-white text-primary font-sans text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-xl cursor-pointer"
                    >
                      Retrieve
                    </button>
                  </div>
                </div>
              </form>

              {/* Search Results Display Area */}
              <div className="space-y-4">
                {lookupDone ? (
                  lookupResults.length > 0 ? (
                    lookupResults.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-surface-container border border-primary-container/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-lg font-bold text-primary">
                              {booking.name}
                            </span>
                            <span className="text-[10px] font-sans font-bold tracking-wider py-1 px-3.5 rounded-full uppercase border border-white/15 bg-primary">
                              Reference: {booking.id}
                            </span>
                            <span
                              className={`text-[10px] font-sans font-bold tracking-wider py-1 px-3.5 rounded-full uppercase ${
                                booking.status === 'confirmed'
                                  ? 'bg-secondary text-white'
                                  : 'bg-red-950/40 text-red-300 border border-red-900/30'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans text-on-surface-variant">
                            <div>
                              <span className="text-on-surface-variant block">Arrival Slot</span>
                              <span className="text-primary font-semibold">
                                {new Date(booking.date).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                })} at {booking.time}
                              </span>
                            </div>

                            <div>
                              <span className="text-on-surface-variant block">Seating Covers</span>
                              <span className="text-primary font-semibold">{booking.guests} Guests</span>
                            </div>

                            <div>
                              <span className="text-on-surface-variant block">Preferred Alcove</span>
                              <span className="text-primary font-semibold capitalize">
                                {booking.seatingPreference.replace('-', ' ')}
                              </span>
                            </div>

                            <div>
                              <span className="text-on-surface-variant block">Special alerts</span>
                              <span className="text-primary font-semibold line-clamp-1">
                                {booking.dietaryRestrictions.join(', ') || 'No dietary alerts'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Cancel slot trigger */}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleCancelReservation(booking.id)}
                            className="bg-red-950/20 hover:bg-red-900 border border-red-900/40 hover:border-red-600 text-red-300 font-sans text-xs uppercase tracking-wider font-bold py-2 px-4 rounded-xl flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto shadow"
                          >
                            <Trash2 className="w-4 h-4" /> Cancel Reservation
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-surface-container rounded-3xl border border-primary-container/10">
                      <HelpCircle className="w-10 h-10 text-secondary mx-auto mb-2 animate-bounce" />
                      <p className="font-serif text-lg font-bold text-primary mb-1">
                        No Active Reservations Found
                      </p>
                      <p className="font-sans text-xs text-on-surface-variant max-w-sm mx-auto">
                        We couldn't locate bookings corresponding to your email or reference code. Search parameters are case-insensitive.
                      </p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-12 text-on-surface-variant text-sm font-medium">
                    Supply your lookup email or reference tickets above to inspect reservation status.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

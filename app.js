const { createApp, ref, computed } = Vue;

// ---- OUR DATA ----
// In a real app, this would come from an API. For now, it's a rich data store.
const gigData = [
    {
        id: 1,
        artistName: "OLIVIA COGGAN",
        genre: "Indie Rock",
        venueName: "Hotel Esplanade (aka The Espy)",
        venueLocation: "St Kilda, 11 The Esplanade",
        date: "2026-08-06",
        time: "19:30",        // 7:30 PM
        isFavorite: false
    },
    {
        id: 2,
        artistName: "DAVID M WESTERN. KYLE BREW",
        genre: "Indie Rock",
        venueName: "Lulie Tavern",
        venueLocation: "Abbotsford, 225 Johnston St",
        date: "2026-08-06",
        time: "19:00",        // 7:00 PM
        isFavorite: false
    },
    {
        id: 3,
        artistName: "NO HOPER + CRANING",
        genre: "Indie Rock",
        venueName: "John Curtin Hotel",
        venueLocation: "Carlton, 29 Lygon St",
        date: "2026-08-08",
        time: "15:00",        // 3:00 PM
        isFavorite: false
    },
    {
        id: 4,
        artistName: "FM3 Ft: Acadalius, Sussiguala, Reductionist, Aday, KOshowKo (DJ Set)",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-08",
        time: "20:30",        // 8:30 PM
        isFavorite: false
    },
    {
        id: 5,
        artistName: "FOLKIE Ft: Thom Johnston",
        genre: "Folk",
        venueName: "Ragtime Tavern",
        venueLocation: "Preston, 206 Tyler St",
        date: "2026-08-08",
        time: "18:30",        // 6:30 PM
        isFavorite: false
    },
    {
        id: 6,
        artistName: "STELLA ANNING TRIO",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-13",
        time: "20:30",        // 8:30 PM
        isFavorite: false
    },
    {
        id: 7,
        artistName: "OPEN MIC NIGHT @ THE MERRI BAR",
        genre: "Indie Rock",
        venueName: "The Merri Bar",
        venueLocation: "Preston, 15 Gilbert Road",
        date: "2026-08-13",
        time: "19:00",        // 7:00 PM
        isFavorite: false
    },
    {
        id: 8,
        artistName: "TOAD. SUNDAY LIVINGSTONE, KRAZY SALT",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-14",
        time: "20:30",        // 8:30 PM
        isFavorite: false
    },
    {
        id: 9,
        artistName: "DREA JORDANE",
        genre: "Indie Rock",
        venueName: "Hotel Esplanade (aka The Espy)",
        venueLocation: "St Kilda, 11 The Esplanade",
        date: "2026-08-14",
        time: "19:30",        // 7:30 PM
        isFavorite: false
    },
    {
        id: 10,
        artistName: "DOMA Ft: DJ Dem Large, Koletsas, Sammie",
        genre: "Indie Rock",
        venueName: "The Vic Bar",
        venueLocation: "Abbotsford, 281 Victoria St",
        date: "2026-08-15",
        time: "19:00",        // 7:00 PM
        isFavorite: false
    },
    {
        id: 11,
        artistName: "CERES WINTER TWILIGHT MARKET",
        genre: "Folk",
        venueName: "CERES Community Environment Park",
        venueLocation: "Brunswick, Corner of Roberts St & Stewart St",
        date: "2026-08-15",
        time: "12:00",        // 12:00 PM
        isFavorite: false
    },
    {
        id: 12,
        artistName: "PINKO COLLECTIVE",
        genre: "Indie Rock",
        venueName: "Bar 303",
        venueLocation: "Northcote, 303 High St",
        date: "2026-08-15",
        time: "15:30",        // 3:30 PM
        isFavorite: false
    },
    {
        id: 13,
        artistName: "MICHAELEAH. ABENY, PAIGE MCSMITH",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-15",
        time: "16:30",        // 4:30 PM
        isFavorite: false
    },
    {
        id: 14,
        artistName: "THOM JOHNSTON",
        genre: "Folk",
        venueName: "The Merri Bar",
        venueLocation: "Preston, 15 Gilbert Road",
        date: "2026-08-15",
        time: "19:00",        // 7:00 PM
        isFavorite: false
    },
    {
        id: 15,
        artistName: "DAVID M WESTERN. CHARLOTTE LE LIEVRUE",
        genre: "Indie Rock",
        venueName: "Lulie Tavern",
        venueLocation: "Abbotsford, 225 Johnston St",
        date: "2026-08-20",
        time: "19:00",        // 7:00 PM
        isFavorite: false
    },
    {
        id: 16,
        artistName: "OPEN MIC NIGHT @ THE MERRI BAR",
        genre: "Indie Rock",
        venueName: "The Merri Bar",
        venueLocation: "Preston, 15 Gilbert Road",
        date: "2026-08-20",
        time: "19:00",        // 7:00 PM
        isFavorite: false
    },
    {
        id: 17,
        artistName: "STELLA ANNING TRIO",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-20",
        time: "20:30",        // 8:30 PM
        isFavorite: false
    },
    {
        id: 18,
        artistName: "VIVA LA DISCOTECA",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-21",
        time: "20:00",        // 8:00 PM
        isFavorite: true
    },
    {
        id: 19,
        artistName: "JOSHUA BATTEN BAND",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-22",
        time: "16:30",        // 4:30 PM
        isFavorite: false
    },
    {
        id: 20,
        artistName: "OPEN MIC NIGHT @ THE MERRI BAR",
        genre: "Indie Rock",
        venueName: "The Merri Bar",
        venueLocation: "Preston, 15 Gilbert Road",
        date: "2026-08-27",
        time: "19:00",        // 7:00 PM
        isFavorite: false
    }
];

const app = createApp({
    setup() {
        // ---- REACTIVE STATE ----
        const gigs = ref(gigData);
        const selectedGenre = ref('all');
        const selectedVenue = ref('all');
        const selectedDate = ref('');

        // ---- COMPUTED PROPERTIES ----
        // These automatically update when the data or filters change
        
        // Get unique genres for the filter dropdown
        const uniqueGenres = computed(() => {
            const genres = gigs.value.map(g => g.genre);
            return [...new Set(genres)].sort();
        });

        // Get unique venues for the filter dropdown
        const uniqueVenues = computed(() => {
            const venues = gigs.value.map(g => g.venueName);
            return [...new Set(venues)].sort();
        });

        // Count upcoming shows
        const getUpcomingCount = computed(() => {
            return gigs.value.length;
        });

        // Filter the gigs based on all selected filters
        const filteredGigs = computed(() => {
            // STEP 1: Filter the gigs
            const filtered = gigs.value.filter(gig => {
                // Genre filter
                const matchesGenre = selectedGenre.value === 'all' || 
                                    gig.genre === selectedGenre.value;
                
                // Venue filter
                const matchesVenue = selectedVenue.value === 'all' || 
                                    gig.venueName === selectedVenue.value;
                
                // Date filter (if a date is selected)
                let matchesDate = true;
                if (selectedDate.value) {
                    matchesDate = gig.date === selectedDate.value;
                }
                
                return matchesGenre && matchesVenue && matchesDate;
            });

            // STEP 2: Sort the filtered results
            return filtered.sort((a, b) => {
                // First, compare dates
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                
                if (dateA < dateB) return -1;  // a is earlier
                if (dateA > dateB) return 1;   // a is later
                
                // Dates are equal, compare times
                // Times are in "HH:MM" format, which sorts lexicographically!
                if (a.time < b.time) return -1;
                if (a.time > b.time) return 1;
                
                // Dates and times are equal, keep original order
                return 0;
            });
});

        // ---- METHODS ----
        const clearFilters = () => {
            selectedGenre.value = 'all';
            selectedVenue.value = 'all';
            selectedDate.value = '';
        };

        const toggleFavorite = (gigId) => {
            const gig = gigs.value.find(g => g.id === gigId);
            if (gig) {
                gig.isFavorite = !gig.isFavorite;
            }
        };

        // Utility: Format date for display
        const formatDate = (dateString) => {
            const date = new Date(dateString + 'T00:00:00');
            return date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
        };

        // Utility: Format time for display (converts 24h to 12h with AM/PM)
        const formatTime = (timeString) => {
            // timeString comes in as "19:30"
            if (!timeString) return 'TBD';
    
            const [hours, minutes] = timeString.split(':').map(Number);
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12;
            return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        };

        // ---- RETURN ----
        return {
            gigs,
            selectedGenre,
            selectedVenue,
            selectedDate,
            uniqueGenres,
            uniqueVenues,
            getUpcomingCount,
            filteredGigs,
            clearFilters,
            toggleFavorite,
            formatDate,
            formatTime
        };
    }
});

app.mount('#app');
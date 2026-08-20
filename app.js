const { createApp, ref, computed } = Vue;

// ---- OUR DATA ----
// In a real app, this would come from an API. For now, it's a rich data store.
const gigData = [
    {
        id: 1,
        artistName: "SHINE CAUGHT BLUE",
        genre: "Experimental",
        venueName: "Birramung Marr",
        venueLocation: "Melbourne, Batman Ave",
        date: "2026-08-21",
        time: "20:00",        // 8:00 PM
        isFavorite: true
    },
    {
        id: 2,
        artistName: "VIVA LA DISCOTECA",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-21",
        time: "20:00",        // 8:00 PM
        isFavorite: true
    },
    {
        id: 3,
        artistName: "JOSHUA BATTEN BAND",
        genre: "Indie Rock",
        venueName: "Brunswick Artists' Bar",
        venueLocation: "Brunswick, 316 Sydney Rd",
        date: "2026-08-22",
        time: "16:30",        // 4:30 PM
        isFavorite: false
    },
    {
        id: 4,
        artistName: "BRIANNA ELLINGHAM (piano)",
        genre: "Classical",
        venueName: "St Paul's Cathedral",
        venueLocation: "Melbourne, 200 Flinders St",
        date: "2026-08-26",
        time: "13:00",        // 1:00 PM
        isFavorite: false
    },
    {
        id: 5,
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
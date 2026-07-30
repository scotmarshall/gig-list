const { createApp, ref, computed } = Vue;

// ---- OUR DATA ----
// In a real app, this would come from an API. For now, it's a rich data store.
const gigData = [
    {
        id: 1,
        artistName: "The Midnight Echoes",
        genre: "Indie Rock",
        venueName: "The Velvet Lounge",
        venueLocation: "Downtown, 123 Main St",
        venueCapacity: 150,
        date: "2026-08-15",
        isFavorite: false
    },
    {
        id: 2,
        artistName: "Jazz Collective",
        genre: "Jazz",
        venueName: "Blue Note Bar",
        venueLocation: "West End, 45 Jazz Ave",
        venueCapacity: 80,
        date: "2026-08-18",
        isFavorite: true
    },
    {
        id: 3,
        artistName: "Synthwave Dreams",
        genre: "Electronic",
        venueName: "Neon Warehouse",
        venueLocation: "Arts District, 88 Electric Blvd",
        venueCapacity: 300,
        date: "2026-08-22",
        isFavorite: false
    },
    {
        id: 4,
        artistName: "Acoustic Sessions",
        genre: "Folk",
        venueName: "The Velvet Lounge",
        venueLocation: "Downtown, 123 Main St",
        venueCapacity: 150,
        date: "2026-08-25",
        isFavorite: false
    },
    {
        id: 5,
        artistName: "Funk Fusion Band",
        genre: "Funk",
        venueName: "The Groove Yard",
        venueLocation: "East Side, 77 Rhythm St",
        venueCapacity: 200,
        date: "2026-09-01",
        isFavorite: false
    },
    {
        id: 6,
        artistName: "Classical Quartet",
        genre: "Classical",
        venueName: "Concert Hall",
        venueLocation: "City Center, 100 Symphony Way",
        venueCapacity: 500,
        date: "2026-09-05",
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
            return gigs.value.filter(gig => {
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
            formatDate
        };
    }
});

app.mount('#app');
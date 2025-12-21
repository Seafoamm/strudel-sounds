// Set a classic house tempo of 120 BPM. In Strudel, cpm is cycles per minute.
// A 4/4 measure is one cycle, so we set it to 120.
setcpm(120)

// Use samples from the user's specified bank
samples('github:Seafoamm/strudel-sounds')

// --- SONG STRUCTURE CONTROL ---
// We'll use a 16-cycle loop as the main structure for the song.
// We achieve this by using .slow(16) on our scheduling patterns.
// A pattern like "1 0 0 0" means something will play only in the first quarter (4 cycles) of the 16-cycle loop.

// --- INTRO (Cycles 1-4) ---

// A simple hi-hat pattern that plays for the first 8 cycles and then stops.
$: sound("hh*8")
  .ply("1 1 0 0".slow(4)) // Plays for the first half (8 cycles)
  .gain(0.6)

// The 'k_bday' sample plays in the intro with a sweeping band-pass filter.
$: n("0").s("k_bday")
  .every(2, (p) => p.rev()) // Reverse the sample every 2nd time for variation
  .bpf(sine.range(300, 1200).slow(8)) // Sweeping band-pass filter
  .room(0.3)
  .gain(0.9)
  .ply("1 0 1 0".slow(4)) // Play on the 1st and 3rd quarter of the first 16 cycles


// --- MIDDLE / BUILD-UP (Cycles 5-12) ---

// The main house beat: four-on-the-floor kick and a clap on beats 2 and 4.
// This pattern starts after the 4-cycle intro.
$: stack(
  sound("bd*4"),
  sound("~ cp ~ cp")
)
.bank("RolandTR909")
.ply("0 1 1 1".slow(4)) // Starts in the second quarter (cycle 5)
.gain(1)

// A simple, repeating bassline that comes in with the main beat and plays through the middle.
$: note("c2 c2 f2 c2")
  .sound("sine")
  .ply("0 1 1 0".slow(4)) // Plays in the middle two quarters (cycles 5-12)
  .gain(0.8)

// The 'k_bday' sample gets a progressive low-pass filter and the corrected delay effect.
// The filter opens up over 8 cycles, making the sound brighter and building energy.
$: n("0").s("k_bday")
  .lpf(saw.range(400, 8000).slow(8)) // Filter sweep from dark to bright
  .delay(0.4)
  .delaytime("3/8")
  .delayfeedback(0.5) // Corrected function name
  .ply("0 1 1 1".slow(4)) // Starts playing with the main beat
  .gain(0.7)


// --- END / OUTRO (Cycles 13-16) ---

// A melodic pad that only plays in the second half of the song.
// In the last 4 cycles, its filter closes, making it fade into the background.
$: note("c4 g4 eb4 g4")
  .sound("saw")
  .room(0.6)
  .size(0.8)
  .lpf(saw.range(4000, 500).slow(2)) // Filter closes at the very end
  .ply("0 0 1 1".slow(4)) // Plays only in the last half (cycles 9-16)
  .gain(0.6)
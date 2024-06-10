document.addEventListener('DOMContentLoaded', async function () {
    const playButton = document.getElementById('play-button');
    let player;
    let isPlaying = false;

    async function initializePlayer() {
        await Tone.start(); // Ensure Tone.js AudioContext is started with a user gesture
        console.log('Tone.js AudioContext started');

        player = new Tone.Player({
            url: 'one.ogg', // Use relative URL
            loop: true,
            autostart: false,
            onload: () => {
                console.log('Audio file loaded successfully');
                if (isPlaying) {
                    player.start();
                    console.log('Playback started');
                    playButton.textContent = 'Pause';
                }
            },
            onerror: (error) => {
                console.error('Error loading audio file', error);
            }
        }).toDestination();

        // Debugging: Check player state
        console.log('Player initialized:', player.loaded);
    }

    // Initialize the player on page load
    await initializePlayer();

    playButton.addEventListener('click', function () {
        console.log('Play button clicked');

        if (isPlaying) {
            console.log('Stopping playback');
            player.stop();
            playButton.textContent = 'Play';
        } else {
            console.log('Starting playback');
            if (player.loaded) {
                try {
                    player.start();
                    console.log('Playback started');
                } catch (error) {
                    console.error('Error starting playback', error);
                }
                playButton.textContent = 'Pause';
            } else {
                console.log('Player is not loaded yet, waiting for load to complete');
                isPlaying = true; // Set the flag to indicate we want to play once loaded
            }
        }

        isPlaying = !isPlaying;
    });

    // Debugging: Check document events and player state
    document.addEventListener('visibilitychange', () => {
        console.log('Document visibility changed:', document.visibilityState);
    });
    window.addEventListener('focus', () => {
        console.log('Window focused');
    });
    window.addEventListener('blur', () => {
        console.log('Window blurred');
    });
});

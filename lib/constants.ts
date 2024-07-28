export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

const DropboxUrlStretch = "https://www.dropbox.com/scl/fi/86spc009dhufkik6gkko2/stretchmusic1.mp3?rlkey=mc3w610wi1gxuz4fn52ysnk0q&st=49h5s5ko&dl=1";
const DropboxUrlWorkout = "https://www.dropbox.com/scl/fi/uo1knwfi1obo9uddc62na/workoutmusic1.mp3?rlkey=vkvorxs99360alk41ksm63c63&st=y7fbx85s&dl=1";
const DropboxUrlTest    = "https://www.dropbox.com/scl/fi/x9awu80bp5de4pv3gkxsf/testmusic1.mp3?rlkey=v4k10d5y7j7fy62k40ari7sws&st=a07svmg3&dl=1";

const DriveUrlStretch   = "https://drive.google.com/uc?export=download&id=0B2AV8VRk9HUedi0xRDRUSHE3bG8";
const DriveUrlWorkout   = "https://drive.google.com/uc?export=download&id=0B2AV8VRk9HUecjlnZ0FEYTNFSUk";

const localUrlStretch   = "/audio/stretchMusic1.mp3"
const localUrlWorkout   = "/audio/workoutMusic1.mp3"

export const MUSIC = {
    STRETCH_MUSIC_PATH : isProduction ? DropboxUrlStretch : localUrlStretch,
    WORKOUT_MUSIC_PATH : isProduction ? DropboxUrlWorkout : localUrlWorkout,
} as const;
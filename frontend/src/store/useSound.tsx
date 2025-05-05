import {create} from 'zustand'

interface SoundStore {
    soundEnabled : boolean,
    setSoundEnabled : (soundEnabled : boolean)=> void
}

export const useSoundStore = create<SoundStore>((set)=>({
    soundEnabled : true,
    setSoundEnabled(soundEnabled) {
        set({soundEnabled : soundEnabled})
    },
}))
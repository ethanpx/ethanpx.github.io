import { create } from 'zustand'

type SystemStore = {
  open: boolean
  audio: HTMLAudioElement | undefined
  setOpen: (open: boolean) => void
  setAudio: (audio: HTMLAudioElement | undefined) => void
}

export const useSystemStore = create<SystemStore>()((set) => ({
  open: false,
  audio: undefined,
  setOpen: (open: boolean) => set({ open }),
  setAudio: (audio: HTMLAudioElement | undefined) => set({ audio }),
}))

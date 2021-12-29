import { state } from "fp-ts"
import createStore from "zustand"

type State = {
 isOpen: boolean
 toggleIsOpen: () => void
}
export const useMenu = createStore<State>((set) => ({
 isOpen: false,
 toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}))

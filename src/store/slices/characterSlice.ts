import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SelectedCharactersData} from '~/types/api/character';

interface CharacterState {
  selectedCharacters: SelectedCharactersData[];
}

const initialState: CharacterState = {
  selectedCharacters: [],
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    addSelectedCharacterList(
      state,
      action: PayloadAction<SelectedCharactersData[]>,
    ) {
      state.selectedCharacters = [...action.payload];
    },
    addSelectedCharacter(state, action: PayloadAction<SelectedCharactersData>) {
      state.selectedCharacters.push(action.payload);
    },
    removeSelectedCharacter(
      state,
      action: PayloadAction<SelectedCharactersData>,
    ) {
      state.selectedCharacters = state.selectedCharacters.filter(
        item => action.payload.id !== item.id,
      );
    },
    clearSelectedCharacter(state) {
      state.selectedCharacters = [];
    },
  },
});

export const {
  addSelectedCharacter,
  removeSelectedCharacter,
  clearSelectedCharacter,
  addSelectedCharacterList,
} = characterSlice.actions;
export default characterSlice.reducer;

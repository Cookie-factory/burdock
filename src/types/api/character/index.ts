export type CharacterItem = {
  id: string;
  name: string;
  profile?: string;
  characterSource: {name: string; id: string};
};

export type SelectedCharactersData = {
  id: string;
  name: string;
};

// src/utils/sound.js
import { Howl } from "howler";

export const sounds = {
  blyaaat: new Howl({ src: ["/blyaaat.mp3"] }),
  getout:  new Howl({ src: ["/getout.mp3"]  }),
  vineboom: new Howl({ src: ["/vineboom.mp3"] }),
  nyansound: new Howl({ src: ["/nyansound.mp3"] }),
};

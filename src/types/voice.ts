export type Word = {Word: string; Offset: number; Duration: number};

export type NBest = {
  Confidence: number;
  Lexical: string;
  ITN: string;
  MaskedITN: string;
  Display: string;
  Words: Word[];
};

export interface VoiceText {
  Id: string;
  RecognitionStatus: number;
  Offset: number;
  Duration: number;
  Channel: number;
  DisplayText: string;
  NBest: NBest[];
}

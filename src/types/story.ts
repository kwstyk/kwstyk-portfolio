// src/types/story.ts など共通ファイルに置くと便利
export interface Story {
  id:        string;
  source:    string;
  title:     string;
  summary:   string;
  url:       string;
  tags?:     string[];
  published: string;
  hidden?:   boolean;
}

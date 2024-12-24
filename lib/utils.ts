import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function TitleCase(input: string): string {
  if (input.length === 0) return input;
  input = input.toLowerCase();
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function capitalizedCase(input: string): string {
  const words = input.split(' ');
  const capitalizedWords = words.map(word => {
    word = word.toLowerCase();
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
  return capitalizedWords.join(' ');
}

export function sentenceCase(input: string): string {
  const sentences = input.split('.');
  const updated: string[] = [];

  sentences.map(function (sentence) {
    if (sentence) {
      sentence = sentence.toLowerCase();
      if (sentence[0] !== ' ') {
        const output = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        updated.push(output);
      }
      else {
        const output = sentence.charAt(1).toUpperCase() + sentence.slice(2);
        updated.push(' ' + output);
      }
    }
  });
  let final = updated.join('.');
  if (input.endsWith('.')) {
    final += '.';
  }
  return final;
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const {TURNSTILE_SECRET} = process.env

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDaysAndHours(totalHours: number): string {
  const days = Math.floor(totalHours / 24); // Calculate the number of days
  const hours = totalHours % 24; // Calculate the remaining hours

  if (days > 0) {
    // If there are days, show them and only show hours if there are any
    return `${days} day${days > 1 ? 's' : ''}${hours > 0 ? ' and ' + hours + ' hour' + (hours !== 1 ? 's' : '') : ''}`;
  } else {
    // If there are no days, show only the hours
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
}

export function formatCurrency(value:number) : string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getTimestamp() : string {
  const pad = (n: number,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
  const d = new Date();

  return `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function getUserIP(request: Request) : string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip');

  const headers = new Headers(request.headers);
  const proxyIP = headers.get('x-forwarded-for');

  return ip || proxyIP || 'IP not found';
}

export async function validateCaptcha(token:string) : Promise<boolean> {
  const data = new FormData();
  data.append("secret", TURNSTILE_SECRET as string);
  data.append("response", token);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    body: data,
    method: "POST",
  });
  const result = await res.json();
  return result.success;
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

function componentToHex(c: number) : string{
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r:number, g:number, b:number) : string{
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
'use client';
import { useState } from 'react';
import { Copy, RefreshCw, Download, Clipboard, Lock, LockOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import CryptoJS from 'crypto-js';

export default function EncoderDecoder() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [format, setFormat] = useState<
        'base64' | 'base64url' | 'hex' | 'url' | 'unicode' | 'rot13' | 'morse' | 'md5' | 'sha256'
    >('base64');
    const [direction, setDirection] = useState<'encode' | 'decode'>('encode');
    const [copied, setCopied] = useState(false);

    const formatOptions = [
        { value: 'base64', label: 'Base64' },
        { value: 'base64url', label: 'Base64 URL Safe' },
        { value: 'hex', label: 'Hexadecimal' },
        { value: 'url', label: 'URL Encode' },
        { value: 'unicode', label: 'Unicode' },
        { value: 'rot13', label: 'ROT13' },
        { value: 'morse', label: 'Morse' },
        { value: 'md5', label: 'MD5' },
        { value: 'sha256', label: 'SHA-256' },
    ];

    const handleEncode = async () => {
        switch (format) {
            case 'base64':
                setOutputText(btoa(inputText));
                break;
            case 'base64url':
                setOutputText(btoa(inputText).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
                break;
            case 'hex':
                setOutputText(Buffer.from(inputText).toString('hex'));
                break;
            case 'url':
                setOutputText(encodeURIComponent(inputText));
                break;
            case 'unicode':
                setOutputText(
                    inputText
                        .split('')
                        .map((c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`)
                        .join('')
                );
                break;
            case 'md5':
                try {
                    setOutputText(CryptoJS.MD5(inputText).toString());
                } catch (error) {
                    setOutputText('Error al generar el hash MD5');
                }
                break;
            case 'sha256':
                try {
                    const hash = new TextEncoder().encode(inputText);
                    const digest = await crypto.subtle.digest('SHA-256', hash);
                    const hex = Array.from(new Uint8Array(digest))
                        .map((byte) => byte.toString(16).padStart(2, '0'))
                        .join('');
                    setOutputText(hex);
                } catch (error) {
                    setOutputText('Error al generar el hash SHA-256');
                }
                break;
            case 'rot13':
                setOutputText(
                    inputText.replace(/[a-zA-Z]/g, (c) => {
                        const code = c.charCodeAt(0);
                        const base = c <= 'Z' ? 65 : 97; // 65 para mayúsculas, 97 para minúsculas
                        return String.fromCharCode(((code - base + 13) % 26) + base);
                    })
                );
                break;
            case 'morse':
                try {
                    interface MorseChar {
                        [key: string]: string;
                    }

                    const morseToChar: MorseChar = {
                        '.-': 'A',
                        '-...': 'B',
                        '-.-.': 'C',
                        '-..': 'D',
                        '.': 'E',
                        '..-.': 'F',
                        '--.': 'G',
                        '....': 'H',
                        '..': 'I',
                        '.---': 'J',
                        '-.-': 'K',
                        '.-..': 'L',
                        '--': 'M',
                        '-.': 'N',
                        '---': 'O',
                        '.--.': 'P',
                        '--.-': 'Q',
                        '.-.': 'R',
                        '...': 'S',
                        '-': 'T',
                        '..-': 'U',
                        '...-': 'V',
                        '.--': 'W',
                        '-..-': 'X',
                        '-.--': 'Y',
                        '--..': 'Z',
                        '-----': '0',
                        '.----': '1',
                        '..---': '2',
                        '...--': '3',
                        '....-': '4',
                        '.....': '5',
                        '-....': '6',
                        '--...': '7',
                        '---..': '8',
                        '----.': '9',
                        '.-.-.-': '.',
                        '--..--': ',',
                        '..--..': '?',
                        '-....-': '-',
                        '-..-.': '/',
                        '-...-': '=',
                        '-.-.--': '!',
                        '---...': ':',
                        '-.-.-.': ';',
                        '-.--.': '(',
                        '-.--.-': ')',
                        '.-...': '&',
                        '.-..-.': '"',
                        '.--.-.': '@',
                        '.-.-.': '+',
                    };

                    // Dividir el texto en códigos Morse
                    const codes = inputText.split(' ');

                    // Validar cada código y decodificar
                    const decoded = codes
                        .map((code) => {
                            if (code in morseToChar) {
                                return morseToChar[code];
                            }
                            return '?'; // Marcar caracteres no válidos
                        })
                        .join('');

                    setOutputText(decoded);
                } catch (error) {
                    setOutputText('Error al decodificar Código Morse');
                }
                break;
        }
    };

    const handleDecode = () => {
        switch (format) {
            case 'base64':
                try {
                    setOutputText(atob(inputText));
                } catch {
                    setOutputText('Texto no válido');
                }
                break;
            case 'base64url':
                try {
                    const padded = inputText + '='.repeat((4 - (inputText.length % 4)) % 4);
                    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
                    setOutputText(atob(base64));
                } catch {
                    setOutputText('Texto no válido');
                }
                break;
            case 'hex':
                try {
                    setOutputText(Buffer.from(inputText, 'hex').toString('utf8'));
                } catch {
                    setOutputText('Texto no válido');
                }
                break;
            case 'url':
                try {
                    setOutputText(decodeURIComponent(inputText));
                } catch {
                    setOutputText('Texto no válido');
                }
                break;
            case 'unicode':
                try {
                    setOutputText(
                        inputText.replace(/\\u([0-9A-Fa-f]{4})/g, (match, p1) => {
                            return String.fromCharCode(parseInt(p1, 16));
                        })
                    );
                } catch {
                    setOutputText('Texto no válido');
                }
                break;
            case 'md5':
                setOutputText('MD5 no puede ser decodificado');
                break;
            case 'rot13':
                setOutputText(
                    inputText.replace(/[a-zA-Z]/g, (c) => {
                        const code = c.charCodeAt(0);
                        const base = c <= 'Z' ? 65 : 97; // 65 para mayúsculas, 97 para minúsculas
                        return String.fromCharCode(((code - base + 13) % 26) + base);
                    })
                );
                break;
            case 'morse':
                try {
                    interface MorseChar {
                        [key: string]: string;
                    }

                    const morseToChar: MorseChar = {
                        '.-': 'A',
                        '-...': 'B',
                        '-.-.': 'C',
                        '-..': 'D',
                        '.': 'E',
                        '..-.': 'F',
                        '--.': 'G',
                        '....': 'H',
                        '..': 'I',
                        '.---': 'J',
                        '-.-': 'K',
                        '.-..': 'L',
                        '--': 'M',
                        '-.': 'N',
                        '---': 'O',
                        '.--.': 'P',
                        '--.-': 'Q',
                        '.-.': 'R',
                        '...': 'S',
                        '-': 'T',
                        '..-': 'U',
                        '...-': 'V',
                        '.--': 'W',
                        '-..-': 'X',
                        '-.--': 'Y',
                        '--..': 'Z',
                        '-----': '0',
                        '.----': '1',
                        '..---': '2',
                        '...--': '3',
                        '....-': '4',
                        '.....': '5',
                        '-....': '6',
                        '--...': '7',
                        '---..': '8',
                        '----.': '9',
                        '.-.-.-': '.',
                        '--..--': ',',
                        '..--..': '?',
                        '-....-': '-',
                        '-..-.': '/',
                        '-...-': '=',
                        '-.-.--': '!',
                        '---...': ':',
                        '-.-.-.': ';',
                        '-.--.': '(',
                        '-.--.-': ')',
                        '.-...': '&',
                        '.-..-.': '"',
                        '.--.-.': '@',
                        '.-.-.': '+',
                    };

                    // Dividir el texto en códigos Morse
                    const codes = inputText.split(' ');

                    // Validar cada código y decodificar
                    const decoded = codes
                        .map((code) => {
                            if (code in morseToChar) {
                                return morseToChar[code];
                            }
                            return '?'; // Marcar caracteres no válidos
                        })
                        .join('');

                    setOutputText(decoded);
                } catch (error) {
                    setOutputText('Error al decodificar Código Morse');
                }
                break;
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSwap = () => {
        setInputText(outputText);
        setOutputText('');
        setDirection(direction === 'encode' ? 'decode' : 'encode');
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Copy className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Codificador/Decodificador</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Convierte texto entre diferentes formatos de codificación
                </p>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value as any)}
                                className="select select-bordered flex-1">
                                {formatOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={direction}
                                onChange={(e) => setDirection(e.target.value as any)}
                                className="select select-bordered flex-1">
                                <option value="encode">Codificar</option>
                                <option value="decode">Decodificar</option>
                            </select>

                            <button onClick={handleSwap} className="btn btn-ghost flex-1">
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Intercambiar
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ingresa el texto..."
                                    className="textarea textarea-bordered h-48"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => handleCopy(inputText)} className="btn btn-ghost">
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copiar
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <button
                                    onClick={async () =>
                                        direction === 'encode' ? await handleEncode() : handleDecode()
                                    }
                                    className="btn btn-primary">
                                    {direction === 'encode' ? 'Codificar' : 'Decodificar'}
                                </button>
                            </div>

                            <div className="flex-1">
                                <textarea
                                    value={outputText}
                                    readOnly
                                    placeholder="Resultado..."
                                    className="textarea textarea-bordered h-48"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={() => handleCopy(outputText)} className="btn btn-ghost">
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

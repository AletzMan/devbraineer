'use client';
import { useState } from 'react';
import { Copy, ArrowRight, CheckCircle, Unlock, LockIcon, UnlockIcon, ArrowRightLeft } from 'lucide-react';
import CryptoJS from 'crypto-js';

export default function EncoderDecoder() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [format, setFormat] = useState<
        'base64' | 'base64url' | 'hex' | 'url' | 'unicode' | 'rot13' | 'morse' | 'md5' | 'sha256'
    >('base64');
    const [direction, setDirection] = useState<'encode' | 'decode'>('encode');
    const [copiedInput, setCopiedInput] = useState(false);
    const [copiedOutput, setCopiedOutput] = useState(false);

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

    const handleCopy = (text: string, type: 'input' | 'output') => {
        navigator.clipboard.writeText(text);
        if (type === 'input') {
            setCopiedInput(true);
            setTimeout(() => setCopiedInput(false), 2000);
        } else {
            setCopiedOutput(true);
            setTimeout(() => setCopiedOutput(false), 2000);
        }
    };

    const handleSwap = () => {
        setInputText(outputText);
        setOutputText('');
        setDirection(direction === 'encode' ? 'decode' : 'encode');
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-base-100 shadow-xl">
                <div className="">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <label className="label flex flex-col items-start">
                                <span>Formato</span>
                                <select
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value as any)}
                                    className="select select-md">
                                    {formatOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="grid md:grid-cols-[1fr_0.5fr_1fr] gap-4">
                            <div className="relative pt-12 bg-base-200 p-2 rounded-sm">
                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Ingresa el texto..."
                                    className="textarea textarea-bordered h-48 w-full"
                                />
                                <button
                                    onClick={() => handleCopy(inputText, 'input')}
                                    className="absolute top-2 right-2 btn btn-sm btn-soft">
                                    {copiedInput ? <CheckCircle className="size-4" /> : <Copy className="size-4" />}
                                    {copiedInput ? 'Copiado' : 'Copiar'}
                                </button>
                            </div>
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <button onClick={handleSwap} className="btn btn-soft w-36">
                                    <ArrowRightLeft className="size-4" />
                                    Intercambiar
                                </button>
                                <button
                                    onClick={async () =>
                                        direction === 'encode' ? await handleEncode() : handleDecode()
                                    }
                                    className="btn btn-primary w-36">
                                    {direction === 'encode' ? (
                                        <LockIcon className="size-4" />
                                    ) : (
                                        <UnlockIcon className="size-4" />
                                    )}
                                    {direction === 'encode' ? 'Codificar' : 'Decodificar'}
                                </button>
                            </div>
                            <div className="relative bg-base-200 p-2 pt-12  rounded-sm">
                                <textarea
                                    value={outputText}
                                    readOnly
                                    placeholder="Resultado..."
                                    className="textarea textarea-bordered h-48 w-full"
                                />
                                <button
                                    onClick={() => handleCopy(outputText, 'output')}
                                    className="absolute top-2 right-2 btn btn-sm btn-soft">
                                    {copiedOutput ? <CheckCircle className="size-4" /> : <Copy className="size-4" />}
                                    {copiedOutput ? 'Copiado' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

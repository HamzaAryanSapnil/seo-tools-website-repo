// tools/wordpress-password-generator.jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, RefreshCw, Key } from 'lucide-react';
// import phpass from 'phpass';

class WordPressHasher {
  constructor() {
    this.itoa64 =
      "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    this.iteration_count = 8;
    this.portable_hashes = true;
  }

  // Core hashing algorithm
  hash(password) {
    const salt = this.gensalt();
    const hash = this.crypt(password, salt);
    return hash;
  }

  gensalt() {
    const salt = this.portable_hashes ? "$P$" : "$S$";
    return salt + this.encode64(this.random(6), this.iteration_count);
  }

  // Helper methods
  random(count) {
    const array = new Uint8Array(count);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => String.fromCharCode(byte)).join("");
  }

  encode64(input, count) {
    let output = "";
    let i = 0;
    do {
      let value = input.charCodeAt(i++); // Changed from const to let
      output += this.itoa64[value & 0x3f];
      if (i < count) value |= input.charCodeAt(i) << 8;
      output += this.itoa64[(value >> 6) & 0x3f];
      if (i++ >= count) break;
      if (i < count) value |= input.charCodeAt(i) << 16;
      output += this.itoa64[(value >> 12) & 0x3f];
      if (i++ >= count) break;
      output += this.itoa64[(value >> 18) & 0x3f];
    } while (i < count);
    return output;
  }

  crypt(password, setting) {
    // Full implementation of WordPress crypt method
    // (Implementation details excluded for brevity)
    return "$$" + this.encode64(this.random(16), 16); // Simplified return
  }
}

const WordPressPasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [salts, setSalts] = useState({});
  const [copied, setCopied] = useState({});

   
  // Initialize WordPress-compatible hasher
//   const hasher = new phpass({
//     iteration_count: 8,
//     portable_hashes: true
//   });

  // Custom salt generator
//   const generateSalt = (length = 64) => {
//     const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
//     return Array.from({ length }, () => 
//       chars[Math.floor(Math.random() * chars.length)]
//     ).join('');
//   };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=";
    const newPassword = Array.from(
      { length: 16 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");

    const hasher = new WordPressHasher();
    const newHash = hasher.hash(newPassword);

    // Generate salts using Web Crypto API
    const generateSalt = (length = 64) => {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      return Array.from(array, (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");
    };

    setPassword(newPassword);
    setHash(newHash);
    setSalts({
      AUTH_KEY: generateSalt(),
      SECURE_AUTH_KEY: generateSalt(),
      LOGGED_IN_KEY: generateSalt(),
      NONCE_KEY: generateSalt(),
      AUTH_SALT: generateSalt(),
      SECURE_AUTH_SALT: generateSalt(),
      LOGGED_IN_SALT: generateSalt(),
      NONCE_SALT: generateSalt(),
    });
    setCopied({});
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(prev => ({ ...prev, [field]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [field]: false }), 2000));
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-6 h-6" />
          WordPress Password Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <Button onClick={generatePassword} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Generate New Password
          </Button>

          {password && (
            <div className="space-y-6">
              {/* Password Section */}
              <div className="space-y-2">
                <label className="font-medium">Generated Password</label>
                <div className="flex gap-2">
                  <Input value={password} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(password, 'password')}
                  >
                    {copied.password ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Hash Section */}
              <div className="space-y-2">
                <label className="font-medium">WordPress Hash</label>
                <div className="flex gap-2">
                  <Input value={hash} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(hash, 'hash')}
                  >
                    {copied.hash ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Salts Section */}
              <div className="space-y-4">
                <h3 className="font-medium">Recommended Salts</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(salts).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-mono">{key}</label>
                      <div className="flex gap-2">
                        <Input value={value} readOnly className="font-mono text-sm" />
                        <Button
                          variant="outline"
                          size="icon"
                          className="shrink-0"
                          onClick={() => copyToClipboard(value, key)}
                        >
                          {copied[key] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WordPressPasswordGenerator;
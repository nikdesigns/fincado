// src/app/contact/ContactForm.tsx
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Mail,
  Send,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

type Props = {
  supportEmail: string;
  officeCity?: string;
};

export default function ContactForm({ supportEmail, officeCity }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Support');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Validate email format
  const validateEmail = (email: string) => {
    if (!email) return true; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Build mailto link and open user's mail client
  function handleSend(e: React.FormEvent) {
    e.preventDefault();

    // Validate email if provided
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');

    const subject = encodeURIComponent(
      `[${topic}] ${name || 'Anonymous User'}`,
    );
    const bodyLines = [
      `Name: ${name || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Topic: ${topic}`,
      '',
      'Message:',
      message || 'No message provided',
      '',
      '',
      '---',
      `Sent from Fincado Contact Form`,
      `Office: ${officeCity || 'N/A'}`,
      `Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));

    const mailto = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  }

  // Copy email to clipboard
  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(supportEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  }

  // Character count for message
  const messageLength = message.length;
  const maxLength = 1000;

  return (
    <div className="space-y-6">
      {/* Main Form */}
      <form onSubmit={handleSend} className="space-y-5">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-slate-700"
            >
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="h-11"
            />
            <p className="text-xs text-slate-500">Optional but helpful</p>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700"
            >
              Your Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="you@example.com"
              className={`h-11 ${emailError ? 'border-red-500' : ''}`}
            />
            {emailError ? (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {emailError}
              </p>
            ) : (
              <p className="text-xs text-slate-500">For us to reply</p>
            )}
          </div>
        </div>

        {/* Topic Selector */}
        <div className="space-y-2">
          <Label
            htmlFor="topic"
            className="text-sm font-semibold text-slate-700"
          >
            Topic
          </Label>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger id="topic" className="h-11 bg-white">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200 shadow-lg z-50">
              <SelectItem
                value="Support"
                className="cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600">🛟</span>
                  <span>Support</span>
                </div>
              </SelectItem>
              <SelectItem
                value="Partnership"
                className="cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🤝</span>
                  <span>Partnership</span>
                </div>
              </SelectItem>
              <SelectItem
                value="Press"
                className="cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">📰</span>
                  <span>Press</span>
                </div>
              </SelectItem>
              <SelectItem
                value="Feedback"
                className="cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-600">💬</span>
                  <span>Feedback</span>
                </div>
              </SelectItem>
              <SelectItem
                value="Other"
                className="cursor-pointer hover:bg-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">❓</span>
                  <span>Other</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="message"
              className="text-sm font-semibold text-slate-700"
            >
              Message
            </Label>
            <span
              className={`text-xs ${
                messageLength > maxLength ? 'text-red-600' : 'text-slate-500'
              }`}
            >
              {messageLength}/{maxLength}
            </span>
          </div>
          <Textarea
            id="message"
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            placeholder="Tell us what's happening or what you need help with..."
            className="resize-none"
          />
          <p className="text-xs text-slate-500">
            Be as detailed as possible for faster resolution
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            Open Mail Client
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCopyEmail}
            className="border-slate-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-emerald-600" />
                Email Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Email
              </>
            )}
          </Button>

          <Button
            asChild
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <a href={`mailto:${supportEmail}?subject=Quick Question`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Quick Email
            </a>
          </Button>
        </div>

        {/* Form Info */}
        {!message.trim() && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">
              Please write a message before sending
            </p>
          </div>
        )}
      </form>

      {/* Alternative Contact Method */}
      <Card className="border-slate-200 bg-slate-50">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Alternative Method
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Prefer not to use your mail client? Copy the support email and
                send from any webmail service or ticketing system.
              </p>

              <div className="flex flex-wrap items-center gap-3 bg-white border border-slate-200 rounded-lg p-3">
                <span className="text-xs font-semibold text-slate-700">
                  Support Email:
                </span>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {supportEmail}
                </a>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyEmail}
                  className="ml-auto h-8 text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 mr-1 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Tips for Faster Response
          </h4>
          <ul className="space-y-1.5 text-xs text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Include specific page URLs if reporting issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>
                Mention browser/device if experiencing technical problems
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>
                Check our FAQ section before submitting support requests
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { DEMO_VIDEO_URL } from '@/lib/constants';

interface VideoPlayerProps {
  className?: string;
  autoplayDelay?: number; // Delay in milliseconds before autoplay
}

// Convert YouTube URL to embed URL with safe parsing
function getYouTubeEmbedUrl(url: string): string {
  try {
    // Validate input
    if (!url || typeof url !== 'string') {
      return '';
    }

    // Handle YouTube Shorts
    if (url.includes('/shorts/')) {
      const parts = url.split('/shorts/');
      if (parts.length < 2 || !parts[1]) {
        return url; // Return original if parsing fails
      }

      const videoId = parts[1].split('?')[0];
      if (!videoId || videoId.length === 0) {
        return url;
      }

      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle regular YouTube URLs
    if (url.includes('youtube.com/watch?v=')) {
      const params = url.split('v=');
      if (params.length < 2 || !params[1]) {
        return url;
      }

      const videoId = params[1].split('&')[0];
      if (!videoId || videoId.length === 0) {
        return url;
      }

      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle youtu.be URLs
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      if (parts.length < 2 || !parts[1]) {
        return url;
      }

      const videoId = parts[1].split('?')[0];
      if (!videoId || videoId.length === 0) {
        return url;
      }

      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Return original URL if no pattern matches
    return url;
  } catch (error) {
    // Fallback to original URL if any error occurs
    return url;
  }
}

export default function VideoPlayer({ className = '', autoplayDelay = 0 }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(DEMO_VIDEO_URL);

  // Autoplay after delay - Note: YouTube Shorts don't support autoplay in embed
  // So we'll just show an animated play button pulse effect instead
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    if (autoplayDelay > 0) {
      const timer = setTimeout(() => {
        setShouldPulse(true);
      }, autoplayDelay);

      return () => clearTimeout(timer);
    }
  }, [autoplayDelay]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Video Container - 16:9 aspect ratio for regular videos, 9:16 for shorts */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-900">
        {/* For YouTube Shorts - vertical aspect ratio */}
        <div className="relative mx-auto max-w-[360px] aspect-[9/16]">
          {!isPlaying ? (
            // Thumbnail with play button
            <div className="relative w-full h-full group cursor-pointer">
              {/* YouTube Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${embedUrl.split('/embed/')[1]}/maxresdefault.jpg`}
                alt="Demo Video"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to default quality if maxres not available
                  e.currentTarget.src = `https://img.youtube.com/vi/${embedUrl.split('/embed/')[1]}/hqdefault.jpg`;
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Play video"
              >
                <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-6 shadow-2xl transform group-hover:scale-110 transition-all ${
                  shouldPulse ? 'animate-pulse scale-110' : ''
                }`}>
                  <Play className="w-12 h-12 text-white fill-white ms-1" />
                </div>
              </button>
            </div>
          ) : (
            // YouTube iframe
            <iframe
              src={`${embedUrl}?autoplay=1&rel=0`}
              title="LeadWise Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}

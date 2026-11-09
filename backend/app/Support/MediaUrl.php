<?php

namespace App\Support;

class MediaUrl
{
    /**
     * Convert a stored media path into a public URL.
     *
     * Absolute URLs and Next.js public paths (e.g. "/aset/foo.png") are kept
     * as-is. Relative paths returned by Storage::put() are served from the
     * Laravel public disk.
     */
    public static function toUrl(?string $path): string
    {
        if ($path === null || $path === '') {
            return '';
        }

        if (preg_match('#^https?://#i', $path) === 1) {
            return $path;
        }

        if (str_starts_with($path, '/') && ! str_starts_with($path, '//')) {
            return $path;
        }

        return asset('storage/'.$path);
    }
}

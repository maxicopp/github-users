import '@testing-library/jest-dom'
import React from 'react'
import type { StaticImageData } from 'next/image'

type ImgProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

declare module 'react' {
  interface IntrinsicElements {
    img: ImgProps
  }
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, width, height }: {
    src: string | StaticImageData;
    alt: string;
    width: number;
    height: number;
  }) {
    return React.createElement('img', {
      src: typeof src === 'object' ? src.src : src,
      alt,
      width,
      height
    })
  }
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return React.createElement('a', { href }, children)
  }
}))

class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver;

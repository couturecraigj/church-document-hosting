import React from "react";

const Logo = () => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    className="Layout-logo"
    viewBox="0 0 1134 1134"
  >
    <filter id="inset-shadow" x="-100%" y="-100%" width="400%" height="400%">
      <feComponentTransfer in="SourceAlpha">
        <feFuncA type="table" tableValues="1 0" />
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="30" />
      <feOffset dx="0" dy="0" result="offsetblur" />
      <feFlood floodColor="rgb(0, 0, 0)" result="color" />
      <feComposite in2="offsetblur" operator="in" />
      <feComposite in2="SourceAlpha" operator="in" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode />
      </feMerge>
    </filter>
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M641 19l-3 1-2 1-2 1-2 1-3 1-4 2-5 1-2 1-2 1-2 1-2 1-1 1-2 1-4 1-5 2-2 1-3 2-3 2-1 1-2 1-10 5-3 2-2 2-3 1-3 2-2 2-3 2c-1 2-3 2-8 2l-6-1-13-1-14-1-3-1-4 1-13 1-14 1-10 2-10 1-3 1-4 1-4 1-4 1-2 1-3 1-5 2-6 1-1 1-2 1-2 1-2 1-2 1-3 1-4 2-4 1-1 1-2 1-2 1-2 1-1 1-3 2-3 1-2 1-1 1-3 2-3 2-2 1-2 1-4 3-3 2-3 2-3 2-4 4-5 3-4 4-4 3c-1 0-3 1-6 5-3 3-5 3-5 0l-1-2-1-1-1-2-1-2-1-2-2-3-1-4-1-1-1-2-1-2-1-2-1-1-6-13-1-3-1-3-1-3-2-4c-1 0-2-2-2-5-1-4-1-4-4-4h-3v7l-1 8a551 551 0 0 0 1 72c0 3 0 3 4 3l3-1 4-1 4-1 3-1 2-1 8-1 7-2 4-1 3-1 5-1 4-1 5-1 4-1 9-1 9-2 6-1 5-1 5-1 4-1 2-1 1-1 3-2 4-2 3-2 1-1 2-1 2-1 4-2 3-1 2-1 2-1 2-1 1-1 2-1 2-1 5-1 4-2 3-1 2-1 4-1 4-1 7-1 7-2 5-1c5 0 6 0 10 5l6 5 1 2 3 4 2 4 2 2 2 3 2 3 1 2 1 2 1 2 2 3 2 2 4 9 1 3 1 3 1 2 1 1 1 3 1 3 1 3c1 2 4 3 5 0a127 127 0 0 0 0-30c-2 0-2-3-2-13l-1-13-1-6 1-6 1 1 6 1 8 1 8 2 7 1 5 1 4-1 9-1 10-2 7-1 5-1 6-1 5-1 6-1 6-1 5-1c8 0 13-1 13-3 0-1-2-4-4-4l-1-1-3-1-4-2-2-1-2-1-2-1-2-1-2-1-3-1-3-1-4-2-3-1-3-1-1-1-2-1 1-1 1-2 2-3 1-2 5-5 1-2 3-4 2-3 2-3 5-6 4-5 3-4 5-5 4-6 1-2 1-1c0-2-3-2-9-1z"
    />
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M746 40l-4 3-5 5-6 4a373 373 0 0 0-48 51c-3 3-3 3-17 4l-14 1-7 1-7 1-7 1-6 1-11 1-11 2-5 1-6 1-5 1-4 1-5 1-5 1-9 1-10 2-1 23v21h10l10-2 5-1 5-1 4-1 5-1 5-1 5-1 10-1 11-2c1-2 3 0 9 7l4 3 14 13 15 15 5 4 4 5 5 4 4 4 2 4c1 2 1 3 3 3s2-1 2-4l-1-5-1-4-1-4-2-5-1-5-1-3-1-3-1-2-1-3-1-2-1-3-2-7-3-9-1-4-1-2-1-2c0-2 1-2 10-3a780 780 0 0 1 95 5l5 1 3 1 3 1 6 1 6 2 3 1 3 1 1 1 2 1 3 1 3 1 6 1 6-1 4-1 4-1 3-1 4-1 3-1 4-1 7-2 6-1 2-1 3-1 3-1c3 0 6-2 6-4l-1-1-4-3-4-3-2-1-3-1-2-2-2-1-2-1-1-1-3-2-5-2-3-2-2-1-2-1-3-1-2-1-2-1-2-1-5-2-4-1-3-1-2-1-3-1-3-1-2-1-3-1-8-2-7-1-5-1-4-1-4-1-5-1-19-2c-13 0-19-1-20-2v-7l1-3 1-3 1-3 1-2 1-3 1-3 1-3 1-2 2-5 1-4 1-3 1-2 1-2 1-2 1-2 1-5 2-5 1-2 1-3c0-3 0-3-2-3s-4 1-5 3zM468 121l-5 1-6 2-2 1-2 1-2 1-3 1-2 1-2 1-3 2-4 1-1 1-2 2-1 2-1 1c0 2-5 6-8 6l-3 1-6 1-7 1-9 1-11 2-5 1-4 1-4 1-5 1-4 1-5 1-7 1-7 2-3 1-4 1-3 1-4 1-3 1-3 1-6 1-6 2-4 1-2 1-2 1-3 1-3 1-3 1-5 2-4 1-1 1-2 1-3 1-3 1-1 1-2 1-4 1-4 2-1 1-2 1-2 1-2 1-9 4-2 1-1 1-3 2-5 2-4 3-3 2-3 2-4 2-2 2-2 1c-1 0-2-1-2-5l-2-4-1-3-1-2-1-3-1-2-1-3-1-3-2-6-1-5-1-4-1-3-1-3-1-2-1-4-1-3-1-3c0-5-1-8-3-8l-2 1-1 2-1 3-1 3-2 7-1 7-1 4-1 5-1 5-1 6-1 7-1 7-1 22c0 18 0 22-2 24l-1 3-1 2-5 5-3 4-2 3-2 3-2 2-2 3c-2 2-1 6 2 9l4 5 6 7 3 4 5 6 2 3 2 2 2 3 1 2 2 4c0 3 0 3 4 3l4-1 5-1 5-1 19-1a77 77 0 0 1 25 2l5 1 6 1c4 0 5 0 5-2s-2-4-6-5l-4-2-3-2-2-1-2-1-1-1-3-1-5-3-3-2-2-1c0-1-7-4-10-4l-1-1-3-1-2-1-2-1-2-1-5-2-4-4 7-7 1-2 2-3 4-5 9-9 4-3c1 0 3-1 6-5l3-2 4-2 3-3 3-2 3-2 3-2 5-3 3-1 2-1 3-2 2-2 2-1 3-1 4-2 2-1 2-1 2-1 3-1 2-1 2-1 5-2 4-1 2-1 3-1 2-1 2-1 2-1 3-1 7-2 6-1 2-1 3-1 4-1 4-1 2-1 3-1 8-1 9-2h3l3 2 5 4 5 4 4 4 4 3c2 0 11 9 11 10l2 1 4 3 5 5 4 2 2 1 8 8 1 2 3 2 4 3c3 3 5 3 5-1l-1-4-2-5-1-4-1-1-1-2-1-3-1-3-1-1-1-2-2-4-1-5-1-2-1-2-1-2-1-2-1-2-1-3-1-3-2-4-1-2-1-3-1-2c0-2 1-2 5-2l4-1 6-1 5-1 12-1 11-2 7-1 6-1 7-1 6-1 6-1 6-1 11-1 12-2c1-2 2-7 0-7l-1-2-1-3-1-2-1-2-1-1-1-2-1-3-2-4-1-2-1-2-1-2-1-2-1-1-1-2-1-2c-1-2-2-2-9-2l-7 1-6 1-6 1-3 1h-3v-18h-3l-4 1z"
    />
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M694 160l-4 1c-4 0-4 0-4 3l2 4 2 1 2 1 2 2 3 2 3 1 5 4 2 2 3 2c2 0 3 2 3 9l1 5 1 12 1 11 1 13 1 13 1 12 1 11 1 4 1 3c2 0 4-3 4-5l1-2 1-2 1-2 1-4 2-5 1-2 1-3 1-2 1-2 1-1 1-2 1-3 1-3 2-5 1-4 1-1 1-2 1-3 1-3 1-1 1-2 1-2c0-3 2-2 5 1l4 3 3 3 4 2 2 2 4 3 4 2 2 2 4 3 3 2 3 2 3 2 3 3 4 2 3 2 3 2 3 2 2 2 3 2 2 1 4 3 4 3 3 2 2 1 3 2 3 2 2 2 3 1 3 2 3 2 1 1 3 2 5 4 3 2 2 1 2 2 4 2 3 2 3 2 4 3 3 2 2 2 4 2 4 3 2 1 5 5 5 3 4 4 3 2 4 3 4 3 3 3v25a123 123 0 0 1-3 31l-1 5-1 4-1 5-1 3-1 4-1 4 1 5c2 0 8-5 8-7l3-4 3-3 1-3 2-3 1-2 5-5 1-2 2-2 2-4 2-3 2-3 2-2 1-2 2-3 1-2 1-2 1-3c2-1 2-1 4 1l2 3 6 8 7 7 3 4 4 5 5 5 1 2 1 3 2 3 2 2 2 3 1 2 2 3 2 5 2 3 1 1 1 2 1 2 1 4 2 5 1 2 1 2 1 2c0 2 0 3 2 3l2 1 4 2 5 3 1 1 3 2 3 2 2 1 2 1 3 2 2 1 2 1 1 1 2 1 2 1 3 1 3 2 1 1 2 1 2 1 2 1 2 1 1 1c1 0 2-1 2-3l-1-3-2-9-1-9-1-5-3-7-1-3-1-3-1-5-2-4-1-3-1-2-1-2-1-2-1-2-1-1-1-4-2-3-1-2-1-2-1-2-1-2-1-2-1-1-1-2-2-3-1-3-1-1-1-1 2-1 2-1 3-1 4-1 6-2 6-1 4-1 4-1 3-1 4-1 8-2 10-1 5-1 4-1 2-1 2-2c0-2-1-2-5-3l-4-1-3-1-3-1-3-1-2-1-3-1-3-1-7-2-7-1-5-1-4-1-5-1-4-1-8-1-7-1-13-1c-12 0-12 0-14-3l-5-4-4-5-6-5-4-5-9-8-2-2-2-2c-2 0-3-1-9-8l-4-3-6-5-5-4-5-4-4-3-4-3-3-2-3-3-4-2-4-3-4-3-2-2-3-1-2-1-5-5-2-1-2-2-4-2-3-2-3-3-4-2-3-2-2-2-3-2-4-2-3-2-1-1-3-2-3-2-3-3-4-2-3-2-3-2-1-1-3-2c-2 0-3-2-4-3l-2-1c-2 0-5-3-3-4l2-2 3-1 4-4 4-3 2-3 4-4c2 0 5-3 9-7l7-6 15-15-5-1-4 1-6 1-7 2-4 1-3 1-3 1-3 1-4 1-3 1-7 1-7 2-4 1-3 1-4 1-4 1-3 1-4 1-6 1c-4 1-5 1-6-1l-3-1-3-3-4-3-3-3-4-2-3-2-3-3-4-2-4-2-2-1-9-1-9-1-22-1-21 1z"
    />
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M890 168l-1 2-1 2-1 2-2 2-2 2-1 1-4 3-5 5-3 3-3 2-6 5-11 9-3 4c0 2 4 7 6 7l2 1 3 2 2 1 5 5 3 1c1 2 6 2 6 1l8-9 1 1 3 4c1 1 3 3 3 5l2 2 1 2 2 3 2 2 2 3 1 3 1 2 1 1 1 2 1 2 2 2 3 2 4 3 4 3 4 3 3 3 3 2 4 3 4 2 2 1 7 7 4 4 5 3 6 5 6 5 2 1 2 1c2 0 2-1 2-4l-1-5-1-4-2-6-2-4-2-5-1-3-1-3-1-2-1-3-1-2-1-2-2-5-1-4-1-1c0-2 1-2 5-2l6-1 6-1 6-1 7-1 6-1 9-1 9-1 8-1 8-1c1-1-3-4-4-4l-1-1-2-1-2-1-2-1-5-1-5-2-1-1-3-1-2-1-2-1-2-1-5-1-5-2-2-1-2-1-4-1-3-1-3-1-3-1-6-2-6-1-4-1-3-1-5-1-5-1-4-1c-4 0-5 0-6-2l-2-5-5-5-4-4-2-3-6-7-4-5-5-4c-1-2-6-3-7-1zM352 216l-2 1-3 1-6 2-7 1-2 1-3 1-3 1-3 1-2 1-3 1-4 1-5 2-2 1-3 1-2 1-2 1-2 1-2 1-3 2-4 1-1 1-2 1-2 1-2 1-2 1-2 1-2 1-3 2-2 1-2 1-1 1-3 2-3 2-4 3-3 2-6 5-5 4c-2 0-13 12-13 14s2 4 4 4l2 1 4 2 3 1 2 1 2 1 2 1 1 1 2 1 2 1 3 1 2 2 2 1 2 1c0 2 4 1 7-1l2-3 3-4 4-5 1-2 1-2 2-2 2-3 5-8 2-3 3-4 2-3 2-3 2-3 1-1 2-3c0-2 4-6 5-6l1-2c0-2 3-4 5-4l2-1 43-1c35 0 42 0 42-2l-2-1-3-2-2-2-2-1-3-1-4-2-2-1-2-1-2-1-2-1-1-1-2-1-3-1-4-2-2-1-2-1-6-1-7 1zM148 287l1 7 1 4 1 3 1 4 1 5 1 3 1 4 2 8 1 9 1 4 1 5 1 4 1 5 1 3 1 4 1 6c1 4 0 5-2 7l-2 3-2 3-2 2-2 4-3 4-2 2-2 3-1 3-2 2-2 3-2 3-1 1-2 3-2 4-2 3-2 2-2 3-1 3-2 2-2 3-2 3-1 1-1 2-1 2-2 3-1 2-1 2-1 2-1 2-2 2-3 5-1 4-1 2-1 1-1 2-1 2-1 2-1 1-1 4-2 3-1 2-1 2-1 2-1 2-1 2-1 1-2 5-1 4-1 2-1 2-1 3-1 2-1 3-1 3-2 5-1 5-1 3-1 3-1 3-1 2-1 4-1 3-2 9-1 9-1 3c0 3 0 3-3 3l-3-1-2-1-1-1-2-1-2-1-2-1-2-1-4-2-3-1-2-1-1-1-2-1-2-1-2-1-4-1-3-2-3-2-3-2-1-1-3-1-5-3-3-2-2-1-3-1c-2 0-2 1-2 3l1 3 2 3 1 2 2 3 3 5 3 5 2 4 2 2 2 4 3 4 2 3 2 2 3 5 4 4 12 13c20 19 19 18 19 23l1 4 1 6 1 6 2 9 1 9 1 3 1 3 1 4 1 3 1 3 1 2 2 5 1 4 1 2 1 2 1 3 1 2 1 2 1 2 2 4 1 3 1 2 1 2 1 2 1 1 1 2 1 2 2 3 1 2 1 2 2 3 2 3 1 1 2 2c0 2 2 4 3 5l3 4 3 3 2 4 2 3c4 3 7 6 7 8l1 2 5 4 4 4 4 5 5 4 4 5 12 11 7 6 2 2 3 3c2 1 2 1-1 4l-3 2-2 2-3 2-3 1-2 2-3 2-3 2-1 1-3 2-4 2-3 2-1 1-3 2-4 2-2 2-2 1-2 1-2 1-3 2c-1 0-6 4-6 6s1 2 6 2l5-1 11-1 11-1 8-1 8-1 6-1 5-1 11-2 11-1 5-1 4-1 3-1c3 0 4 1 5 2l4 3 3 2 2 2 4 2 4 3 3 2 2 2 3 2 3 2 3 2 4 3 2 1c1 1 2 3 4 3l3 2 2 1 3 2 2 2 2 1 2 2 4 2 3 2 3 2 4 3 3 2 2 2 3 2 4 2 3 2 1 1 4 3 5 3 2 2 2 1 4 3c1 1 3 3 5 3l2 2 2 1 3 2 3 3c2 0 6 3 6 5l3 1c3 0 3 0 3-4l1-3 2-8 1-7 1-4 1-3 1-4 1-3 1-2 1-4 1-3c0-1 0-2-2-2l-2-1-2-2-5-3-4-3-2-2-3-1-4-3-4-3-1-1-3-2-4-2-2-2-4-3-3-2-3-2-3-2-3-2-4-2-2-2-2-1c-3 0-5-7-5-15l-1-7-1-9-1-9-1-10-1-9-1-15-1-17c-1-4-4-4-4 0l-1 3c-1 0-4 7-4 10l-1 2-1 2-1 2-1 2-1 2-1 2-1 3-2 4-1 5-1 2-1 2-1 2-1 3-1 2-1 2-1 2-1 3-1 4c-1 3-3 4-3 2l-2-2c-2 0-4-2-5-3l-4-3-4-3-3-2-4-3-4-3-4-4-4-3c-1 0-3-1-6-5l-3-2-7-6-4-4-5-3-3-2-4-4-4-5-5-4-4-5-4-3-3-3-1-2c0-2-1-3-8-9l-3-4-2-4-3-3-2-3-2-3-2-3-3-4-1-1-1-2-1-2-2-3-1-2-1-2-1-2-1-2-1-2-1-2-1-1-1-2-1-4c-2-2-2-6 0-8l1-4 3-4 3-3 1-2 4-5a169 169 0 0 1 25-24l2-2 2-2 2-1 3-2 2-2 2-1 2-1 2-3c0-2-1-2-3-2l-3 1-3 1-4 1-7 1-7 2-3 1-3 1-2 1-3 1-3 1-3 1-5 1-5 2-3 1-3 1-2 1-2 1-2 1c-3 0-3 0-3-4l-1-5-1-17 1-17 1-7 1-8 1-4 1-5 2-7 1-7 1-2 1-3 1-3 1-3 1-2 1-3 1-3 2-4 1-5 1-3 1-1 1-2 1-2 1-2 1-2 1-3 1-3 2-4 1-2 1-2 1-2 1-2 1-1 2-3 1-3 1-2 1-1 1-2 1-2 2-3 3-5c0-2 1-3 2-3l2-3 1-2 1-2 2-2 1-3c0-2 1-2 5-2l4-1 8-1 9-1 24-2a183 183 0 0 0 32-2h9v-3c0-2 0-3-4-3l-5-2-3-1-3-1-1-1-2-1-3-1-3-1-3-2-4-1-2-1-3-1-2-1-2-1-2-1-5-1-5-2-2-1-2-1-2-1-2-1c-2 0-3 0-3-2l3-4 2-3 2-3 2-3 3-3 2-3 3-4 2-4 1-2 5-5 3-3 2-4 3-4 3-4 2-3 1-1 3-4 3-4 3-4 2-3 2-3c3-2 3-4-1-4l-3-1-9-1-9 1-8 1-8 1-7 1-7-1c0-2-6-8-7-8l-1-2-1-2-3-3-3-3-2-3-3-5-4-4-4-5-5-6-2-2-2-2-2-3-3-4-3-1h-2l1 7z"
    />
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M141 332l-1 3-2 8-1 7-1 5-1 4-1 6-1 5-1 8-1 8-1 5c0 3 0 4 2 4l7-7 2-3 2-3 3-3 2-4 2-3 2-3 1-1 1-3-1-3-1-3-1-4-1-4-1-5-2-8c0-8 0-8-3-8-2 0-3 0-3 2zM950 383c-3 4-4 6-4 11s0 6-2 8l-3 3-2 4-4 3-3 3-2 3-6 7-7 8-8 9-2 3-2 3-9 9-4 6c-6 5-6 7-1 7l3-1 3-1 2-1 5-2 4-1 2-1 2-1 2-1 2-1 2-1 7-2 7-3 2-1c0-1 4-3 9-4l3-1 2-1 2-1 2-1c2 0 3 3 3 10l1 4 1 7 1 6 1 6 1 5 1 5 1 5 1 11 2 11 1 5 1 4 1 5 1 4 1 6 1 5 1 9 2 9 1 5 1 5 1 5 1 4 1 6 1 5 1 11 2 12 1 8 1 7 1 9v8l-9 9-9 8-5 5-6 4-3 2-2 2-2 2-2 1-2 1c0 1-4 5-6 5l-3 2-1 1-3 2-3 2-2 1-3 2-2 1-2 1c-2 0-2 1-2 3 0 3 0 3 3 3l3-1 6-1 6-1 6-1 5-1 5-1 6-1 9-1 9-2 3-1 4-1 3-1c3 0 3 0 3 6l-1 5-1 11-1 10-1 6-1 5-1 5-1 4-1 7-2 7-1 4-1 4-1 3-1 2-1 3-1 2-2 4-1 4-1 3-1 2-1 2-1 2-1 2-1 1-1 2-2 3-1 3-1 1-1 2-2 3-2 4-2 2-1 2-1 2-6 6a236 236 0 0 1-49 42c-2 2-2 4-2 8l1 5 1 3 1 4 2 8 1 8 1 4 1 6h5l1-1 2-1 2-1 2-1 7-4 3-2 3-2 1-1 2-2c2 0 4-1 5-3l4-3 5-4 4-3a393 393 0 0 0 43-47l2-3 2-2 2-3 3-5 1-3 1-2 1-2 1-2 1-1 1-2 1-2 4-9 1-1 1-3 1-3 1-2 1-1 1-3 1-3 1-5 2-6 2-7 2-7 1-2 1-2 1 1 1 1 2 1 2 1 2 1 1 1 3 1 3 2 2 1 1 1 2 1 2 1 3 2 4 2 2 2 2 1 2 1 1 1 3 2 4 2 3 2 1 1 4 3 6 3c3 1 3 1 3-2l-1-4-2-4-1-3-1-2-1-2-1-2-1-1-1-2-1-2-2-3-2-5-2-3-1-1-1-2-2-3-2-4-2-2-1-2-5-5-1-3-3-4-2-2-5-6-4-5-5-5-4-5v-24l-1-24-1-12-1-11-2-15-1-15-1-7-1-6-2-10c0-6-1-11-2-11l-2-11-1-9-1-5-1-4-1-9-2-11-3-10-1-10-1-3v-2h13l14 1 43 1-4-4-2-2-5-2-3-2-1-1-4-2-3-2-1-1-4-1-5-3-2-2-2-1-2-1-2-1-3-1-2-2-2-1-2-1-1-1-3-2-5-2-4-3-3-2-2-1-3-1-2-2-2-1-3-2-2-2c-2 0-4-3-4-4l-1-1-1-3-1-3-2-3-1-4-1-1-1-2-1-2-1-2-1-2-1-2-2-3-2-5-2-3-2-2-2-3-2-3-1-2-1-2-4-5-4-5-2-2-3-3c-2-3-5-4-7-2zM62 450l1 2 5 4 4 3 2 2 4 4 5 3c0 2 5 3 7 1l2-5 1-3 3-6-2-1-2-1-3-1-4-1-8-1-8-2-3-1c-4 0-4 0-4 3zM171 459l-1 2-2 3-3 5-1 3-1 1-2 3-2 3-1 2-2 3-1 4-1 2-1 2-1 1-1 2-1 2-1 2-2 3-1 4-1 2-1 2-1 2-1 3-1 2-1 2-1 5 1 4 1 5 1 4 1 5 1 5 1 6 1 5 2 9 1 9 1 6 1 5 1 4 1 6c2 1 6 2 6 0l4-1 3-1 4-1 4-1 5-1 5 1 2 1c1 0 6 4 6 6l1 1 1 5-1 4-1 2c0 2-2 3-6 6l-7 4-4 3-3 3-4 2-2 2-3 2c-2 1-2 2-2 8l1 6 1 6 1 6 2 13 1 13 1 5 1 5 1 7 1 6 1 2-1 2c-2 0-1 3 5 8l5 6 12 13 3 3 3 2 8 7 8 7 4 3 5 3 2 1 3 4 2 3 2 1c2 0 7 4 7 6l2 1 3 2c2 2 8 2 8 0l1-2 1-3 1-3 2-5 1-4 1-1 1-2 1-2 1-2 1-2 1-3 1-2 1-2 1-2c0-3 0-3-3-3l-3 1-3 2-4 1-2 1-2 1-1 1-2 1-2 1-2 1-3 1-4 2-2 1-2 1-1 1-2 1-2 1c-2 0-2-1-2-3l-1-3-1-3-1-4-1-9-2-10-1-4-1-5-1-5-1-6-1-5-1-6-1-12-2-13-1-5-1-6-1-6-1-7-1-6-1-6-1-10-2-12-1-5-1-5-1-5-1-6-1-4-1-5-1-5-1-6-1-8c-1-7-1-8 1-10l3-3 4-5 3-4 4-5 4-5 4-5 5-6 3-4c4-3 7-6 7-8l1-2 4-4 5-4 4-4 3-4 1-3 1-1h-6l-4 1-5 2-2 1-3 1-2 1-2 1-2 1-3 1-4 2-5 1-2 1-2 1-2 1-2 1-2 1-3 1-3 1-4 2-3 1-3 1-1 1c-2 0-2-1-2-5l-1-4-1-6-1-5-1-6-1-6-1-8-1-9-1-4c0-4-1-5-4-3z"
    />
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M1022 516l1 4 1 5 1 4 1 5 1 4 2 10 1 10 1 6 1 5 1 5 1 4 1 6 1 5 1 6c0 6 0 6 3 6l2-1 1-2 1-3 1-3 2-5 1-6 1-2 1-3 3-7 1-7 2-9 1-9 1-8c0-5 0-8 2-9l1-6c0-8 0-8-8-8l-6-1-12-1h-13v5zM955 582l-5 1-5 1-5 1-6 1-6 1-7 1c0 2 3 4 5 4l2 1 4 1 4 1 3 1 2 1 7 1 7 2 4 1 4 1 4 1c3 0 3 0 3-2l-1-3-1-5-1-8c-1-4-1-4-7-4l-5 1zM972 706l-4 1-5 1-4 1-5 1-5 1-6 1-11 1c-10 1-11 1-13 4l-3 4-3 4-3 4-2 3-3 4-1 2c-1 0-5 4-5 6l-3 4-2 2-2 3-2 3-2 3-3 4-2 3-3 3-2 4-2 3-7 1-8 1-8 1-8 1-7 1-7 1-15 1-16 2-8 1h-8v3c0 3 2 4 7 4l2 1 3 1 2 1 2 1 2 1 3 1 2 1 4 1 5 2 3 1 3 1 3 1 2 1 3 1 3 1 5 2 4 1 3 1c2 0 2 1 2 3s-1 3-2 3l-2 3-1 3-2 3-2 2-2 3-2 3-3 4-2 3-2 2-1 3-2 3-1 2-5 5-1 2-2 2-3 5-3 3-1 2-4 6-1 2-7 7-2 4-3 3-4 5-5 6-2 2-2 2-7 8-3 4-1 2-4 4-9 9-5 4-3 2-3 2-9 9-5 3-5 4-2 2c-2 2-7 3-7 1l-2-1-3-1-4-2-5-1-2-1-2-1-2-1-3-1-2-1-2-1-2-1-3-2-2-1-2-1-1-1-3-2-4-2-3-2-1-1-4-3-4-3-6-5-5-4c-2 0-1 10 1 11l1 2 2 3 2 3 1 1 1 2 2 3 1 3 1 1 1 2 2 3 2 2 2 3 1 3 2 2 2 3 2 3 2 3 3 3c3 4 2 7-3 7l-2 1-2 1-2 1-2 1-3 1-3 1-3 1-8 2-8 1-5 1-6 1-19 1c-19 0-20 0-22 2l-2 3-1 2-1 2-1 2c-1 1-3 2-3 4l-2 3-1 1-1 2-1 2-2 3-2 4-2 2-1 2-1 2-1 2c0 3 0 3 5 3l4 1 10 1 10 1 13 1 12-1 6-1h5v4l-1 5-1 4-1 5-1 8-2 8-1 3-1 4-1 3-1 4-1 4-1 2-2 6-1 6-1 2c0 4 4 2 10-4l5-4 4-5 5-4 4-5 6-7 2-3c4-3 5-5 5-6l3-3 3-4 2-2 1-3 2-3 2-3 1-1 3-5 2-4 1-2 1-2 1-2 1-1 1-2 1-2 2-2c0-1 1-2 4-2l5-2 3-1 3-1 2-1 1-1 2-1 2-1 4-1 3-2 2-1 2-1 2-1 1-1 2-1 2-1 2-2 4-2 3-2 2-1 1-1 4-3 4-2 3-2 2-2 5-4 4-3c2 0 9-7 9-8l2-1 7-6 12-11 4-5 11-10 2-4 1-2c1 0 10-9 10-11l5-5 4-5 4-5 3-4 3-4 3-3 4-6 1-1 3-4c2-2 3-2 3-1 0 2 5 6 6 6l1 2 4 5 3 4 2 3c4 3 5 4 5 6l2 3c4 3 6 5 6 7l2 3 5 5c0 2 6 7 7 7 2 0 2-1 2-5l-1-6-1-4-1-5-1-8-2-8-1-6-1-4-1-4-1-4-1-3-1-4-1-4-1-5-1-7-2-7-1-4 1-5 1-2 2-3 1-3 2-2 2-3 2-3 2-2 3-4 2-3 2-3 1-3 2-2 2-3 2-3 2-3 3-3 2-4 2-2 2-4 3-3 2-3 2-3 2-3 3-3 2-4 2-2 3-4 3-4 3-4 3-4 2-3 3-4 3-3 4-5 1-3 1-2c2 0 5-4 5-6l2-3 1-1 3-4 3-4 2-3c2-1 3-3 3-7 0-6 0-6-2-6l-3 1z"
    />
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M206 847l1 4 1 2 1 1 1 2 1 2 2 5 1 4 1 2 1 2 1 1 2 3 2 5 2 3 1 2 2 3 2 3 1 1 1 2 2 3 1 2 3 4 3 5 2 2 1 2 1 2a201 201 0 0 0 36 36v2l-3 1-2 2-3 2-3 3-4 2-2 1-1 1-3 2-4 2-3 2-2 1-1 1-2 1-3 2-5 3-3 1-2 1-2 1-2 1-1 1-2 1-2 1-2 1-1 3v2h23a116 116 0 0 0 31-2l7-1 9-1 9-2 4-1 3-1 3-1 3-1 3-1 4-1 3-1 4 1 2 1 2 1 2 1 3 1 2 1 2 1 5 2 6 1 2 1 3 1 2 1 3 1 4 1 5 1 9 2 8 1 5 1 6 1 7 1 7 1 36 1a266 266 0 0 0 63-4l7-1 12-1 12-1v3l-1 4-1 9-1 9-1 15-2 15-1 8 1 7c2 0 4-3 4-4l2-3 2-2 2-3 1-3 2-2 3-4 2-3 1-2 2-3 1-2 2-3 2-2 2-3 1-3 1-2 1-1 2-3 2-3 2-2 1-3 1-2 1-2 2-2 2-3 1-2 1-2 2-3 1-2 1-2 1-1c0-1 1-2 4-2l3-1 6-1 5-1 5-1 4-1 5-1 4-1 10-1 10-2 6-1 5-1 2-1 1-4-3-6-2-2-2-3-2-5-3-4-2-3-1-2-1-1-1-2-2-5-3-6-1-3c0-2-1-3-2-3l-2-2-1-1-5-3-4-4-4-3-4-3-4-3-5-4-4-3-5-4-2-2-4-3c-2 0-4-2-7-6l-3-2c-2 0-4-1-6-5l-3-2c-2 0-2 1-2 4l1 3 1 3 1 3 1 2 1 1 1 2 4 9 1 2 1 2 1 3 1 2 1 4 2 3 1 2 1 2 1 2 1 1 1 2 1 2 1 5 2 4 1 2c0 2-1 2-9 2l-9 2-5 1-6 1-4 1-5 1-5 1-5 1-12 1-12 2-6 1-7 1-7 1-7 1-11 1-11 1-25 1a130 130 0 0 1-33-2l-8-1-5-1c-4 0-5-1-5-3l-2-2-1-2-1-2-1-2-1-2-1-1-1-2-1-4-2-5-1-3-1-3-1-2-1-3-1-2-1-3-2-8-1-8-1-10c0-9-1-12-4-12-2 0-3 5-3 10l-1 3-1 3-1 2-1 4-1 3-1 5-1 4-1 9-2 9-1 6-1 5-1 2-3 1-4-2-2-1-2-1-1-1-2-1-2-1-2-1-3-1-4-2-2-1-3-2-3-2-1-1-3-2c-2 0-6-4-6-5l-1-1c-2 0-4-1-6-4l-4-3-4-3-2-1-2-3-3-3c0-1-2-4-7-8l-6-5-2-2-3-2-4-2-3-3-3-2-3-2-2-1-3-2-3-2-2-2-3-2-4-2-4-3-2-2-3-2-4-2-2-2-2-1-4-3c-3-3-4-3-9-4h-7v3z"
    />
    <path
      className="Logo-shadow"
      // filter="url(#inset-shadow)"
      d="M486 885l-1 2-1 3-1 2-2 5-1 4-1 3-1 3-1 2-1 1-1 2-1 3-1 6-2 5-1 3-1 3-1 3-1 2-1 3-1 2-1 2c0 2 1 2 10 2l10-1 6-1h5v-8l-1-8-1-7-1-7-1-7-1-16c0-7 0-8-2-8l-2 2zM390 906l1 4 1 4 1 3 1 3 1 3 1 3 1 2 1 4 2 3 1 3 1 3 1 2 6 1 5 1 20 1h19v-2c0-2-1-3-2-3l-4-2-3-2-2-2-4-2-3-3-3-2-3-2-4-2-2-2-1-1-5-3-4-3-3-3-3-2-3-2-3-1-4-3c-1-2-2-3-4-3-3 0-3 0-3 4zM846 913l-3 5-6 6-1 2-1 2-1 2-3 2-2 3-4 6-5 5-13 14c-13 13-14 14-14 18l-1 4-1 13-1 12-1 7c0 6 0 7 2 7s5-3 5-5l2-3 2-3 1-1 1-2 2-3 3-4 2-5 2-3 1-1 1-2 2-2 1-3 1-2 1-2 2-2 2-3 1-2 1-3 2-4 1-2 1-2 1-1 2-3 2-5 2-3 1-2 1-2 1-2 1-2 1-1c0-1 1-2 3-2l2-1 3-1 3-1 3-1 2-1 5-1c4-1 4-1 4-4l-1-3-1-1-5-6-2-3-6-6-4 3zM745 915l-6 1-5 1-6 1-5 1-6 1-6 1-7 1-11 1-12 2-4 1c-4 0-5 0-5 2l5 5 3 2 3 2 2 1 2 1 1 1 4 1 3 2 2 1 2 1 2 1 2 1 2 1 3 1 7 1c6 0 6 0 10-4l5-4 27-27-3-1-9 1zM511 1010l-7 1c-8 0-13 1-13 3s3 4 5 4l3 1 4 2 3 1 3 1 2 1 2 1 2 1 3 1 2 1c0 2 6 1 6-1l1-10v-8h-8l-8 1z"
    />
  </svg>
);

export default Logo;

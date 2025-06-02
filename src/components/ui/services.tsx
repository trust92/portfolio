import React from 'react';
import '@/globals.css';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

import Link from 'next/link';
const Services = () => {
  return (
    <div>
    <Drawer>
  <DrawerTrigger>
     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:cursor-pointer text-white/50 hover:text-white/100 transition-all">
  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  <circle cx="12" cy="8" r="1" fill="currentColor"/>
</svg>
  </DrawerTrigger>
  <DrawerContent>

    <DrawerHeader>
      <DrawerTitle>portfolio app</DrawerTitle>
      <DrawerDescription>
        <div className="detail overflow-y-scroll  p-2 indent text-left rounded-lg border-white/10 border-1">
          <p className="inline-block code wrap-break-word whitespace-pre-wrap overflow-x-clip wrapper">
<h2>&gt;about</h2>
This super fast application was <Link className="underline pl-2" href="https://en.wikipedia.org/wiki/Vibe_coding">vibe coded</Link> with artifical intelligence using natural language prompts<br/>
You can clone the source code<Link className="underline pl-2" href="https://github.com/trust92/portfolio" target='_blank'>here</Link>.<br/>
</p>

<p className="inline-block code wrap-break-word whitespace-pre-wrap">
<h2>mit license</h2>
<h3>copyright (c) 2025 zach r</h3>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</p>


          <p className="inline-block code wrap-break-word whitespace-pre-wrap">
<h2>&gt;framework</h2>
written in javascript/typescript<br/>
developed for mobile screens<br />
framework: next.js<br />
ui: react-native, shadcn<br />
css: tailwind-css<br />
effects: motion, react-swipeable<br />
ai: xAI
</p>



</div>
</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>
      <Button className="hover:cursor-pointer hover:underline border-1 border-white/25">x</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
</div>

  );
};

export default Services;
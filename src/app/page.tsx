"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import imageEffects from "./imageEffects";
import "@/globals.css";
import Services from "@/components/ui/services";

interface ImageItem {
  image: string;
  timestamp: number;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadedRows = useRef(0);
  const previewImageRef = useRef<HTMLImageElement>(null);

  // Fetch images from API
  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      const newImages: ImageItem[] = data.images.map((item: { image: string; ctime: string }) => ({
        image: item.image,
        timestamp: new Date(item.ctime).getTime(),
      }));
      setImages((current) => {
        const uniqueImages = newImages.filter(
          (newImg) => !current.some((img) => img.image === newImg.image)
        );
        return [...current, ...uniqueImages].slice(0, page * 100);
      });
      setHasMore(newImages.length > 0);
    } catch (error) {
      console.error("Failed to fetch images:", error instanceof Error ? error.message : "Unknown error");
    }
  }, [page]);

  // Initial load of 5 rows
  useEffect(() => {
    const loadInitialRows = async () => {
      for (let i = 0; i < 2; i++) {
        await fetchImages();
        loadedRows.current += 1;
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    };
    loadInitialRows();
  }, [fetchImages]);

  // Lazy load 3 rows at a time
  useEffect(() => {
    if (!hasMore || loadedRows.current < 5) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          for (let i = 0; i < 3; i++) {
            setPage((prev) => prev + 1);
            loadedRows.current += 1;
            await new Promise((resolve) => setTimeout(resolve, 150));
          }
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  // Initialize preview effect
  useEffect(() => {
    if (selectedImage && previewImageRef.current) {
      imageEffects.initPreviewEffect(previewImageRef.current);
    }
    return () => {
      if (previewImageRef.current) {
        imageEffects.resetEffect(previewImageRef.current);
      }
    };
  }, [selectedImage]);

  // Handle image selection
  const handleImageClick = useCallback((image: string, index: number) => {
    if (galleryRef.current) {
      setScrollPosition(galleryRef.current.scrollTop);
    }
    setSelectedImage(image);
    setSelectedIndex(index);
  }, []);

  // Handle preview close
  const handleClosePreview = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(-1);
    if (galleryRef.current) {
      galleryRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (selectedIndex < images.length - 1) {
        setSelectedImage(images[selectedIndex + 1].image);
        setSelectedIndex(selectedIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (selectedIndex > 0) {
        setSelectedImage(images[selectedIndex - 1].image);
        setSelectedIndex(selectedIndex - 1);
      }
    },
    onSwipedUp: handleClosePreview,
    onSwipedDown: handleClosePreview,
    trackMouse: true,
  });

  return (
    <div className="app-container">
      <div className="sticky top-10 text-md text-shadow-black/100 w-max px-6 rounded-xl text-center z-10 text-white text-shadow-md">
        art gallery
      </div>
      <div className="gallery pt-0" ref={galleryRef}>
        <div className="gallery-grid">
          {images.map((img, index) => (
            <motion.div
              key={img.image}
              className="gallery-item hover:shadow-white transition-all duration-800"
 
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: .5, y: -100 }}
              transition={{ duration: 1 }}
              onClick={() => handleImageClick(img.image, index)}
            >
              <Image
                src={img.image}
                alt={`Image ${index + 1}`}
                width={800}
                height={600}
                quality={100}
  
                className="gallery-image opacity-100 mix-blend-lighten hover: hover:saturate-150 translate-1.5 cursor-zoom-in"
                loading={index > 10 ? "lazy" : "eager"}
                priority={index <= 3}
                onError={() => console.error(`Failed to load: ${img.image}`)}
              />
            </motion.div>
          ))}
        </div>
        {hasMore && (
          <div ref={loadMoreRef} className="load-more invisible"></div>
        )}
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            {...swipeHandlers}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={selectedImage}
                alt="Preview"
                width={0}
                height={0}
                sizes="80vw"
                style={{ width: "80vw", height: "auto", maxHeight: "85vh", objectFit: "contain" }}
                quality={100}
                className="gallery-image"
                ref={previewImageRef}
              />
              <button
                onClick={handleClosePreview}
                className="absolute left-[20%] right-[20%]  align-middle justify-center backdrop-blur-sm bg-black/10 animate-pulse border-1 border-white/50 rounded-xl px-16 py-1 text-center text-white text-shadow-black/50 text-shadow-md transition-all">
              close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="ctr w-full text-center text-xs sticky bottom-0 py-4">
        <h3 className="bg-black/0 w-max px-2 flex-col rounded-xl py-1 delay-500 text-center fixed bottom-10 text-white text-shadow-black/50 text-shadow-md transition-all">
          <Services />
        </h3>
      </div>
    </div>
  );
};

export default Gallery;
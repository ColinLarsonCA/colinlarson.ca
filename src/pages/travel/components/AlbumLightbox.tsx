import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

export interface AlbumLightboxProps {
  photos: { src: string; description?: string }[];
  lightboxIndex: number;
  setLightboxIndex: (index: number) => void;
}

export function AlbumLightbox({
  photos,
  lightboxIndex,
  setLightboxIndex,
}: AlbumLightboxProps) {
  return (
    <Lightbox
      open={lightboxIndex >= 0}
      index={lightboxIndex}
      close={() => setLightboxIndex(-1)}
      slides={photos}
      plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Zoom]}
      captions={{ descriptionTextAlign: "center" }}
    />
  );
}

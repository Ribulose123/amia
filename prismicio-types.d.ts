// Placeholder types for Prismic slices
// These will be auto-generated when you run Slice Machine and push slices to Prismic

export interface Slice {
  slice_type: string;
  slice_label?: string | null;
  variation?: string;
}

export interface HeroSlice extends Slice {
  slice_type: "hero";
  primary: {
    heading?: string | null;
    subheading?: any;
    background_image?: any;
    primary_button_text?: string | null;
    primary_button_link?: any;
    secondary_button_text?: string | null;
    secondary_button_link?: any;
  };
}

export interface NomineeGridSlice extends Slice {
  slice_type: "nominee_grid";
  primary: {
    title?: string | null;
    description?: any;
  };
  items: Array<{
    nominee?: any;
  }>;
}

export interface RichContentSlice extends Slice {
  slice_type: "rich_content";
  primary: {
    content?: any;
  };
}

export interface ImageGallerySlice extends Slice {
  slice_type: "image_gallery";
  primary: {
    title?: string | null;
  };
  items: Array<{
    image?: any;
    caption?: string | null;
  }>;
}

export interface CtaSlice extends Slice {
  slice_type: "cta";
  primary: {
    title?: string | null;
    description?: any;
    button_text?: string | null;
    button_link?: any;
  };
}

export interface CountdownSlice extends Slice {
  slice_type: "countdown";
  primary: {
    title?: string | null;
    description?: any;
    event_date?: string | null;
  };
}

export interface StatsSlice extends Slice {
  slice_type: "stats";
  items: Array<{
    number?: string | null;
    label?: string | null;
    icon?: any;
  }>;
}


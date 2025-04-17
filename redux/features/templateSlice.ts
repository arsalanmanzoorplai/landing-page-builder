import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Section, SectionType } from "@/hooks/useEditableSections";
import {
  NavbarData,
  HeroData,
  AboutData,
  ServicesData,
  FeaturedToursData,
  FooterData,
} from "@/hooks/useSectionEditor";

// Default data for new sections
const defaultSectionData: Record<SectionType, any> = {
  navbar: {
    logo: "/images/travel-tour-img/logo.svg",
    title: "Travel Tour",
    links: [
      { text: "Home", url: "#" },
      { text: "About", url: "#about" },
      { text: "Services", url: "#services" },
      { text: "Tours", url: "#tours" },
      { text: "Contact", url: "#contact" },
    ],
    socialLinks: [
      { icon: "twitter", url: "https://twitter.com" },
      { icon: "facebook", url: "https://facebook.com" },
      { icon: "instagram", url: "https://instagram.com" },
    ],
    backgroundColor: "#ffffff",
  } as NavbarData,

  hero: {
    backgroundImage: "/images/travel-tour-img/main.jpeg",
    backgroundOpacity: 0.7,
    title: "Explore the World",
    subtitle: "Discover amazing places",
    paragraphs: ["Start your journey today with our exclusive tour packages."],
    ctaButtons: [
      { text: "View Tours", url: "#tours", variant: "default" },
      { text: "Learn More", url: "#about", variant: "outline" },
    ],
  } as HeroData,

  about: {
    image: "/images/travel-tour-img/about.jpeg",
    title: "About Us",
    paragraphs: [
      "We are a premier travel agency with over 10 years of experience.",
      "Our team of experts will help you plan the perfect vacation.",
      "We offer personalized itineraries and 24/7 support during your trip.",
    ],
    backgroundColor: "#f9f9f9",
  } as AboutData,

  services: {
    backgroundImage: "/images/travel-tour-img/services-bg.jpeg",
    title: "Our Services",
    subtitle: "What We Offer",
    services: [
      {
        icon: "map",
        title: "Guided Tours",
        description: "Expert guides to show you around.",
      },
      {
        icon: "hotel",
        title: "Premium Accommodation",
        description: "Stay in luxury hotels.",
      },
      {
        icon: "car",
        title: "Transportation",
        description: "Comfortable transportation options.",
      },
      {
        icon: "utensils",
        title: "Local Cuisine",
        description: "Experience authentic local food.",
      },
    ],
    backgroundColor: "#ffffff",
  } as ServicesData,

  featuredTours: {
    title: "Featured Tours",
    subtitle: "Popular Destinations",
    tours: [
      {
        image: "/images/travel-tour-img/tour-1.jpeg",
        title: "Paris Adventure",
        description: "Explore the city of love.",
        price: "$1,299",
        duration: "7 days",
        url: "/tours/paris",
      },
      {
        image: "/images/travel-tour-img/tour-2.jpeg",
        title: "Tokyo Express",
        description: "Discover the bustling metropolis.",
        price: "$1,899",
        duration: "10 days",
        url: "/tours/tokyo",
      },
      {
        image: "/images/travel-tour-img/tour-3.jpeg",
        title: "Bali Retreat",
        description: "Relax on pristine beaches.",
        price: "$999",
        duration: "5 days",
        url: "/tours/bali",
      },
    ],
    backgroundColor: "#f5f5f5",
  } as FeaturedToursData,

  footer: {
    backgroundColor: "#222831",
    logo: "/images/travel-tour-img/logo.svg",
    links: [
      {
        title: "Company",
        items: [
          { text: "About", url: "/about" },
          { text: "Team", url: "/team" },
          { text: "Careers", url: "/careers" },
          { text: "Privacy Policy", url: "/privacy" },
        ],
      },
      {
        title: "Support",
        items: [
          { text: "FAQ", url: "/faq" },
          { text: "Contact", url: "/contact" },
          { text: "Live Chat", url: "#" },
        ],
      },
      {
        title: "Destinations",
        items: [
          { text: "Europe", url: "/destinations/europe" },
          { text: "Asia", url: "/destinations/asia" },
          { text: "Africa", url: "/destinations/africa" },
          { text: "Americas", url: "/destinations/americas" },
        ],
      },
    ],
    socialLinks: [
      { icon: "twitter", url: "https://twitter.com" },
      { icon: "facebook", url: "https://facebook.com" },
      { icon: "instagram", url: "https://instagram.com" },
    ],
    copyright: "© 2023 Travel Tour. All rights reserved.",
  } as FooterData,
};

// Initial default sections
const initialSections: Section[] = [
  {
    id: nanoid(),
    type: "navbar",
    order: 0,
    data: { ...defaultSectionData.navbar },
  },
  {
    id: nanoid(),
    type: "hero",
    order: 1,
    data: { ...defaultSectionData.hero },
  },
  {
    id: nanoid(),
    type: "about",
    order: 2,
    data: { ...defaultSectionData.about },
  },
  {
    id: nanoid(),
    type: "services",
    order: 3,
    data: { ...defaultSectionData.services },
  },
  {
    id: nanoid(),
    type: "featuredTours",
    order: 4,
    data: { ...defaultSectionData.featuredTours },
  },
  {
    id: nanoid(),
    type: "footer",
    order: 5,
    data: { ...defaultSectionData.footer },
  },
];

interface TemplateState {
  id: string | null;
  name: string;
  sections: Section[];
  editingSectionId: string | null;
  lastUpdated: string;
}

const initialState: TemplateState = {
  id: null,
  name: "Travel Tour Template",
  sections: initialSections,
  editingSectionId: null,
  lastUpdated: new Date().toISOString(),
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplate: (state, action: PayloadAction<TemplateState>) => {
      return { ...action.payload };
    },
    setEditingSectionId: (state, action: PayloadAction<string | null>) => {
      state.editingSectionId = action.payload;
    },
    addSection: (
      state,
      action: PayloadAction<{ type: SectionType; afterSectionId: string }>
    ) => {
      const { type, afterSectionId } = action.payload;

      // Find the position to insert the new section
      const afterSectionIndex = state.sections.findIndex(
        (section) => section.id === afterSectionId
      );
      const newOrder =
        afterSectionIndex !== -1
          ? state.sections[afterSectionIndex].order + 0.5
          : state.sections.length;

      // Create new section with default data
      const newSection: Section = {
        id: nanoid(),
        type,
        order: newOrder,
        data: { ...defaultSectionData[type] },
      };

      // Add the new section
      state.sections.push(newSection);

      // Sort sections by order
      state.sections.sort((a, b) => a.order - b.order);

      // Normalize orders (1, 2, 3, etc.)
      state.sections.forEach((section, index) => {
        section.order = index;
      });

      state.lastUpdated = new Date().toISOString();
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload
      );

      // Normalize orders
      state.sections.forEach((section, index) => {
        section.order = index;
      });

      state.lastUpdated = new Date().toISOString();
    },
    updateSectionData: (
      state,
      action: PayloadAction<{ sectionId: string; data: Record<string, any> }>
    ) => {
      const { sectionId, data } = action.payload;
      const section = state.sections.find(
        (section) => section.id === sectionId
      );

      if (section) {
        section.data = { ...section.data, ...data };
      }

      state.lastUpdated = new Date().toISOString();
    },
    reorderSections: (
      state,
      action: PayloadAction<{ sourceId: string; destinationId: string }>
    ) => {
      const { sourceId, destinationId } = action.payload;

      const sourceIndex = state.sections.findIndex(
        (section) => section.id === sourceId
      );
      const destinationIndex = state.sections.findIndex(
        (section) => section.id === destinationId
      );

      if (sourceIndex !== -1 && destinationIndex !== -1) {
        // Reorder the array
        const [removed] = state.sections.splice(sourceIndex, 1);
        state.sections.splice(destinationIndex, 0, removed);

        // Update order values
        state.sections.forEach((section, index) => {
          section.order = index;
        });
      }

      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const {
  setTemplate,
  setEditingSectionId,
  addSection,
  deleteSection,
  updateSectionData,
  reorderSections,
} = templateSlice.actions;

export default templateSlice.reducer;

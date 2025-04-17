"use client";

import { useState, useEffect } from "react";
import TemplateFactory from "@/components/templates/TemplateFactory";
import { useDispatch } from "react-redux";
import { setTemplate } from "@/redux/features/templateSlice";
import { Section } from "@/hooks/useEditableSections";

interface ClientSideWrapperProps {
  templateType: string;
  sections: Section[];
  websiteName: string;
  websiteSlug: string;
  websiteId: string;
}

export default function ClientSideWrapper({
  templateType,
  sections,
  websiteName,
  websiteSlug,
  websiteId,
}: ClientSideWrapperProps) {
  const dispatch = useDispatch();

  // Initialize Redux store with the server-fetched data
  useEffect(() => {
    dispatch(
      setTemplate({
        id: websiteId,
        name: websiteName,
        templateType: templateType,
        sections: sections,
        editingSectionId: null,
        lastUpdated: new Date().toISOString(),
      })
    );
  }, [dispatch, websiteId, websiteName, templateType, sections]);

  // Function to force a refresh of the page
  const forceRefresh = () => {
    const timestamp = Date.now();
    window.location.href = `${window.location.pathname}?t=${timestamp}`;
  };

  return (
    <>
      <button
        onClick={forceRefresh}
        className='fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors'
        title='Refresh content'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <TemplateFactory templateType={templateType} previewMode={true} />
    </>
  );
}

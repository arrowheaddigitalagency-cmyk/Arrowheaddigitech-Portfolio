import React from 'react';

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span>{`${number} / `}</span>
      <span>{children}</span>
    </p>
  );
}

/** Shared cross-section state/handlers so a project's detail dialog can be
 * opened from either the work stage or the mobile showcase. */
export interface ProjectDialogControls {
  activeProject: number;
  setActiveProject: (index: number) => void;
  openDetail: () => void;
}

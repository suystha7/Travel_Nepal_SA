import React from 'react';

export interface ITabConfig<T extends string> {
  label: string;
  id: T;
  icon?: React.ElementType;
}

export function getValidTab<T extends string>(
  tab: string | null,
  validTabs: readonly ITabConfig<T>[],
  defaultTab: T
): T {
  const values = validTabs.map(t => t.id);

  if (tab && values.includes(tab as T)) {
    return tab as T;
  }
  return defaultTab;
}

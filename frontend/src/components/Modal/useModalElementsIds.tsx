import React from 'react';

const useModalElementsIds = (...prefixes: string[]): string[] => {
  const reactId = React.useId();
  return React.useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${reactId}`);
  }, [prefixes, reactId]);
};

export default useModalElementsIds;

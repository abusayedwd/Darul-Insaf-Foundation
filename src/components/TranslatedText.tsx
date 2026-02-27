'use client';

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface TranslatedTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  const { language, translate } = useAppContext();
  const [translated, setTranslated] = useState(children);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (language === 'en') {
      setTranslated(children);
      return;
    }

    const doTranslate = async () => {
      setLoading(true);
      const result = await translate(children);
      setTranslated(result);
      setLoading(false);
    };

    doTranslate();
  }, [children, language, translate]);

  return (
    <Component className={`${className} ${loading ? 'opacity-50 transition-opacity' : 'opacity-100 transition-opacity'}`}>
      {translated}
    </Component>
  );
};

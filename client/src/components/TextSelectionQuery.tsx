import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface TextSelectionQueryProps {
  onQuery: (text: string) => void;
}

export function TextSelectionQuery({ onQuery }: TextSelectionQueryProps) {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      const text = window.getSelection()?.toString() || '';
      
      if (text.length > 0) {
        setSelectedText(text);
        
        // Get the position of the selection
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          setPosition({
            x: rect.right + 10,
            y: rect.top + window.scrollY,
          });
          
          setShowButton(true);
        }
      } else {
        setShowButton(false);
      }
    };

    const handleMouseDown = () => {
      setShowButton(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleQuery = () => {
    if (selectedText.trim()) {
      onQuery(selectedText);
      setShowButton(false);
      setSelectedText('');
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleQuery}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 50,
          }}
          className="bg-white text-black px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-100 transition-colors whitespace-nowrap text-sm font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={16} />
          Demander à Webora AI
        </motion.button>
      )}
    </AnimatePresence>
  );
}

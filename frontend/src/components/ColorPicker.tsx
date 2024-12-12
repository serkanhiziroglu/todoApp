'use client';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const colors = [
    '#EF4444', // red
    '#F97316', // orange
    '#EAB308', // yellow
    '#22C55E', // green
    '#3B82F6', // blue
    '#6366F1', // indigo
    '#A855F7', // purple
    '#EC4899', // pink
    '#B45309', // light brown
  ];

  return (
    <div className="flex">
      {colors.map((color) => (
        <button
          key={color}
          className={`h-8 w-8 rounded-full transition-transform ${
            value === color ? 'ring-2 ring-white scale-110' : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
}
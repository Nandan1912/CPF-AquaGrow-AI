import Svg, { Path } from 'react-native-svg';

export default function FeedBagIcon({ size = 60, color = '#00D1FF' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {/* Stylized feed bag icon */}
      <Path
        d="M380 64H132C112.3 64 96 80.3 96 100v312c0 19.7 16.3 36 36 36h248c19.7 0 36-16.3 36-36V100c0-19.7-16.3-36-36-36z"
        fill={color}
      />
      <Path
        d="M256 96c-35.3 0-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64s-28.7-64-64-64z"
        fill="#ffffff"
      />
    </Svg>
  );
}

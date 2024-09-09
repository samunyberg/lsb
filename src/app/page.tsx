import Intro from '@/components/Intro';
import { Metadata } from 'next';

export default function Home() {
  return <Intro />;
}

export const metadata: Metadata = {
  title: 'Lashes Studio by Boochita',
  description: 'Book an appointment',
};

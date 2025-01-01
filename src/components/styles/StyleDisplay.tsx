'use client';

import { StyleWithServices } from '@/lib/types';
import { Fragment } from 'react';
import Container from '../common/Container';
import StyleDisplayItem from './StyleDisplayItem';

interface Props {
  styles: StyleWithServices[];
}

const StyleDisplay = ({ styles }: Props) => {
  return (
    <Container className='grid grid-cols-2 gap-3 pb-14 pt-10 md:grid-cols-3 md:gap-6'>
      {styles.map((style) => (
        <Fragment key={style.id}>
          <StyleDisplayItem style={style} />
        </Fragment>
      ))}
    </Container>
  );
};

export default StyleDisplay;

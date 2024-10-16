'use client';

import { StyleWithServices } from '@/lib/types';
import { Fragment } from 'react';
import Container from '../common/Container';
import Spacer from '../common/Spacer';
import StyleDisplayItem from './StyleDisplayItem';

interface Props {
  styles: StyleWithServices[];
}

const StyleDisplay = ({ styles }: Props) => {
  return (
    <Container className='flex flex-col gap-2 pb-16 pt-10 md:max-w-xl'>
      {styles.map((style, index) => (
        <Fragment key={style.id}>
          <StyleDisplayItem style={style} />
          {index < styles.length - 1 && <Spacer className='mb-12' />}
        </Fragment>
      ))}
    </Container>
  );
};

export default StyleDisplay;

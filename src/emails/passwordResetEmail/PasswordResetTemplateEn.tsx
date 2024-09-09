import {
  Body,
  Container,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';

interface Props {
  resetUrl: string;
}

const ConfirmationTemplateEn = ({ resetUrl }: Props) => {
  return (
    <Html>
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className='bg-gray-100 p-2 font-sans'>
          <Container className='mx-auto max-w-lg rounded-sm bg-white p-5'>
            <Text className='mb-4 text-lg  text-gray-700'>
              Hello! You requested a password reset. Please click the link below
              to continue.
            </Text>
            <Container className='my-8 cursor-pointer pl-5 text-lg '>
              <Link
                href={resetUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-inherit underline'
              >
                Click here
              </Link>
            </Container>

            <Hr className='my-6 border-t border-gray-200' />

            {/* Footer Section */}
            <Container className='flex flex-col items-center rounded-sm pb-4'>
              <Link
                href='https://lashesstudiobyboochita.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-inherit'
              >
                <Text className='whitespace-nowrap text-lg font-bold uppercase tracking-wide'>
                  Lashes Studio by Boochita
                </Text>
              </Link>
              <Container className='flex items-center justify-center'>
                <Link
                  href='https://facebook.com/yourpage'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Img
                    src='https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Facebook_svg-512.png'
                    alt='Facebook'
                    className='mr-4 inline-block h-8 w-8'
                  />
                </Link>
                <Link
                  href='https://instagram.com/yourprofile'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Img
                    src='https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Instagram_svg-512.png'
                    alt='Instagram'
                    className='inline-block h-8 w-8'
                  />
                </Link>
              </Container>
            </Container>

            <Hr className='my-6 border-t border-gray-200' />

            {/* Disclaimer */}
            <Text className='text-xs text-gray-400'>
              This is an automated email. If you don&apos;t know why you
              received this email, please ignore it. Do not reply to this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationTemplateEn;

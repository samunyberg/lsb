import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
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

interface ConfirmationTemplateArgs {
  dateTime: Date;
  style: string;
  service: string;
}

const ConfirmationTemplateEn = ({
  dateTime,
  style,
  service,
}: ConfirmationTemplateArgs) => {
  return (
    <Html>
      <Preview>Your booking is confirmed!</Preview>
      <Tailwind>
        <Body className='bg-gray-100 p-2 font-sans'>
          <Container className='mx-auto max-w-lg rounded-sm bg-white p-5'>
            {/* Header Section */}
            <Text className='mb-5 text-xl font-bold uppercase text-gray-800'>
              Booking Confirmation
            </Text>

            {/* Thank You Message */}
            <Text className='mb-4 text-lg text-gray-700'>
              Thank you for choosing Lashes Studio by Boochita!
            </Text>
            <Text className='mb-8 text-gray-600'>
              I am excited to confirm your appointment. Here are the details:
            </Text>

            {/* Booking Details */}
            <Container className='mb-6 rounded-sm bg-gray-100 px-5 py-2'>
              <Text className='mb-2 text-lg font-semibold text-gray-700'>
                Your Booking:
              </Text>
              <Text className='text-gray-700'>
                Date: {formatDate(new Date(dateTime), 'en-FI')}
              </Text>
              <Text className='text-gray-700'>
                Time: {formatTime(new Date(dateTime), 'en-FI')}
              </Text>
              <Text className='text-gray-700'>Style: {style}</Text>
              <Text className='text-gray-700'>Service: {service}</Text>
            </Container>

            {/* Information Section */}
            <Container className='mb-6'>
              <Text className='mb-2 text-lg font-semibold text-gray-700'>
                Important Information:
              </Text>
              <Text className='mb-2 text-gray-600'>
                Please arrive on time to ensure the best results for your
                lashes.
              </Text>
              <Text className='mb-2 font-semibold text-gray-700'>
                Studio Location:
              </Text>
              <Text className='text-gray-600'>
                Porrassalmenkatu 11, 50100 Mikkeli
              </Text>
              <Text className='text-gray-600'>
                Entrance A (door code: 1952)
              </Text>
              <Text className='text-gray-600'>
                5th floor, apartment 10 (building has an elevator)
              </Text>

              <Hr className='my-6 border-t border-gray-200' />

              <Text className='text-gray-600'>
                If you have any questions, feel free to reach out to me.
                I&apos;m happy to help!
              </Text>
            </Container>

            <Hr className='my-6 border-t border-gray-200' />

            {/* Cancellation Policy */}
            <Text className='mb-6 text-sm text-gray-500'>
              To reschedule or cancel your appointment, contact me at
              boochitamat@gmail.com or via my social media. Please note that
              cancellations must be made at least 24 hours in advance.
            </Text>

            {/* Footer Section */}
            <Container className='flex flex-col items-center rounded-sm bg-gray-100 pb-4'>
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
                  href='https://instagram.com/lashesstudiobyboochita'
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

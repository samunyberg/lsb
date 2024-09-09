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

interface RescheduleConfirmationTemplateArgs {
  dateTime: Date;
  style: string;
  service: string;
}

const ConfirmationTemplate = ({
  dateTime,
  style,
  service,
}: RescheduleConfirmationTemplateArgs) => {
  return (
    <Html>
      <Preview>Aikaasi on siirretty</Preview>
      <Tailwind>
        <Body className='bg-gray-100 px-2 py-4 font-sans'>
          <Container>
            <Container className='mx-auto max-w-lg rounded-sm bg-white p-5'>
              {/* Header Section */}
              <Text className='mb-5 text-xl font-bold uppercase text-gray-800'>
                Varausvahvistus
              </Text>

              {/* Thank You Message */}
              <Text className='mb-4 text-lg  text-gray-700'>
                Ajanvaraustasi on siirretty.
              </Text>
              <Text className='mb-8 text-gray-600'>
                Uuden varauksesi tiedot:
              </Text>

              {/* Booking Details */}
              <Container className='mb-6 rounded-sm bg-gray-50 px-5 py-2'>
                <Text className='mb-2 text-lg font-semibold text-gray-700'>
                  Ajanvarauksesi:
                </Text>
                <Text className=' text-gray-700'>
                  Pvm: {formatDate(new Date(dateTime), 'fi-FI')}
                </Text>
                <Text className=' text-gray-700'>
                  Aika: {formatTime(new Date(dateTime), 'fi-FI')}
                </Text>
                <Text className=' text-gray-700'>Tyyli: {style}</Text>
                <Text className=' text-gray-700'>Palvelu: {service}</Text>
              </Container>

              {/* Information Section */}
              <Container className='mb-6'>
                <Text className='mb-2 text-lg font-semibold text-gray-700'>
                  Tärkeää tietoa:
                </Text>
                <Text className='mb-2 text-gray-600'>
                  Saavuthan ajoissa parhaan lopputuloksen varmistamiseksi
                  ripsillesi.
                </Text>
                <Text className='mb-2 font-semibold text-gray-700'>
                  Studion Sijainti:
                </Text>
                <Text className='text-gray-600'>
                  Porrassalmenkatu 11, 50100 Mikkeli
                </Text>
                <Text className='text-gray-600'>
                  Sisäänkäynti A (ovikoodi: 1952)
                </Text>
                <Text className='text-gray-600'>
                  5. kerros, asunto 10 (rakennuksessa on hissi)
                </Text>
              </Container>

              <Hr className='my-6 border-t border-gray-200' />

              <Text className='text-gray-600'>
                Jos sinulla on kysymyksiä varaustasi koskien, otathan minuun
                yhteyttä, niin autan mielelläni!
              </Text>
            </Container>

            <Hr className='my-6 border-t border-gray-200' />

            {/* Cancellation Policy */}
            <Text className='text-sm text-gray-500'>
              Jos haluat muuttaa tai peruuttaa ajan, ota minuun yhteyttä
              sähköpostilla boochitamat@gmail.com tai sosiaalisen mediani
              kautta. Huomioi, että peruutukset tulee tehdä vähintään 24 tuntia
              etukäteen.
            </Text>
          </Container>

          <Hr className='my-8 border-t border-gray-200' />

          <Container>
            <Container className='mx-auto max-w-lg rounded-sm bg-white p-5'>
              {/* Header Section */}
              <Text className='mb-5 text-xl font-bold uppercase text-gray-800'>
                Booking Confirmation
              </Text>

              {/* Thank You Message */}
              <Text className='mb-4 text-lg  text-gray-700'>
                Your appointment time has been changed.
              </Text>
              <Text className='mb-8 text-gray-600'>
                Details of your new appointment:
              </Text>

              {/* Booking Details */}
              <Container className='mb-6 rounded-sm bg-gray-50 px-5 py-2'>
                <Text className='mb-2 text-lg font-semibold text-gray-700'>
                  Appointment:
                </Text>
                <Text className=' text-gray-700'>
                  Pvm: {formatDate(new Date(dateTime), 'en-FI')}
                </Text>
                <Text className=' text-gray-700'>
                  Aika: {formatTime(new Date(dateTime), 'en-FI')}
                </Text>
                <Text className=' text-gray-700'>Tyyli: {style}</Text>
                <Text className=' text-gray-700'>Palvelu: {service}</Text>
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
              </Container>

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

export default ConfirmationTemplate;

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

const ConfirmationTemplateFi = ({
  dateTime,
  style,
  service,
}: ConfirmationTemplateArgs) => {
  return (
    <Html>
      <Preview>Varauksesi on vahvistettu!</Preview>
      <Tailwind>
        <Body className='bg-gray-100 p-2 font-sans'>
          <Container className='mx-auto max-w-lg rounded-sm bg-white p-5'>
            {/* Header Section */}
            <Text className='mb-5 text-xl font-bold uppercase text-gray-800'>
              Varausvahvistus
            </Text>

            {/* Thank You Message */}
            <Text className='mb-4 text-lg text-gray-700'>
              Kiitos, että valitsit Lashes Studio by Boochitan!
            </Text>
            <Text className='mb-8 text-gray-600'>
              Minulla on ilo ilmoittaa, että varauksesi on vahvistettu.
              Varauksesi tiedot:
            </Text>

            {/* Booking Details */}
            <Container className='mb-6 rounded-sm bg-gray-100 px-5 py-2'>
              <Text className='mb-2 text-lg font-semibold text-gray-700'>
                Ajanvarauksesi:
              </Text>
              <Text className='text-gray-700'>
                Pvm: {formatDate(new Date(dateTime), 'fi-FI')}
              </Text>
              <Text className='text-gray-700'>
                Aika: {formatTime(new Date(dateTime), 'fi-FI')}
              </Text>
              <Text className='text-gray-700'>Tyyli: {style}</Text>
              <Text className='text-gray-700'>Palvelu: {service}</Text>
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

              <Hr className='my-6 border-t border-gray-200' />

              <Text className='text-gray-600'>
                Jos sinulla on kysymyksiä varaustasi koskien, otathan minuun
                yhteyttä, niin autan mielelläni!
              </Text>
            </Container>

            <Hr className='my-6 border-t border-gray-200' />

            {/* Cancellation Policy */}
            <Text className='mb-6 text-sm text-gray-500'>
              Jos haluat muuttaa tai peruuttaa ajan, ota minuun yhteyttä
              sähköpostilla boochitamat@gmail.com tai sosiaalisen mediani
              kautta. Huomioi, että peruutukset tulee tehdä vähintään 24 tuntia
              etukäteen.
            </Text>

            {/* Footer Section */}
            <Container className='flex flex-col items-center rounded-sm bg-gray-100 p-4'>
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
              Tämä on automaattinen viesti. Jos et tiedä miksi sait tämän
              viestin, voit jättää sen huomiotta. Ethän vastaa tähän viestiin.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationTemplateFi;

interface Props {
  className?: string;
}

const Spacer = ({ className = '' }: Props) => {
  return <hr className={`my-5 w-full border-black/20 ${className}`} />;
};

export default Spacer;

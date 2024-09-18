interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
}

const TextArea = ({ placeholder, ...rest }: Props) => {
  return (
    <textarea
      className='max-h-52 min-h-24 rounded-sm bg-bgSoft p-2 caret-accent shadow transition-all placeholder:text-sm focus:outline-2 focus:outline-accent group-[.invalid]:outline group-[.invalid]:outline-2 group-[.invalid]:outline-red-300'
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default TextArea;

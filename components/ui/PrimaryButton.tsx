type Props = {
  children: React.ReactNode;

  onClick?: () => void;
};

function PrimaryButton({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-btn-sec text-sm text-btn-text py-2 px-4 rounded-lg duration-300 border border-b-color hover:scale-90 uppercase hover:border-border-color-hover hover:font-bold    "
    >
      {children}
    </button>
  );
}

export default PrimaryButton;

type Props = {
  children: React.ReactNode;

  onClick?: () => void;
};

function SecondaryButton({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-btn-prim flex-center gap-1 text-btn-text py-2 px-4 rounded-full duration-300 hover:brightness-125"
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
